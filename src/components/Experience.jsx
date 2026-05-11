import { VerticalTimeline, VerticalTimelineElement } from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { experiences } from "../constants";
import SectionWrapper from "./SectionWrapper";

function ExperienceContent() {
  return (
    <>
      <div>
        <h2 className="section-heading mt-2 text-3xl font-bold sm:text-4xl">Experience</h2>
      </div>

      <div className="mt-10">
        <VerticalTimeline animate={false} lineColor="var(--timeline-line-color)">
          {experiences.map((experience) => (
            <VerticalTimelineElement
              key={`${experience.companyName}-${experience.date}`}
              visible
              contentStyle={{
                background: "var(--timeline-card-bg)",
                color: "var(--text-primary)",
                border: "1px solid var(--timeline-card-border)",
                borderRadius: "16px",
                boxShadow: "var(--timeline-card-shadow)",
              }}
              contentArrowStyle={{ borderRight: "7px solid var(--timeline-card-bg)" }}
              date={experience.date}
              iconStyle={{ background: experience.iconBg, color: "var(--timeline-icon-text)" }}
              icon={
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path
                    d="M3 9.75C3 8.50736 4.00736 7.5 5.25 7.5H18.75C19.9926 7.5 21 8.50736 21 9.75V17.25C21 18.4926 19.9926 19.5 18.75 19.5H5.25C4.00736 19.5 3 18.4926 3 17.25V9.75Z"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  />
                  <path d="M9 7.5V6.75C9 5.50736 10.0074 4.5 11.25 4.5H12.75C13.9926 4.5 15 5.50736 15 6.75V7.5" stroke="currentColor" strokeWidth="1.8" />
                  <path d="M3 12.75H21" stroke="currentColor" strokeWidth="1.8" />
                </svg>
              }
            >
              <h3 className="font-['Space_Grotesk'] text-lg font-semibold">{experience.title}</h3>
              <p className="mt-1 text-sm text-cyan-200">{experience.companyName}</p>
              <ul className="mt-4 space-y-2">
                {experience.points.map((point) => (
                  <li key={point} className="text-sm leading-relaxed text-slate-300">
                    {point}
                  </li>
                ))}
              </ul>
            </VerticalTimelineElement>
          ))}
        </VerticalTimeline>
      </div>
    </>
  );
}

export default SectionWrapper(ExperienceContent, "experience");
