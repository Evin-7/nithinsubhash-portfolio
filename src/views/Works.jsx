"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import agsyba from "../assets/images/nithin/agsyba.png";
import abezauto from "../assets/images/nithin/abezauto.png";
import call2day from "../assets/images/nithin/call2day.png";
import elateChat from "../assets/images/nithin/elate-chat.png";
import hrms from "../assets/images/nithin/hrms.png";
import coworkKerala from "../assets/images/nithin/cowork-kerala.png";
import eInvoicing from "../assets/images/nithin/e-invoicing.png";
import swedishAgency from "../assets/images/nithin/swedish-agency.png";
import arod from "../assets/images/nithin/arod.png";
import likee from "../assets/images/nithin/likee.png";

const works = [
  {
    name: "AGSYBA",
    links: [{ label: "Dribbble", href: "https://dribbble.com/shots/27632440-AGSYBA-Fashion-E-Commerce-Web-Mobile" }],
    image: agsyba,
    type: "web",
    kicker: "E-commerce Website",
    year: "Featured",
    focus: "Fashion Web & Mobile",
  },
  {
    name: "AbeZauto",
    links: [{ label: "Dribbble", href: "https://dribbble.com/shots/27628665-AbeZauto-Auto-Parts-E-Commerce-Platform" }],
    image: abezauto,
    type: "web",
    kicker: "E-commerce Platform",
    year: "Featured",
    focus: "Auto Parts Platform",
  },
  {
    name: "Call2Day",
    links: [{ label: "Dribbble", href: "https://dribbble.com/shots/27631584-Call2Day-Home-Maintenance-Service-Website" }],
    image: call2day,
    type: "web",
    kicker: "Home Maintenance Website",
    year: "Featured",
    focus: "Service Experience",
  },
  {
    name: "Elate Chat",
    type: "mobile",
    links: [{ label: "Dribbble", href: "https://dribbble.com/shots/27632796-Elate-Chat-A-Focused-Community-Communication-Experience" }],
    image: elateChat,
    kicker: "Mobile App",
    year: "Featured",
    focus: "Community Communication",
  },
  {
    name: "Modern HRMS Website Design",
    links: [{ label: "Visit site", href: "https://hrms.ae/" }],
    image: hrms,
    type: "web",
    kicker: "Web Design",
    year: "Featured",
    focus: "HRMS Website",
  },
  {
    name: "Cowork Kerala",
    links: [{ label: "Dribbble", href: "https://dribbble.com/shots/26626031-Cowork-Kerala-Your-workspace-your-way" }],
    image: coworkKerala,
    type: "web",
    kicker: "Web Design",
    year: "Featured",
    focus: "Workspace Experience",
  },
  {
    name: "Modern E-Invoicing Platform",
    links: [{ label: "Visit site", href: "https://e-invoicingsoftware.ae" }],
    image: eInvoicing,
    type: "web",
    kicker: "Web Design",
    year: "Featured",
    focus: "Business Platform",
  },
  {
    name: "Swedish Design Agency Website",
    links: [{ label: "Dribbble", href: "https://dribbble.com/shots/26693866-Clean-UI-UX-Animated-Hero-for-a-Modern-Swedish-Design-Agency" }],
    image: swedishAgency,
    type: "web",
    kicker: "Website Design",
    year: "Featured",
    focus: "Agency Experience",
  },
  {
    name: "AROD",
    type: "mobile",
    links: [{ label: "Dribbble", href: "https://dribbble.com/shots/25958438-RESTAURANT-FOOD-ORDEING-APP-UI-UX-DESIGN" }],
    image: arod,
    kicker: "UI/UX Design",
    year: "Featured",
    focus: "Food Ordering App",
  },
  {
    name: "Likee",
    type: "mobile",
    links: [{ label: "Dribbble", href: "https://dribbble.com/shots/26608602-Likee-Dating-App-for-NRI-Connections" }],
    image: likee,
    kicker: "UI/UX Design",
    year: "Featured",
    focus: "Dating App Experience",
  },
];

const workGroups = [
  {
    key: "websites",
    eyebrow: "Websites & platforms",
    title: "Digital spaces built with intent.",
    description: "Web products, business platforms, and experiences shaped around people.",
    items: works.filter((work) => work.type !== "mobile"),
  },
  {
    key: "mobile",
    eyebrow: "Mobile products",
    title: "Useful everywhere.",
    description: "Clear, expressive app experiences.",
    items: works.filter((work) => work.type === "mobile"),
  },
];

const formatIndex = (index) => String(index + 1).padStart(2, "0");

export default function Works() {
  const worksSection = useRef(null);
  const cardRects = useRef(new WeakMap());
  const reducedMotion = useReducedMotion();
  const motionEnabled = reducedMotion !== true;

  const handleEnter = (event) => {
    if (!motionEnabled) return;
    const card = event.currentTarget;
    cardRects.current.set(card, card.getBoundingClientRect());
    card.style.setProperty("--card-lift", "-9px");
  };

  const handleMove = (event) => {
    if (!motionEnabled) return;
    const card = event.currentTarget;
    const rect = cardRects.current.get(card) || card.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    card.style.setProperty("--image-x", `${x * 10}px`);
    card.style.setProperty("--image-y", `${y * 10}px`);
    card.style.setProperty("--card-rotate-x", `${y * -4.5}deg`);
    card.style.setProperty("--card-rotate-y", `${x * 5.5}deg`);
    card.style.setProperty("--spotlight-x", `${(x + 0.5) * 100}%`);
    card.style.setProperty("--spotlight-y", `${(y + 0.5) * 100}%`);
  };

  const resetMove = (event) => {
    const card = event.currentTarget;
    cardRects.current.delete(card);
    card.style.setProperty("--image-x", "0px");
    card.style.setProperty("--image-y", "0px");
    card.style.setProperty("--card-lift", "0px");
    card.style.setProperty("--card-rotate-x", "0deg");
    card.style.setProperty("--card-rotate-y", "0deg");
    card.style.setProperty("--spotlight-x", "50%");
    card.style.setProperty("--spotlight-y", "50%");
  };

  return (
    <section ref={worksSection} className="works">
      <div className="works-shell site-container">
        <div className="works-heading">
          <div><p className="works-eyebrow">Projects</p><h2 className="works-title">Selected work.</h2></div>
        </div>

        {workGroups.map((group) => (
          <div key={group.key} className="works-group">
            <div className="works-group-heading">
              <div><p className="works-group-eyebrow">{group.eyebrow}</p><h3>{group.title}</h3></div>
              <p>{group.description}</p>
            </div>
            <div className="works-grid">
              {group.items.map((work, index) => (
                <motion.article
                  key={work.name}
                  className="work-card interactive"
                  style={{ "--reveal-delay": `${index * 55}ms` }}
                  initial={motionEnabled ? { opacity: 0, y: 36, filter: "blur(7px)" } : false}
                  whileInView={motionEnabled ? { opacity: 1, y: 0, filter: "blur(0px)" } : undefined}
                  viewport={{ once: true, amount: 0.18 }}
                  transition={{ duration: 0.72, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
                  onPointerEnter={handleEnter}
                  onPointerMove={handleMove}
                  onPointerLeave={resetMove}
                >
                  <div className="work-card-inner">
                    <div className="work-copy">
                      <p className="work-kicker"><span>{formatIndex(index)}</span>{work.kicker}</p>
                      <h3 className="work-title">{work.name}</h3>
                    </div>
                    <div className="work-media">
                      <div className="laptop-frame">
                        <div className="laptop-screen-shell">
                          <div className="laptop-topbar"><span></span><span></span><span></span></div>
                          <div className="laptop-camera"></div>
                          <Image src={work.image} alt={work.name} fill sizes="(max-width: 900px) 90vw, 30vw" className="work-image" />
                        </div>
                        <div className="laptop-base"><div className="laptop-trackpad"></div></div>
                      </div>
                    </div>
                    <div className="work-footer">
                      <div className="work-meta"><span>{work.focus}</span><span>{work.year}</span></div>
                      <div className="work-links">
                        {work.links.map((link) => (
                          <a key={link.href} href={link.href} target="_blank" rel="noopener noreferrer" className="work-cta">
                            <span>{link.label}</span><strong>↗</strong>
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
