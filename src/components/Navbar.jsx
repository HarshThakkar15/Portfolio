import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { logo } from "../assets";
import { navLinks, personalInfo } from "../constants";

function ThemeToggleContent() {
  return (
    <>
      <span className="theme-toggle-icon" aria-hidden="true">
        <svg
          className="theme-icon sun-icon"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.8" />
          <path d="M12 2.5V5.1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M12 18.9V21.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M2.5 12H5.1" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M18.9 12H21.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M5.6 5.6L7.4 7.4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M16.6 16.6L18.4 18.4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M5.6 18.4L7.4 16.6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M16.6 7.4L18.4 5.6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
        <svg
          className="theme-icon moon-icon"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M18.4 14.2C17.8 14.4 17.1 14.5 16.4 14.5C13.1 14.5 10.4 11.8 10.4 8.5C10.4 7.8 10.5 7.2 10.7 6.6C7.6 7.2 5.3 10 5.3 13.3C5.3 17 8.3 20 12 20C15 20 17.5 18 18.4 15.2"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </>
  );
}

export default function Navbar({ theme, onToggleTheme, navItems = navLinks }) {
  const [active, setActive] = useState(navItems[0]?.id ?? "");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const rafRef = useRef(null);

  useEffect(() => {
    const updateState = () => {
      setScrolled(window.scrollY > 20);

      const marker = window.scrollY + 180;
      let activeSection = navItems[0]?.id ?? "";

      navItems.forEach((item) => {
        const section = document.getElementById(item.id);
        if (section && marker >= section.offsetTop) {
          activeSection = item.id;
        }
      });

      setActive((prev) => (prev === activeSection ? prev : activeSection));
    };

    const handleScroll = () => {
      if (rafRef.current !== null) {
        return;
      }
      rafRef.current = window.requestAnimationFrame(() => {
        updateState();
        rafRef.current = null;
      });
    };

    updateState();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      if (rafRef.current !== null) {
        window.cancelAnimationFrame(rafRef.current);
      }
    };
  }, [navItems]);

  const scrollToSection = (id) => {
    setActive(id);
    setMenuOpen(false);
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const nextThemeLabel = theme === "nebula" ? "Dawn" : "Nebula";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b py-3 transition-[background-color,border-color,box-shadow] duration-300 ease-out ${scrolled ? "nav-scrolled border-white/10 shadow-[0_12px_40px_rgba(2,6,23,0.18)]" : "border-transparent bg-transparent"
        }`}
    >
      <nav className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 sm:px-10 lg:px-12">
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="nav-logo group flex items-center gap-3"
          aria-label="Scroll to top"
        >
          <img src={logo} alt="Harsh logo" className="h-10 w-10 rounded-lg border border-cyan-300/20" />
          <div className="text-left">
            <p className="font-['Space_Grotesk'] text-base font-semibold text-slate-50 sm:text-lg">{personalInfo.name}</p>
            <p className="text-xs text-slate-400">Developer Portfolio</p>
          </div>
        </button>

        <ul className="hidden items-center gap-7 md:flex">
          {navItems.map((item) => (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => scrollToSection(item.id)}
                className={`nav-link text-sm font-medium transition hover:text-cyan-300 ${active === item.id ? "text-cyan-300 nav-active" : "text-slate-300"
                  }`}
              >
                {item.title}
              </button>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onToggleTheme}
            className="theme-toggle hidden md:inline-flex"
            aria-label={`Switch to ${nextThemeLabel} theme`}
          >
            <ThemeToggleContent />
          </button>

          <button
            type="button"
            className="group md:hidden"
            aria-label="Toggle menu"
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            <span className={`mb-1 block h-0.5 w-6 bg-[var(--text-primary)] transition-all duration-300 origin-center ${menuOpen ? "translate-y-[3px] rotate-45" : ""}`} />
            <span className={`mb-1 block h-0.5 w-6 bg-[var(--text-primary)] transition-all duration-300 ${menuOpen ? "opacity-0 scale-x-0" : ""}`} />
            <span className={`block h-0.5 w-6 bg-[var(--text-primary)] transition-all duration-300 origin-center ${menuOpen ? "-translate-y-[5px] -rotate-45" : ""}`} />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.97 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="glass mx-6 mt-3 rounded-xl border border-white/10 p-4 md:hidden"
          >
            <div className="mb-3">
              <button
                type="button"
                onClick={onToggleTheme}
                className="theme-toggle w-full justify-center"
                aria-label={`Switch to ${nextThemeLabel} theme`}
              >
                <ThemeToggleContent />
              </button>
            </div>
            <ul className="flex flex-col gap-3">
              {navItems.map((item, index) => (
                <motion.li
                  key={item.id}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.25 }}
                >
                  <button
                    type="button"
                    onClick={() => scrollToSection(item.id)}
                    className={`w-full rounded-md px-2 py-2 text-left text-sm transition hover:bg-white/5 ${active === item.id ? "text-cyan-300" : "text-slate-200"
                      }`}
                  >
                    {item.title}
                  </button>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
