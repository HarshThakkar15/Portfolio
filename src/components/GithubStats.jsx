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

  return (
    <span className={className}>
      {display.toLocaleString()}
    </span>
  );
}

export default function GithubStats({ profile, metrics }) {
  if (!profile) return null;

  const cards = [
    {
      label: "Public repositories",
      value: metrics.publicRepos,
      hint: "Total repos fetched from GitHub",
    },
    {
      label: "Recent activity",
      value: metrics.contributions.length,
      hint: "Total recent activity fetched from GitHub",
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {cards.map((card) => (
        <motion.article
          key={card.label}
          variants={statCard}
          className="activity-surface group relative overflow-hidden rounded-2xl px-5 py-6 transition duration-300 hover:border-cyan-300/45 hover:shadow-[0_12px_40px_rgba(34,211,238,0.18)]"
        >
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-cyan-400/10 via-transparent to-purple-500/10 opacity-0 transition duration-300 group-hover:opacity-100" />

          <p className="text-xs uppercase tracking-[0.18em] text-[var(--text-muted)]">
            {card.label}
          </p>

          <p className="mt-3 font-['Space_Grotesk'] text-3xl font-semibold text-[var(--text-primary)]">
            <AnimatedInteger value={card.value} />
          </p>

          <p className="mt-2 text-xs text-[var(--text-muted)]">
            {card.hint}
          </p>
        </motion.article>
      ))}
    </div>
  );
}