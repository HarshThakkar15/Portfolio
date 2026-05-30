import { lazy, Suspense, useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { resume } from "../assets";
import { personalInfo, socialLinks } from "../constants";
import SocialIcon from "./SocialIcon";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] },
});

const scaleIn = (delay = 0) => ({
  initial: { opacity: 0, scale: 0.85 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.45, delay, ease: [0.22, 1, 0.36, 1] },
});

export default function Hero() {
  const roles = useMemo(() => personalInfo.roles ?? [], []);
  const [roleIndex, setRoleIndex] = useState(0);
  const [typedRole, setTypedRole] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [terminalOutput, setTerminalOutput] = useState("");

  const terminalScript = useMemo(() => {
    return [
      "> MERN Stack Developer",
      "> REST APIs & Database Design",
      "> Production Ready Web Applications",
      "> Available for Full Stack Opportunities",
    ].join("\n");
  }, []);

  useEffect(() => {
    if (!roles.length) {
      return undefined;
    }

    const currentRole = roles[roleIndex] ?? "";
    const delay =
      !isDeleting && typedRole !== currentRole
        ? 90
        : !isDeleting && typedRole === currentRole
          ? 1300
          : isDeleting && typedRole
            ? 55
            : 240;

    const timer = setTimeout(() => {
      if (!isDeleting && typedRole !== currentRole) {
        setTypedRole(currentRole.slice(0, typedRole.length + 1));
        return;
      }

      if (!isDeleting && typedRole === currentRole) {
        setIsDeleting(true);
        return;
      }

      if (isDeleting && typedRole) {
        setTypedRole((prev) => prev.slice(0, -1));
        return;
      }

      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, delay);

    return () => clearTimeout(timer);
  }, [isDeleting, roleIndex, roles, typedRole]);

  useEffect(() => {
    let index = 0;

    const timer = window.setInterval(() => {
      index += 1;
      setTerminalOutput(terminalScript.slice(0, index));

      if (index >= terminalScript.length) {
        window.clearInterval(timer);
      }
    }, 20);

    return () => window.clearInterval(timer);
  }, [terminalScript]);

  const scrollToContact = () => {
    const section = document.getElementById("contact");
    section?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const heroSocialLinks = socialLinks.filter((link) => Boolean(link.url));
  const terminalLines = terminalOutput.split("\n");
  const terminalDone = terminalOutput.length >= terminalScript.length;

  return (
    <section
      className="relative flex min-h-screen items-center overflow-hidden px-5 pb-20 pt-36 sm:px-10 lg:px-12"
      id="home"
    >
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_18%_20%,rgba(34,211,238,0.14),transparent_30%),radial-gradient(circle_at_82%_12%,rgba(168,85,247,0.16),transparent_34%)]" />

      <div className="mx-auto grid w-full max-w-7xl gap-10 lg:grid-cols-2 lg:items-center">
        <div className="relative z-10 flex flex-col justify-center">
          <motion.p
            {...fadeUp(0.1)}
            className="mb-3 text-sm uppercase tracking-[0.24em] text-cyan-300"
          >
            Crafting scalable, immersive web experiences
          </motion.p>

          <motion.h1
            {...fadeUp(0.25)}
            className="text-4xl font-bold leading-tight text-slate-50 sm:text-5xl lg:text-6xl"
          >
            {personalInfo.name}
          </motion.h1>

          <motion.p
            {...fadeUp(0.4)}
            className="mt-5 max-w-xl text-base text-slate-300 sm:text-lg"
          >
            {personalInfo.tagline}
          </motion.p>

          <motion.div {...fadeUp(0.55)} className="mt-6 min-h-8">
            <p className="font-['Space_Grotesk'] text-lg font-semibold text-purple-300 sm:text-xl">
              {typedRole}
              <span className="ml-0.5 inline-block animate-pulse text-cyan-200">|</span>
            </p>
          </motion.div>

          <motion.div {...fadeUp(0.65)} className="mt-9 flex flex-wrap gap-4">
            <a
              href={resume}
              download="Harsh_Thakkar Resume.pdf"
              className="btn-primary rounded-full px-6 py-3 text-sm font-semibold"
            >
              Download Resume
            </a>
            <button
              type="button"
              onClick={scrollToContact}
              className="btn-secondary rounded-full px-6 py-3 text-sm font-semibold"
            >
              Contact Me
            </button>
          </motion.div>

          <motion.div
            {...fadeUp(0.8)}
            className="availability-chip mt-6 inline-flex w-fit items-center gap-3 rounded-full border border-cyan-300/30 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-200"
          >
            <span className="relative flex h-2.5 w-2.5 items-center justify-center">
              <span className="absolute h-full w-full animate-ping rounded-full bg-emerald-400/70" />
              <span className="relative h-2.5 w-2.5 rounded-full bg-emerald-400" />
            </span>
            {personalInfo.availabilityShort}
          </motion.div>

          <motion.div
            {...fadeUp(0.9)}
            className="mt-7 flex flex-wrap items-center gap-3"
          >
            {heroSocialLinks.map((social, index) => (
              <motion.a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noreferrer"
                aria-label={social.name}
                className="icon-action h-10 w-10"
                {...scaleIn(1.0 + index * 0.08)}
              >
                <SocialIcon type={social.icon} className="h-4 w-4 text-current" />
                <span className="sr-only">{social.name}</span>
              </motion.a>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 40, scale: 0.96 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="hero-focus-shell relative z-10 mx-auto w-full max-w-xl overflow-hidden rounded-2xl border border-cyan-300/20 bg-slate-900/70 p-4 shadow-[0_0_32px_rgba(34,211,238,0.12)] sm:rounded-3xl sm:p-5 md:p-6 lg:mx-0 lg:max-w-none"
        >
          <div className="hero-focus-panel flex min-w-0 flex-col rounded-xl border border-white/10 sm:rounded-2xl">
            <div className="flex shrink-0 items-center border-b border-white/10 px-2 py-3 sm:gap-2 sm:px-4 sm:py-3 lg:px-6 lg:py-3.5 xl:px-7 xl:py-4">
              <div className="flex shrink-0 items-center gap-1.5 sm:gap-2" aria-hidden>
                <span className="h-2 w-2 rounded-full bg-rose-400 sm:h-2.5 sm:w-2.5 lg:h-3 lg:w-3" />
                <span className="h-2 w-2 rounded-full bg-amber-300 sm:h-2.5 sm:w-2.5 lg:h-3 lg:w-3" />
                <span className="h-2 w-2 rounded-full bg-emerald-400 sm:h-2.5 sm:w-2.5 lg:h-3 lg:w-3" />
              </div>
              <span className="min-w-0 flex-1 truncate text-center font-mono text-[0.65rem] text-slate-400 sm:text-xs lg:text-sm lg:tracking-wide">
                career-story.js
              </span>
              <div className="w-[2.125rem] shrink-0 sm:w-14 lg:w-16 xl:w-[4.5rem]" aria-hidden />
            </div>

            <div className="hero-focus-copy min-w-0 px-2 py-3 font-mono text-[0.6875rem] leading-[1.5] sm:px-4 sm:py-5 sm:text-[0.8125rem] sm:leading-6 md:text-[0.875rem] md:leading-[1.55] lg:px-6 lg:py-6 lg:text-[0.9375rem] lg:leading-7 xl:px-7 xl:py-7 xl:text-[1rem] xl:leading-7">
              {terminalLines.map((line, index) => (
                <div
                  key={`${line}-${index}`}
                  className="grid min-w-0 grid-cols-[1.75rem_1fr] items-baseline gap-x-2 sm:grid-cols-[2.125rem_1fr] sm:gap-x-3 lg:grid-cols-[2.375rem_1fr] lg:gap-x-4 lg:rounded-lg lg:px-2 lg:py-0 lg:transition-colors lg:hover:bg-cyan-400/[0.08] xl:px-2.5"
                >
                  <span className="select-none text-right tabular-nums text-slate-500">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="min-w-0 [overflow-wrap:anywhere] whitespace-pre-wrap text-slate-200 [line-height:inherit]">
                    {line || " "}
                  </span>
                </div>
              ))}
              {!terminalDone ? (
                <div className="mt-1 grid min-w-0 grid-cols-[1.75rem_1fr] items-center gap-x-2 sm:grid-cols-[2.125rem_1fr] sm:gap-x-3 lg:grid-cols-[2.375rem_1fr] lg:gap-x-4 lg:px-2 xl:px-2.5">
                  <span className="block min-h-[1em]" aria-hidden />
                  <span className="inline-block h-3.5 w-1.5 animate-pulse bg-cyan-300 sm:h-4 sm:w-2" />
                </div>
              ) : null}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
