"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import logoMark from "../assets/icons/nithin-logo.svg";
import SpecularButton from "./SpecularButton";

const links = [
  ["About", "#about"],
  ["Skills", "#skills"],
  ["Work", "#works"],
  ["Contact", "#contact"],
];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const closeOnEscape = (event) => {
      if (event.key === "Escape") setIsMenuOpen(false);
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav className="navbar" onKeyDown={(event) => event.key === "Escape" && closeMenu()}>
      <div className="nav-shell site-container">
        <a href="#home" className="logo" onClick={closeMenu}>
          <Image src={logoMark} alt="Nithin Subhash logo" className="logo-mark" priority />
        </a>
        <div className="nav-actions">
          <ul className="nav-links">
            {links.map(([label, href]) => (
              <li key={href}>
                <a href={href} className="interactive" onClick={closeMenu}>
                  {label}
                </a>
              </li>
            ))}
          </ul>

          <SpecularButton
            variant="secondary"
            size="md"
            radius={0}
            className="resume-link interactive"
            href="/NithinResume.pdf"
            download="NithinResume.pdf"
            onClick={closeMenu}
          >
            <svg className="resume-icon" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 3v11m0 0 4-4m-4 4-4-4M5 16v3h14v-3" />
            </svg>
            <span>Download Resume</span>
          </SpecularButton>
        </div>

        <SpecularButton
          className="menu-toggle interactive"
          variant="secondary"
          size="icon"
          radius={0}
          type="button"
          aria-label="Toggle navigation menu"
          aria-controls="mobile-navigation"
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          <span></span>
          <span></span>
          <span></span>
        </SpecularButton>
      </div>

      <div
        id="mobile-navigation"
        className={`mobile-navigation${isMenuOpen ? " is-open" : ""}`}
        aria-hidden={!isMenuOpen}
        inert={!isMenuOpen ? true : undefined}
      >
        {links.map(([label, href]) => (
          <a key={href} href={href} onClick={closeMenu} tabIndex={isMenuOpen ? 0 : -1}>
            {label}
          </a>
        ))}
        <SpecularButton
          variant="secondary"
          size="md"
          radius={0}
          className="resume-link interactive"
          href="/NithinResume.pdf"
          download="NithinResume.pdf"
          onClick={closeMenu}
          tabIndex={isMenuOpen ? 0 : -1}
        >
          <svg className="resume-icon" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 3v11m0 0 4-4m-4 4-4-4M5 16v3h14v-3" />
          </svg>
          <span>Download Resume</span>
        </SpecularButton>
      </div>
    </nav>
  );
}
