import { animate, motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const statCard = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

function AnimatedInteger({ value, className }) {
  const latest = useRef(value);
  const [display, setDisplay] = useState(value);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) {
      setDisplay(Math.round(value));
      return;
    }

    const controls = animate(latest.current, value, {
      duration: 1.15,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => {
        const rounded = Math.round(v);
        latest.current = rounded;
        setDisplay(rounded);
      },
    });

    return () => controls.stop();
  }, [reducedMotion, value]);

  return <span className={className}>{display.toLocaleString()}</span>;
}

function ActivityStatCard({ label, value, hint, accent }) {
  const accentStyles = {
    cyan: {
      blur: "bg-cyan-500/20",
      value: "text-[var(--accent-cyan)]",
    },
    purple: {
      blur: "bg-purple-500/20",
      value: "text-[var(--accent-purple)]",
    },
  };
  const theme = accentStyles[accent] ?? accentStyles.cyan;

  return (
    <motion.article
      variants={statCard}
      className="activity-surface group relative flex h-full min-h-0 min-w-0 flex-col overflow-hidden rounded-2xl p-5 sm:p-6"
    >
      <div className={`pointer-events-none absolute -right-8 top-0 h-28 w-28 rounded-full blur-3xl ${theme.blur}`} />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-cyan-400/5 via-transparent to-purple-500/5 opacity-100 transition duration-300 group-hover:from-cyan-400/10 group-hover:to-purple-500/10" />

      <div className="relative flex h-full min-h-0 flex-col justify-between gap-3">
        <p className="text-xs uppercase tracking-[0.3em] text-[var(--text-muted)]">{label}</p>

        <p className={`font-['Space_Grotesk'] text-4xl font-semibold leading-none text-center justify-center tabular-nums ${theme.value}`}>
          <AnimatedInteger value={value} />
        </p>

        <p className="border-t border-[var(--border-soft)] pt-3 text-[0.7rem] leading-snug text-[var(--text-muted)]">{hint}</p>
      </div>
    </motion.article>
  );
}

export default function GithubStats({ profile, metrics }) {
  if (!profile) return null;

  const cards = [
    {
      label: "Public repositories",
      value: metrics.publicRepos,
      hint: "Repos loaded from GitHub profile",
      accent: "cyan",
    },
    {
      label: "Recent activity",
      value: metrics.recentActivityCount,
      hint: "Public events from GitHub feed",
      accent: "purple",
    },
  ];

  return (
    <>
      {cards.map((card) => (
        <ActivityStatCard key={card.label} {...card} />
      ))}
    </>
  );
}

export { statCard };
