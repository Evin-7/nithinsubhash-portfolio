import Image from "next/image";
import logoMark from "../assets/icons/nithin-logo.svg";
import BrandIcon from "./BrandIcon";
import SpecularButton from "./SpecularButton";

export default function Footer() {
  return (
    
    <footer className="footer">
      <div className="footer-shell site-container">
        <div className="footer-brand">
          <a href="/#home" aria-label="Back to top">
            <Image src={logoMark} alt="Nithin Subhash logo" className="footer-mark" />
          </a>
        </div>
        <div className="footer-links">
          <SpecularButton href="mailto:nithinsubhash01@gmail.com" variant="secondary" size="sm" radius={0} className="footer-link">
            <span className="footer-link-icon footer-link-icon-email" aria-hidden="true">
              <BrandIcon brand="email" />
            </span>
            <span>Email</span>
          </SpecularButton>
          <SpecularButton href="https://www.linkedin.com/in/nithin-subash/" target="_blank" rel="noopener noreferrer" variant="secondary" size="sm" radius={0} className="footer-link">
            <span className="footer-link-icon footer-link-icon-linkedin" aria-hidden="true">
              <BrandIcon brand="linkedin" />
            </span>
            <span>LinkedIn</span>
          </SpecularButton>
          <SpecularButton href="https://dribbble.com/_n1th1n" target="_blank" rel="noopener noreferrer" variant="secondary" size="sm" radius={0} className="footer-link">
            <span className="footer-link-icon footer-link-icon-dribbble" aria-hidden="true">
              <BrandIcon brand="dribbble" />
            </span>
            <span>Dribbble</span>
          </SpecularButton>
          <SpecularButton href="https://www.instagram.com/n1t.h1n?igsh=ZHAwMWgxaHVwd3Fi" target="_blank" rel="noopener noreferrer" variant="secondary" size="sm" radius={0} className="footer-link">
            <span className="footer-link-icon footer-link-icon-instagram" aria-hidden="true">
              <BrandIcon brand="instagram" />
            </span>
            <span>Instagram</span>
          </SpecularButton>
        </div>
        <p className="footer-meta">© {new Date().getFullYear()}</p>
      </div>
    </footer>
  );
}
