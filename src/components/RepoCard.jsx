import { motion } from "framer-motion";

const item = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
};

export default function RepoCard({ repo, index }) {
  if (!repo) {
    return null;
  }

  const topics = Array.isArray(repo.topics) ? repo.topics.slice(0, 3) : [];

  return (
    <motion.article
      variants={item}
      custom={index}
      className="activity-surface group relative flex h-full flex-col overflow-hidden rounded-2xl p-5 transition duration-300 hover:-translate-y-1 hover:border-cyan-300/40 hover:shadow-[0_16px_40px_rgba(168,85,247,0.22)]"
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-cyan-400/10 via-transparent to-purple-500/10 opacity-0 transition duration-300 group-hover:opacity-100" />
      <div className="relative flex items-start justify-between gap-3">
        <div>
          <h4 className="font-['Space_Grotesk'] text-lg font-semibold text-[var(--text-primary)]">{repo.name}</h4>
          <p className="mt-1 text-xs uppercase tracking-[0.16em] text-[var(--accent-cyan)]">{repo.language}</p>
        </div>
      </div>
      {topics.length ? (
        <div className="relative mt-4 flex flex-wrap gap-2">
          {topics.map((topic) => (
            <span key={topic} className="rounded-full border border-[var(--border-soft)] bg-[var(--accent-cyan-soft)] px-2 py-0.5 text-[0.65rem] text-[var(--text-primary)]">
              #{topic}
            </span>
          ))}
        </div>
      ) : null}
      <div className="relative mt-5 flex flex-wrap gap-3 text-sm font-semibold">
        <a className="text-[var(--accent-cyan)] transition hover:brightness-90" href={repo.html_url} target="_blank" rel="noreferrer">
          View repository
        </a>
        {repo.homepage ? (
          <a className="text-[var(--accent-purple)] transition hover:brightness-90" href={repo.homepage} target="_blank" rel="noreferrer">
            Live site
          </a>
        ) : null}
      </div>
    </motion.article>
  );
}
