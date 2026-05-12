function buildHeaders() {
  const headers = {
    Accept: "application/vnd.github+json",
  };
  const token = import.meta.env.VITE_GITHUB_TOKEN;
  if (typeof token === "string" && token.trim()) {
    headers.Authorization = `Bearer ${token.trim()}`;
  }
  return headers;
}

async function parseResponse(response) {
  if (response.status === 403) {
    const body = await response.text();
    const rateLimited = body.toLowerCase().includes("rate limit");
    throw new Error(rateLimited ? "GitHub rate limit reached. Try again later." : "GitHub refused this request.");
  }

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || `Request failed with status ${response.status}`);
  }

  return response.json();
}

export function resolveGithubUsername(githubProfileUrl) {
  if (!githubProfileUrl || typeof githubProfileUrl !== "string") {
    return null;
  }

  try {
    const normalized = githubProfileUrl.startsWith("http")
      ? githubProfileUrl
      : `https://${githubProfileUrl}`;
    const { pathname } = new URL(normalized);
    const segments = pathname.split("/").filter(Boolean);
    return segments[0] ?? null;
  } catch {
    return null;
  }
}

export async function fetchGithubUser(username) {
  const response = await fetch(`https://api.github.com/users/${encodeURIComponent(username)}`, {
    headers: buildHeaders(),
  });
  return parseResponse(response);
}

export async function fetchGithubRepos(username) {
  const response = await fetch(
    `https://api.github.com/users/${encodeURIComponent(username)}/repos?per_page=100&sort=updated`,
    { headers: buildHeaders() },
  );
  return parseResponse(response);
}

export async function fetchGithubEvents(username) {
  const response = await fetch(
    `https://api.github.com/users/${encodeURIComponent(username)}/events/public?per_page=80`,
    { headers: buildHeaders() },
  );
  return parseResponse(response);
}

export function summarizeLanguages(repositories) {
  const counts = new Map();

  repositories.forEach((repo) => {
    if (!repo || repo.fork || !repo.language) {
      return;
    }
    counts.set(repo.language, (counts.get(repo.language) ?? 0) + 1);
  });

  return Array.from(counts.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
}

export function buildContributionBuckets(events, days = 14) {
  if (!Array.isArray(events) || events.length === 0) {
    return Array.from({ length: days }, (_, index) => ({
      key: `empty-${index}`,
      label: "",
      count: 0,
    }));
  }

  const now = Date.now();
  const dayMs = 86400000;
  const buckets = Array.from({ length: days }, (_, index) => {
    const dayStart = new Date(now - (days - 1 - index) * dayMs);
    dayStart.setHours(0, 0, 0, 0);
    return {
      key: dayStart.toISOString().slice(0, 10),
      label: dayStart.toLocaleDateString(undefined, { weekday: "short" }),
      count: 0,
      timestamp: dayStart.getTime(),
    };
  });

  events.forEach((event) => {
    if (!event?.created_at) {
      return;
    }
    const created = new Date(event.created_at).getTime();
    const bucket = buckets.find((item) => {
      const next = item.timestamp + dayMs;
      return created >= item.timestamp && created < next;
    });
    if (bucket) {
      bucket.count += 1;
    }
  });

  const max = Math.max(1, ...buckets.map((item) => item.count));
  return buckets.map((item) => ({ ...item, intensity: item.count / max }));
}
