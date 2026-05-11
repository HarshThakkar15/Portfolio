import Tilt from "react-parallax-tilt";
import { certifications } from "../constants";
import SectionWrapper from "./SectionWrapper";

function CertificationsContent() {
  return (
    <>
      <div>
        <h2 className="section-heading mt-2 text-3xl font-bold sm:text-4xl">Certifications</h2>
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {certifications.map((certification) => (
          <div key={`${certification.name}-${certification.issuer}`}>
            <Tilt
              tiltMaxAngleX={5}
              tiltMaxAngleY={5}
              scale={1.02}
              transitionSpeed={450}
            >
              <article
                className="glass glow-ring h-full rounded-2xl p-5"
              >
                <h3 className="font-['Space_Grotesk'] text-base font-semibold text-slate-100">{certification.name}</h3>
                <p className="mt-2 text-sm text-cyan-200">{certification.issuer}</p>
                {certification.credentialUrl ? (
                  <a
                    href={certification.credentialUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="cert-view-link mt-4 inline-flex text-xs font-semibold uppercase tracking-wider text-purple-200"
                  >
                    View
                  </a>
                ) : (
                  <p className="mt-4 text-xs text-slate-400"></p>
                )}
              </article>
            </Tilt>
          </div>
        ))}
      </div>
    </>
  );
}

export default SectionWrapper(CertificationsContent, "certifications");
