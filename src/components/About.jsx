import { aboutHighlights, personalInfo } from "../constants";
import SectionWrapper from "./SectionWrapper";

function AboutContent() {
  return (
    <>
      <div>
        <h2 className="section-heading mt-2 text-3xl font-bold sm:text-4xl">About Me</h2>
      </div>

      <p className="mt-6 max-w-3xl text-base leading-relaxed text-slate-300">
        {personalInfo.about}
      </p>

      <div className="mt-10 grid gap-6 lg:grid-cols-[1.1fr_1fr]">
        <article className="glass rounded-2xl p-6">
          <h3 className="font-['Space_Grotesk'] text-xl font-semibold text-slate-100">Education</h3>
          <p className="mt-3 text-lg text-cyan-200">{personalInfo.education.degree}</p>
          <p className="mt-1 text-slate-300">{personalInfo.education.institute}</p>
          <p className="mt-2 text-sm text-slate-400">{personalInfo.education.period}</p>
          <p className="mt-2 text-sm text-purple-200">{personalInfo.education.score}</p>
        </article>

        <article className="glass rounded-2xl p-6">
          <h3 className="font-['Space_Grotesk'] text-xl font-semibold text-slate-100">Experience Snapshot</h3>
          <p className="mt-3 text-cyan-200">Full Stack Developer Intern</p>
          <p className="text-slate-300">REAI Innovations Pvt. Ltd.</p>
          <p className="mt-2 text-sm text-slate-400">Dec 2025 - Apr 2026</p>
        </article>
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-3">
        {aboutHighlights.map((item) => (
          <article key={item.title} className="glass rounded-2xl p-5">
            <h4 className="font-['Space_Grotesk'] text-base font-semibold text-slate-100">{item.title}</h4>
            <p className="mt-2 text-sm leading-relaxed text-slate-300">{item.value}</p>
          </article>
        ))}
      </div>
    </>
  );
}

export default SectionWrapper(AboutContent, "about");
