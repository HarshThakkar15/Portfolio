import { navLinks, personalInfo, socialLinks } from "../constants";
import SocialIcon from "./SocialIcon";

function scrollToSection(id) {
  if (id === "home") {
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }

  const section = document.getElementById(id);
  section?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function Footer() {
  const footerSocials = socialLinks.filter((social) => Boolean(social.url));

  return (
    <footer className="border-t border-white/10 bg-slate-950/70 px-6 py-10 sm:px-10 lg:px-12">
      <div className="mx-auto grid w-full max-w-7xl gap-8 lg:grid-cols-[1.3fr_1fr_1.1fr]">
        <div>
          <h3 className="font-['Space_Grotesk'] text-xl font-semibold text-slate-100">
            {personalInfo.name}
          </h3>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-slate-300">
            Full Stack Developer building scalable applications with clean architecture, thoughtful UI and production ready workflows.
          </p>
        </div>

        <div>
          <h4 className="font-['Space_Grotesk'] text-base font-semibold text-slate-100">Quick Links</h4>
          <ul className="mt-4 space-y-2">
            <li>
              <button type="button" onClick={() => scrollToSection("home")} className="footer-link text-sm text-slate-300 transition hover:text-cyan-300">
                Home
              </button>
            </li>
            {navLinks.map((item) => (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => scrollToSection(item.id)}
                  className="footer-link text-sm text-slate-300 transition hover:text-cyan-300"
                >
                  {item.title}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-['Space_Grotesk'] text-base font-semibold text-slate-100">Contact Info</h4>
          <div className="mt-4 space-y-2 text-sm text-slate-300">
            <p>{personalInfo.location}</p>
            <a href={`mailto:${personalInfo.email}`} className="footer-link block transition hover:text-cyan-300">
              {personalInfo.email}
            </a>
            <p>{personalInfo.phone}</p>
          </div>
          <div className="mt-5 flex flex-wrap gap-3">
            {footerSocials.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noreferrer"
                aria-label={social.name}
                className="icon-action h-10 w-10"
              >
                <SocialIcon type={social.icon} className="h-4 w-4 text-current" />
                <span className="sr-only">{social.name}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
