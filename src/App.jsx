import { useEffect, useState } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import {
  About,
  Certifications,
  CodeRainBackground,
  Contact,
  Experience,
  Footer,
  Hero,
  Navbar,
  Projects,
  ScrollToTopButton,
  Skills,
  MouseParticles,
  TerminalLoader,
} from "./components";
import { sectionToggles } from "./constants";

const DEFAULT_THEME = "dawn";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [pathname]);

  return null;
}

function HomePage({ theme, onToggleTheme }) {
  const [enableBackgroundEffects, setEnableBackgroundEffects] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const hasLowCpu = typeof navigator.hardwareConcurrency === "number" && navigator.hardwareConcurrency <= 4;
    const hasDataSaver = typeof navigator.connection?.saveData === "boolean" && navigator.connection.saveData;
    const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
    const smallViewport = window.innerWidth < 768;

    if (prefersReducedMotion || hasLowCpu || hasDataSaver || (coarsePointer && smallViewport)) {
      return undefined;
    }

    let cancelled = false;
    let timeoutId = null;

    const enableEffects = () => {
      if (!cancelled) {
        setEnableBackgroundEffects(true);
      }
    };

    if ("requestIdleCallback" in window) {
      const idleId = window.requestIdleCallback(enableEffects, { timeout: 1200 });
      return () => {
        cancelled = true;
        window.cancelIdleCallback(idleId);
      };
    }

    timeoutId = window.setTimeout(enableEffects, 650);
    return () => {
      cancelled = true;
      if (timeoutId) {
        window.clearTimeout(timeoutId);
      }
    };
  }, []);

  return (
    <div className="theme-shell relative min-h-screen overflow-hidden">
      <MouseParticles active={enableBackgroundEffects} />
      <CodeRainBackground theme={theme} active={enableBackgroundEffects} />
      <div className="theme-shell-overlay pointer-events-none absolute inset-0 -z-0" />

      <div className="relative z-10">
        <Navbar theme={theme} onToggleTheme={onToggleTheme} />
        <main>
          <Hero />
          {sectionToggles.about ? <About /> : null}
          {sectionToggles.skills ? <Skills /> : null}
          {sectionToggles.projects ? <Projects /> : null}
          {sectionToggles.experience ? <Experience /> : null}
          {sectionToggles.certifications ? <Certifications /> : null}
          {sectionToggles.contact ? <Contact /> : null}
        </main>
        <Footer />
        <ScrollToTopButton />
      </div>
    </div>
  );
}

export default function App() {
  const [theme, setTheme] = useState(DEFAULT_THEME);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "nebula" ? "dawn" : "nebula"));
  };

  return (
    <>
      {loading ? (
        <TerminalLoader onComplete={() => setLoading(false)} />
      ) : (
        <>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<HomePage theme={theme} onToggleTheme={toggleTheme} />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </>
      )}
    </>
  );
}
