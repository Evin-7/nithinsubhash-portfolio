"use client";

import BrandIcon from "../components/BrandIcon";
import SpecularButton from "../components/SpecularButton";

const CONTACT_EMAIL = "nithinsubhash01@gmail.com";
const GMAIL_COMPOSE_URL = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(CONTACT_EMAIL)}`;

export default function Contact() {
  return (
    <section className="contact">
      <div className="site-container">
        <div className="contact-shell">
          <p className="contact-eyebrow">Contact</p>
          <h2 className="contact-title">Let&apos;s work together.</h2>
          <p className="contact-text">For UI/UX design, product interfaces, and thoughtful digital experiences.</p>

          <div className="contact-links">
            <SpecularButton href={GMAIL_COMPOSE_URL} target="_blank" rel="noopener noreferrer" variant="primary" size="md" radius={0} className="contact-link contact-link-primary contact-link-with-icon interactive">
              <BrandIcon brand="email" className="contact-link-icon contact-link-icon-email" aria-hidden="true" />
              {CONTACT_EMAIL}
            </SpecularButton>
            <SpecularButton href="https://dribbble.com/_n1th1n" target="_blank" rel="noopener noreferrer" variant="secondary" size="md" radius={0} className="contact-link contact-link-with-icon interactive">
              <BrandIcon brand="dribbble" className="contact-link-icon contact-link-icon-dribbble" aria-hidden="true" />
              Dribbble profile
            </SpecularButton>
          </div>

        </div>
      </div>
    </section>
  );
}
