import Image from "next/image";
import logoMark from "../assets/icons/nithin-logo.svg";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-shell site-container">
        <div className="footer-brand">
          <a href="#home" aria-label="Back to top">
            <Image src={logoMark} alt="Nithin Subhash logo" className="footer-mark" />
          </a>
        </div>
        <div className="footer-links">
          <a href="mailto:nithinsubhash01@gmail.com" className="footer-link">
            <span className="footer-link-icon" aria-hidden="true">✉</span>
            <span>Email</span>
          </a>
          <a href="https://www.linkedin.com/in/nithin-subash/" target="_blank" rel="noopener noreferrer" className="footer-link">
            <span className="footer-link-icon" aria-hidden="true">in</span>
            <span>LinkedIn</span>
          </a>
          <a href="https://dribbble.com/_n1th1n" target="_blank" rel="noopener noreferrer" className="footer-link">
            <span className="footer-link-icon" aria-hidden="true">Db</span>
            <span>Dribbble</span>
          </a>
          <a href="https://www.instagram.com/n1t.h1n?igsh=ZHAwMWgxaHVwd3Fi" target="_blank" rel="noopener noreferrer" className="footer-link">
            <span className="footer-link-icon" aria-hidden="true">Ig</span>
            <span>Instagram</span>
          </a>
        </div>
        <p className="footer-meta">© {new Date().getFullYear()}</p>
      </div>
    </footer>
  );
}
