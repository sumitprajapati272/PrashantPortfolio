import { useEffect, useState } from "react";
import { Menu, Moon, Sun, X } from "lucide-react";
import { useTheme } from "../context/ThemeContext.jsx";
import { navItems } from "../utils/navItems.js";

export default function SiteHeader({ name }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const [activeHref, setActiveHref] = useState("");

  // Highlight the nav link for the section currently in view.
  useEffect(() => {
    const update = () => {
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
      let current = "";
      if (atBottom) current = navItems[navItems.length - 1].href;
      else {
        const line = window.innerHeight * 0.35;
        for (const item of navItems) {
          const section = document.querySelector(item.href);
          if (section && section.getBoundingClientRect().top <= line) current = item.href;
        }
      }
      setActiveHref(current);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="site-header">
      <div className="header-inner">
        <a className="brand" href="#home" onClick={closeMenu} aria-label={`${name}, home`}>
          <span className="brand-mark" aria-hidden="true"><img src="/prashant-profile.jpeg" alt="" draggable={false} /></span>
          <span className="brand-word">prashant<span>.</span>dev</span>
        </a>

        <nav className={`main-nav${menuOpen ? " is-open" : ""}`} id="mainNav" aria-label="Main navigation">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} onClick={closeMenu} className={activeHref === item.href ? "is-active" : undefined} aria-current={activeHref === item.href ? "true" : undefined}>
              {item.label}
            </a>
          ))}
        </nav>

        <div className="header-actions">
          <button
            className="theme-toggle"
            type="button"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
            aria-pressed={theme === "light"}
          >
            {theme === "dark" ? <Sun aria-hidden="true" /> : <Moon aria-hidden="true" />}
            <span className="theme-toggle-label">{theme === "dark" ? "Light" : "Dark"}</span>
          </button>
          <button
            className="menu-toggle"
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
            aria-controls="mainNav"
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>
      </div>
    </header>
  );
}
