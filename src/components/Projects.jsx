import { memo } from "react";
import Tilt from "react-parallax-tilt";
import { projects } from "../constants";
import SectionWrapper from "./SectionWrapper";

const ProjectCard = memo(function ProjectCard({ project }) {
  return (
    <Tilt
      tiltMaxAngleX={5}
      tiltMaxAngleY={5}
      scale={1.02}
      transitionSpeed={450}
      className="h-full"
    >
      <article className="project-card group flex h-full flex-col overflow-hidden rounded-2xl border border-white/12 bg-slate-900/75 shadow-[0_0_18px_rgba(168,85,247,0.08)]">
        <div className="flex flex-1 flex-col p-5">
          <h3 className="font-['Space_Grotesk'] text-xl font-semibold text-slate-100">{project.name}</h3>
          <p className="mt-3 text-sm leading-relaxed text-slate-300">{project.description}</p>

          <ul className="mt-4 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <li key={`${project.name}-${tag}`} className="skill-tag rounded-full border border-cyan-300/25 bg-cyan-400/10 px-3 py-1 text-xs text-cyan-200">
                {tag}
              </li>
            ))}
          </ul>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            {project.sourceCodeLink ? (
              <a
                href={project.sourceCodeLink}
                target="_blank"
                rel="noreferrer"
                className="btn-secondary rounded-full px-4 py-2 text-xs font-semibold"
              >
                GitHub
              </a>
            ) : null}
            {project.liveDemoLink ? (
              <a
                href={project.liveDemoLink}
                target="_blank"
                rel="noreferrer"
                className="btn-primary rounded-full px-4 py-2 text-xs font-semibold"
              >
                Live Demo
              </a>
            ) : null}
          </div>
        </div>
      </article>
    </Tilt>
  );
});

function ProjectsContent() {
  return (
    <>
      <div>
        <h2 className="section-heading mt-2 text-3xl font-bold sm:text-4xl">Projects</h2>
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.name} project={project} />
        ))}
      </div>
    </>
  );
}

export default SectionWrapper(ProjectsContent, "projects");
