import { memo } from "react";
import { motion } from "framer-motion";
import { skillCapabilities, technologies } from "../constants";
import SectionWrapper from "./SectionWrapper";

const SkillCard = memo(function SkillCard({ tech }) {
  return (
    <article className="tech-card flex h-full flex-col items-center rounded-2xl border border-white/12 bg-slate-900/75 p-5 text-center shadow-[0_0_18px_rgba(34,211,238,0.07)]">
      <motion.div
        className="tech-icon-shell"
        whileHover={{ rotate: [0, -8, 8, -4, 0], transition: { duration: 0.5 } }}
      >
        <img
          src={tech.icon}
          alt={`${tech.name} logo`}
          className="tech-icon-img h-10 w-10 object-contain"
          loading="lazy"
          decoding="async"
          width={40}
          height={40}
        />
      </motion.div>
      <h3 className="mt-4 text-sm font-semibold text-slate-100">{tech.name}</h3>
      <p className="mt-1 text-xs uppercase tracking-wider text-slate-400">{tech.category}</p>
    </article>
  );
});

function SkillsContent() {
  return (
    <>
      <div>
        <h2 className="section-heading mt-2 text-3xl font-bold sm:text-4xl">Skills & Technologies</h2>
      </div>

      <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {skillCapabilities.map((capability) => (
          <article
            key={capability.title}
            className="glass rounded-2xl border border-cyan-300/20 bg-slate-900/70 p-5 transition hover:border-cyan-300/40"
          >
            <h3 className="font-['Space_Grotesk'] text-lg font-semibold text-slate-100">{capability.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-300">{capability.proof}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {capability.tags.map((tag) => (
                <span
                  key={`${capability.title}-${tag}`}
                  className="skill-tag rounded-full border border-cyan-300/25 bg-cyan-400/10 px-3 py-1 text-xs text-cyan-200"
                >
                  {tag}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>

      <div className="mt-10">
        <p className="text-sm uppercase tracking-[0.18em] text-slate-400">Technology Toolkit</p>
        <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {technologies.map((tech) => (
            <SkillCard key={tech.name} tech={tech} />
          ))}
        </div>
      </div>
    </>
  );
}

export default SectionWrapper(SkillsContent, "skills");
