"use client";

import { useEffect, useRef, useState } from "react";

const CONTACT_EMAIL = "nithinsubhash01@gmail.com";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitText, setSubmitText] = useState("Send Message");
  const [messageText, setMessageText] = useState("");
  const statusTimer = useRef(null);

  useEffect(() => () => clearTimeout(statusTimer.current), []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const submitForm = (event) => {
    event.preventDefault();
    clearTimeout(statusTimer.current);
    setIsSubmitting(true);
    setSubmitText("Sending...");
    setMessageText("");

    const subject = encodeURIComponent(`Portfolio enquiry from ${form.name}`);
    const body = encodeURIComponent(`${form.message}\n\nReply to: ${form.email}`);
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;

    setSubmitText("Opening email...");
    setMessageText("Your email app should open with the message ready to send.");
    setForm({ name: "", email: "", message: "" });
    statusTimer.current = setTimeout(() => {
      setSubmitText("Send Message");
      setIsSubmitting(false);
      setMessageText("");
    }, 3000);
  };

  return (
    <section className="contact">
      <div className="site-container">
        <div className="contact-shell">
          <p className="contact-eyebrow">Contact</p>
          <h2 className="contact-title">Let&apos;s work together.</h2>
          <p className="contact-text">For UI/UX design, product interfaces, and thoughtful digital experiences.</p>

          <div className="contact-links">
            <a href={`mailto:${CONTACT_EMAIL}`} className="contact-link contact-link-primary interactive">
              {CONTACT_EMAIL}
            </a>
            <a href="https://dribbble.com/_n1th1n" target="_blank" rel="noopener noreferrer" className="contact-link interactive">
              Dribbble profile <span aria-hidden="true">↗</span>
            </a>
          </div>

          {messageText && <div className="message-display">{messageText}</div>}

          <form className="contact-form" onSubmit={submitForm}>
            <input name="name" value={form.name} onChange={handleChange} type="text" placeholder="Name" required className="form-input" />
            <input name="email" value={form.email} onChange={handleChange} type="email" placeholder="Email" required className="form-input" />
            <textarea name="message" value={form.message} onChange={handleChange} placeholder="Tell me about your project" rows={5} required className="form-input" />
            <button type="submit" className="submit-btn interactive" disabled={isSubmitting}>{submitText}</button>
          </form>
        </div>
      </div>
    </section>
  );
}
