import { personalInfo } from "../constants";
import SectionWrapper from "./SectionWrapper";
import SocialIcon from "./SocialIcon";

function ContactContent() {
  const contactLinks = [
    {
      label: "Email",
      value: personalInfo.email,
      href: `mailto:${personalInfo.email}`,
      icon: "email",
      wide: true,
      variant: "email",
    },
    {
      label: "LinkedIn",
      value: "View profile",
      href: personalInfo.linkedIn,
      icon: "linkedin",
      wide: false,
      variant: "external",
    },
    {
      label: "GitHub",
      value: "View profile",
      href: personalInfo.github,
      icon: "github",
      wide: false,
      variant: "external",
    },
    {
      label: "WhatsApp",
      value: "Message me",
      href: "https://wa.me/919662050094",
      icon: "whatsapp",
      wide: true,
      variant: "external",
    },
  ];

  return (
    <>
      <div>
        <p className="text-sm uppercase tracking-[0.22em] text-cyan-300">Get In Touch</p>
        <h2 className="section-heading mt-2 text-3xl font-bold sm:text-4xl">Contact</h2>
      </div>

      <div className="mt-10">
        <div className="glass relative overflow-hidden rounded-2xl p-6">
          <div className="rounded-xl border border-white/10 bg-[radial-gradient(circle_at_35%_30%,rgba(34,211,238,0.22),transparent_34%),radial-gradient(circle_at_70%_66%,rgba(168,85,247,0.24),transparent_40%)] p-6 sm:p-8">
            <h3 className="font-['Space_Grotesk'] text-xl font-semibold text-slate-100">Connect With Me</h3>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-300">
              Reach out by email or WhatsApp, or connect on LinkedIn and GitHub — whichever you prefer.
            </p>
            <div className="availability-chip mt-4 inline-flex items-center gap-3 rounded-full px-4 py-2 text-xs font-semibold tracking-[0.08em]">
              <span className="relative flex h-2.5 w-2.5 items-center justify-center">
                <span className="absolute h-full w-full animate-ping rounded-full bg-emerald-400/70" />
                <span className="relative h-2.5 w-2.5 rounded-full bg-emerald-400" />
              </span>
              Open to Full Stack & MERN opportunities
            </div>
            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
              {contactLinks.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.variant === "email" ? undefined : "_blank"}
                  rel={item.variant === "email" ? undefined : "noopener noreferrer"}
                  className={`contact-link group relative flex min-h-[4.25rem] items-center gap-4 rounded-xl border border-white/15 bg-slate-900/45 px-4 py-3.5 text-sm sm:px-5 ${
                    item.wide ? "sm:col-span-2" : ""
                  }`}
                >
                  <span
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-cyan-300 transition-[border-color,background-color,color] duration-300 group-hover:border-cyan-400/35 group-hover:bg-cyan-500/10 group-hover:text-cyan-200"
                    aria-hidden
                  >
                    <SocialIcon type={item.icon} className="h-5 w-5" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-xs uppercase tracking-[0.16em] text-slate-400">{item.label}</span>
                    <span
                      className={`mt-0.5 block break-words ${
                        item.variant === "email"
                          ? "font-medium text-slate-100 group-hover:text-white"
                          : "font-semibold text-cyan-300 underline decoration-cyan-500/35 underline-offset-[5px] transition-colors group-hover:text-cyan-200 group-hover:decoration-cyan-400/60"
                      }`}
                    >
                      {item.value}
                    </span>
                  </span>
                  <span
                    className="hidden shrink-0 text-lg font-semibold text-cyan-400/90 opacity-0 transition-[opacity,transform] duration-300 group-hover:translate-x-0.5 group-hover:opacity-100 sm:block"
                    aria-hidden
                  >
                    →
                  </span>
                </a>
              ))}
            </div>
            <p className="mt-6 max-w-3xl text-xs leading-relaxed text-slate-400">
              {personalInfo.availabilityMessage}
            </p>
            <p className="mt-2 text-xs text-slate-400">Typical response window: within 24 hours.</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default SectionWrapper(ContactContent, "contact");
