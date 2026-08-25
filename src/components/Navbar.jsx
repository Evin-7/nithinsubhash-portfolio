"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import logoMark from "../assets/icons/nithin-logo.svg";

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
        <ul className="nav-links">
          {links.map(([label, href]) => (
            <li key={href}>
              <a href={href} className="interactive" onClick={closeMenu}>
                {label}
              </a>
            </li>
          ))}
        </ul>

        <button
          className="menu-toggle interactive"
          type="button"
          aria-label="Toggle navigation menu"
          aria-controls="mobile-navigation"
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      <div
        id="mobile-navigation"
        className={`mobile-navigation${isMenuOpen ? " is-open" : ""}`}
        aria-hidden={!isMenuOpen}
        inert={!isMenuOpen ? "" : undefined}
      >
        {links.map(([label, href]) => (
          <a key={href} href={href} onClick={closeMenu} tabIndex={isMenuOpen ? 0 : -1}>
            {label}
          </a>
        ))}
      </div>
    </nav>
  );
}
