import { motion } from "framer-motion";
import { personalInfo } from "../constants";
import useGithubDashboard from "../hooks/useGithubDashboard";
import ActivityTerminal from "./ActivityTerminal";
import GithubStats from "./GithubStats";
import RepoCard from "./RepoCard";
import SectionWrapper from "./SectionWrapper";


const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

function DeveloperActivityContent() {
  const { username, status, error, profile, metrics, events, reload } = useGithubDashboard(personalInfo.github);

  return (
    <>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h2 className="section-heading mt-2 text-3xl font-bold sm:text-4xl">Developer Activity</h2>
        </div>
      </div>

      {status === "loading" ? (
        <div className="mt-10 grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="h-48 animate-pulse rounded-2xl border border-white/5 bg-slate-900/40" />
          <div className="h-48 animate-pulse rounded-2xl border border-white/5 bg-slate-900/40" />
        </div>
      ) : null}

      {status === "error" ? (
        <div className="mt-10 rounded-2xl border border-rose-400/40 bg-rose-500/10 px-6 py-5 text-sm text-rose-50">
          <p className="font-semibold">GitHub data unavailable</p>
          <p className="mt-2 text-rose-100/90">{error}</p>
          <button type="button" className="btn-muted mt-4 rounded-full px-4 py-2 text-xs font-semibold" onClick={reload}>
            Retry request
          </button>
        </div>
      ) : null}

      {status === "ready" && profile ? (
        <div className="mt-10 space-y-10">
          <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={container}>
            <GithubStats profile={profile} metrics={metrics} />
          </motion.div>

          <div className="grid min-w-0 gap-6 items-stretch lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="activity-surface relative overflow-hidden rounded-3xl p-5 sm:p-6 lg:p-5"
            >
              <div className="pointer-events-none absolute -right-10 top-0 h-40 w-40 rounded-full bg-purple-500/20 blur-3xl" />
              <div className="relative flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-5 lg:gap-4">
                <img
                  src={profile.avatar_url}
                  alt={`${profile.login} avatar`}
                  className="h-[5.5rem] w-[5.5rem] shrink-0 rounded-2xl border border-cyan-300/30 object-cover shadow-lg shadow-cyan-500/20 sm:h-24 sm:w-24"
                  loading="lazy"
                />
                <div className="flex min-w-0 flex-1 flex-col">
                  <p className="text-xs uppercase tracking-[0.3em] text-[var(--text-muted)]">GitHub profile</p>
                  <h3 className="mt-1.5 font-['Space_Grotesk'] text-xl font-semibold text-[var(--text-primary)] sm:mt-2 sm:text-2xl">{profile.name || profile.login}</h3>
                  <p className="text-sm text-[var(--accent-cyan)]">@{profile.login}</p>
                  <p className="mt-2 text-sm leading-snug text-[var(--text-primary)] sm:mt-3">{profile.bio || "Building in public with a focus on full stack delivery."}</p>
                  <div className="mt-3 flex flex-wrap gap-2 text-xs text-[var(--text-muted)] sm:mt-4 sm:gap-3">
                    {profile.location ? <span>{profile.location}</span> : null}
                    {profile.company ? <span>{profile.company}</span> : null}
                    {profile.blog ? (
                      <a className="text-[var(--accent-cyan)] hover:brightness-90" href={profile.blog} target="_blank" rel="noreferrer">
                        Website
                      </a>
                    ) : null}
                    <a className="text-[var(--accent-purple)] hover:brightness-90" href={profile.html_url} target="_blank" rel="noreferrer">
                      View on GitHub
                    </a>
                  </div>
                </div>
              </div>
            </motion.article>

            <motion.div
              className="min-w-0"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.55, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
            >
              <ActivityTerminal
                key={`${username}-${events[0]?.id ?? "none"}-${events.length}`}
                events={events}
                username={username}
              />
            </motion.div>
          </div>


          <div>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h3 className="font-['Space_Grotesk'] text-xl font-semibold text-[var(--text-primary)]">Latest repositories</h3>
                
              </div>
            </div>
            <motion.div
              className="mt-6 grid gap-5 md:grid-cols-2"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.15 }}
              variants={container}
            >
              {metrics.latestRepos.map((repo, index) => (
                <RepoCard key={repo.id ?? repo.name} repo={repo} index={index} />
              ))}
            </motion.div>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default SectionWrapper(DeveloperActivityContent, "activity");
