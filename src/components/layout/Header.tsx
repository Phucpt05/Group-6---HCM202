import React, { useEffect, useState } from "react";
import { PRIMARY_NAV } from "../../data/learningStructure";

interface HeaderProps {
  activeSection: string;
}

export const Header: React.FC<HeaderProps> = ({ activeSection }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">(
    () => document.documentElement.dataset.theme === "dark" ? "dark" : "light"
  );

  useEffect(() => {
    const update = () => setIsScrolled(window.scrollY > 24);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("hcm202-theme", theme);
  }, [theme]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className={`site-header${isScrolled ? " is-scrolled" : ""}`}>
      <div className="site-header__inner content-wrap">
        <a className="site-brand" href="#top" onClick={closeMenu} aria-label="Về đầu trang">
          <strong>NHÓM 6</strong>
          <span>/ HCM202</span>
        </a>

        <button
          className="mobile-menu-button"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="primary-navigation"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? "Đóng" : "Menu"}
        </button>

        <nav id="primary-navigation" className={`site-nav${menuOpen ? " is-open" : ""}`} aria-label="Điều hướng chính">
          {PRIMARY_NAV.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={activeSection === item.id ? "is-active" : ""}
              onClick={closeMenu}
            >
              {item.label}
            </a>
          ))}
          <button
            className="theme-toggle"
            type="button"
            role="switch"
            aria-checked={theme === "dark"}
            aria-label="Bật hoặc tắt giao diện tối"
            onClick={() => setTheme((current) => current === "light" ? "dark" : "light")}
          >
            <span className="theme-toggle__label">Giao diện tối</span>
            <span className="theme-toggle__track" aria-hidden="true">
              <span className="theme-toggle__thumb" />
            </span>
          </button>
        </nav>
      </div>
    </header>
  );
};
