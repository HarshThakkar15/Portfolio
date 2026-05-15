import { useEffect, useMemo, useState } from "react";

function formatEventLine(event) {
  if (!event) {
    return "";
  }

  const repoName = event.repo?.name ? event.repo.name.split("/").pop() : "repository";
  const type = event.type ?? "Event";

  switch (event.type) {
    case "PushEvent":
      {
        const payload = event.payload ?? {};
        const commitCount =
          typeof payload.distinct_size === "number"
            ? payload.distinct_size
            : typeof payload.size === "number"
              ? payload.size
              : Array.isArray(payload.commits)
                ? payload.commits.length
                : null;

        return commitCount == null
          ? `git push → ${repoName}`
          : `git push → ${repoName} (${commitCount} ${commitCount === 1 ? "commit" : "commits"})`;
      }
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
    <div className="activity-terminal flex max-h-[min(52vh,22rem)] w-full min-w-0 flex-col overflow-hidden rounded-xl shadow-inner shadow-cyan-500/10 sm:max-h-[min(50vh,24rem)] sm:rounded-2xl lg:max-h-[17.5rem]">
      <div className="flex min-w-0 shrink-0 items-center border-b border-[var(--border-soft)] px-2 py-2 sm:gap-2 sm:px-3 sm:py-2.5 lg:px-4 lg:py-2">
        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2" aria-hidden>
          <span className="h-2 w-2 rounded-full bg-rose-400 sm:h-2.5 sm:w-2.5" />
          <span className="h-2 w-2 rounded-full bg-amber-300 sm:h-2.5 sm:w-2.5" />
          <span className="h-2 w-2 rounded-full bg-emerald-400 sm:h-2.5 sm:w-2.5" />
        </div>
        <span className="min-w-0 flex-1 truncate text-center font-mono text-[0.65rem] text-[var(--text-muted)] sm:text-xs">
          activity.stream
        </span>
        <div className="w-[2.125rem] shrink-0 sm:w-14" aria-hidden />
      </div>
      <div className="activity-terminal-body min-h-0 flex-1 space-y-0 overflow-y-auto overflow-x-hidden px-2 py-2 font-mono text-[0.6875rem] leading-tight sm:space-y-px sm:px-3 sm:py-2.5 sm:text-[0.75rem] sm:leading-snug lg:px-4 lg:py-2.5 lg:text-[0.8125rem] lg:leading-normal">
        {rows.map((line, index) => (
          <div
            key={`${index}-${line}`}
            className="grid min-w-0 grid-cols-[1.75rem_1fr] items-baseline gap-x-2 sm:grid-cols-[2rem_1fr] sm:gap-x-2.5 lg:grid-cols-[2.125rem_1fr] lg:gap-x-3"
          >
            <span className="select-none text-right tabular-nums text-[var(--text-muted)] [line-height:inherit]">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="min-w-0 [overflow-wrap:anywhere] whitespace-pre-wrap text-[var(--text-primary)] [line-height:inherit]">{line}</span>
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
