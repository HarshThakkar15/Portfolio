import { useEffect, useMemo, useState } from "react";

function formatEventLine(event) {
  if (!event) {
    return "";
  }

  const repoName = event.repo?.name ? event.repo.name.split("/").pop() : "repository";
  const type = event.type ?? "Event";

  switch (event.type) {
    case "PushEvent":
      return `git push → ${repoName} (${event.payload?.commits?.length ?? 0} commits)`;
    case "PullRequestEvent":
      return `pull request ${event.payload?.action ?? "update"} on ${repoName}`;
    case "IssuesEvent":
      return `issue ${event.payload?.action ?? "update"} in ${repoName}`;
    case "CreateEvent":
      return `created ${event.payload?.ref_type ?? "resource"} in ${repoName}`;
    case "ReleaseEvent":
      return `release ${event.payload?.action ?? "published"} · ${repoName}`;
    case "WatchEvent":
      return `starred ${repoName}`;
    case "ForkEvent":
      return `forked ${repoName}`;
    case "PublicEvent":
      return `open-sourced ${repoName}`;
    default:
      return `${type.replace("Event", "").toLowerCase()} activity on ${repoName}`;
  }
}

function TerminalShell({ rows }) {
  return (
    <div className="activity-terminal overflow-hidden rounded-2xl shadow-inner shadow-cyan-500/10">
      <div className="flex items-center gap-2 border-b border-[var(--border-soft)] px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-rose-400" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-300" />
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
        <span className="ml-3 font-mono text-xs text-[var(--text-muted)]">activity.stream</span>
      </div>
      <div className="activity-terminal-body max-h-64 space-y-1 overflow-y-auto px-4 py-4 font-mono text-[0.8rem] leading-relaxed">
        {rows.map((line, index) => (
          <div key={`${index}-${line}`} className="flex gap-3">
            <span className="w-8 shrink-0 text-right text-xs text-[var(--text-muted)]">{String(index + 1).padStart(2, "0")}</span>
            <span className="whitespace-pre-wrap text-[var(--text-primary)]">{line}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ActivityTerminal({ events, username }) {
  const lines = useMemo(() => {
    if (!Array.isArray(events) || events.length === 0) {
      return [`// waiting for live events from @${username}`];
    }

    return events.slice(0, 12).map((event) => {
      const stamp = event.created_at ? new Date(event.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : "--:--";
      return `[${stamp}] ${formatEventLine(event)}`;
    });
  }, [events, username]);

  const fullText = useMemo(
    () => [`@terminal · github/${username}`, "> streaming public activity", ...lines].join("\n"),
    [lines, username],
  );

  const reducedMotion = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const [visible, setVisible] = useState("");

  useEffect(() => {
    if (reducedMotion) {
      void Promise.resolve().then(() => {
        setVisible(fullText);
      });
      return undefined;
    }

    let index = 0;
    const id = window.setInterval(() => {
      index += 2;
      setVisible(fullText.slice(0, Math.min(index, fullText.length)));
      if (index >= fullText.length) {
        window.clearInterval(id);
      }
    }, 18);

    return () => {
      window.clearInterval(id);
    };
  }, [fullText, reducedMotion]);

  const text = reducedMotion ? fullText : visible;
  const rows = text.length ? text.split("\n") : [" "];

  return <TerminalShell rows={rows} />;
}
