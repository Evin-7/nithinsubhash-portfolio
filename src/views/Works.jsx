"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SpecularButton from "../components/SpecularButton";
import agsyba from "../assets/images/nithin/agsyba.png";
import abezauto from "../assets/images/nithin/abezauto-showcase.png";
import call2day from "../assets/images/nithin/call2day.png";
import elateChat from "../assets/images/nithin/elate-chat-cover.webp";
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
    description: "A modern fashion storefront for exploring new collections and shopping across web and mobile.",
  },
  {
    name: "AbeZauto",
    links: [{ label: "Dribbble", href: "https://dribbble.com/shots/27628665-AbeZauto-Auto-Parts-E-Commerce-Platform" }],
    image: abezauto,
    type: "web",
    kicker: "E-commerce Platform",
    year: "Featured",
    description: "An auto-parts store for browsing automotive products and finding the right fit for your vehicle.",
  },
  {
    name: "Call2Day",
    links: [{ label: "Dribbble", href: "https://dribbble.com/shots/27631584-Call2Day-Home-Maintenance-Service-Website" }],
    image: call2day,
    type: "web",
    kicker: "Home Maintenance Website",
    year: "Featured",
    description: "A home-services website for exploring maintenance options and requesting help with everyday repairs.",
  },
  {
    name: "Elate Chat",
    type: "mobile",
    links: [{ label: "Dribbble", href: "https://dribbble.com/shots/27632796-Elate-Chat-A-Focused-Community-Communication-Experience" }],
    image: elateChat,
    kicker: "Mobile App",
    year: "Featured",
    description: "A mobile app where teams and communities connect through focused channels and timely broadcast updates.",
  },
  {
    name: "Modern HRMS Website Design",
    links: [{ label: "Visit site", href: "https://hrms.ae/" }],
    image: hrms,
    type: "web",
    kicker: "Web Design",
    year: "Featured",
    description: "A UAE-focused HR platform for managing payroll, leave, recruitment, and attendance in one place.",
  },
  {
    name: "Cowork Kerala",
    links: [{ label: "Dribbble", href: "https://dribbble.com/shots/26626031-Cowork-Kerala-Your-workspace-your-way" }],
    image: coworkKerala,
    imagePosition: "top",
    type: "web",
    kicker: "Web Design",
    year: "Featured",
  },
  {
    name: "Modern E-Invoicing Platform",
    links: [{ label: "Visit site", href: "https://e-invoicingsoftware.ae" }],
    image: eInvoicing,
    type: "web",
    kicker: "Web Design",
    year: "Featured",
  },
  {
    name: "Swedish Design Agency Website",
    links: [{ label: "Dribbble", href: "https://dribbble.com/shots/26693866-Clean-UI-UX-Animated-Hero-for-a-Modern-Swedish-Design-Agency" }],
    image: swedishAgency,
    type: "web",
    kicker: "Website Design",
    year: "Featured",
  },
  {
    name: "AROD",
    type: "mobile",
    links: [{ label: "Dribbble", href: "https://dribbble.com/shots/25958438-RESTAURANT-FOOD-ORDEING-APP-UI-UX-DESIGN" }],
    image: arod,
    kicker: "UI/UX Design",
    year: "Featured",
  },
  {
    name: "Likee",
    type: "mobile",
    links: [{ label: "Dribbble", href: "https://dribbble.com/shots/26608602-Likee-Dating-App-for-NRI-Connections" }],
    image: likee,
    kicker: "UI/UX Design",
    year: "Featured",
  },
];

const featuredWorks = works.slice(0, 5);
const indexedWorks = works.map((work, index) => ({ work, index }));

const workGroups = [
  {
    key: "websites",
    eyebrow: "Websites & platforms",
    description: "Web products, business platforms, and experiences shaped around people.",
    items: indexedWorks.filter(({ work }) => work.type !== "mobile"),
  },
  {
    key: "mobile",
    eyebrow: "Mobile products",
    description: "Clear, expressive app experiences.",
    items: indexedWorks.filter(({ work }) => work.type === "mobile"),
  },
];

const formatIndex = (index) => String(index + 1).padStart(2, "0");

export default function Works({ allProjectsPage = false }) {
  const worksSection = useRef(null);
  const cardRects = useRef(new WeakMap());
  const reducedMotion = useReducedMotion();
  const motionEnabled = reducedMotion !== true;
  const caseX = useMotionValue(0);
  const caseY = useMotionValue(0);
  const caseSpringX = useSpring(caseX, { stiffness: 700, damping: 52, mass: 0.18 });
  const caseSpringY = useSpring(caseY, { stiffness: 700, damping: 52, mass: 0.18 });

  useEffect(() => {
    if (allProjectsPage) return undefined;

    const section = worksSection.current;
    if (!section) return undefined;

    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();
    media.add(
      "(min-width: 900px) and (min-height: 650px) and (prefers-reduced-motion: no-preference)",
      () => {
        const rows = gsap.utils.toArray(".featured-project-row", section);
        if (rows.length < 2) return undefined;
        const stackOffset = 16;
        const animationTriggers = [];
        const scaleForCard = gsap.utils.distribute({ base: 0.8, amount: 0.2 });

        rows.forEach((row, index) => {
          const topOffset = 96 + index * stackOffset;
          const stepEnd = Math.max(200, Math.round(row.offsetHeight * 0.55));
          gsap.set(row, { zIndex: index + 1 });

          const getAnimationTrigger = () => ({
            trigger: row,
            start: `top top+=${topOffset}`,
            end: `+=${stepEnd}`,
            scrub: true,
            invalidateOnRefresh: true,
          });
          const details = row.querySelector(".featured-project-details");
          animationTriggers.push(
            gsap.to(row, {
              scale: scaleForCard(index, row, rows),
              ease: "none",
              scrollTrigger: getAnimationTrigger(),
            })
          );
          animationTriggers.push(
            gsap.fromTo(
              details,
              { y: 14 },
              { y: -10, ease: "none", scrollTrigger: getAnimationTrigger() }
            )
          );
        });

        return () => {
          animationTriggers.forEach((animation) => {
            animation.scrollTrigger?.kill();
            animation.kill();
          });
        };
      }
    );

    return () => {
      media.revert();
    };
  }, [allProjectsPage]);

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
    card.style.setProperty("--card-rotate-x", `${y * -4.5}deg`);
    card.style.setProperty("--card-rotate-y", `${x * 5.5}deg`);
    card.style.setProperty("--spotlight-x", `${(x + 0.5) * 100}%`);
    card.style.setProperty("--spotlight-y", `${(y + 0.5) * 100}%`);
  };

  const resetMove = (event) => {
    const card = event.currentTarget;
    cardRects.current.delete(card);
    card.style.setProperty("--card-lift", "0px");
    card.style.setProperty("--card-rotate-x", "0deg");
    card.style.setProperty("--card-rotate-y", "0deg");
    card.style.setProperty("--spotlight-x", "50%");
    card.style.setProperty("--spotlight-y", "50%");
  };

  const moveFeaturedPreview = (event) => {
    if (!motionEnabled || event.pointerType !== "mouse") return;
    const row = event.currentTarget;
    const rect = row.getBoundingClientRect();
    const scaleX = rect.width / row.offsetWidth || 1;
    const scaleY = rect.height / row.offsetHeight || 1;
    caseX.set((event.clientX - rect.left) / scaleX);
    caseY.set((event.clientY - rect.top) / scaleY);
  };

  const centerFeaturedPreview = (event) => {
    if (!motionEnabled) return;
    const row = event.currentTarget;
    caseX.set(row.offsetWidth / 2);
    caseY.set(row.offsetHeight / 2);
  };

  return (
    <section className={`works${allProjectsPage ? " works-all-projects" : ""}`}>
      <div className="works-shell site-container">
        {allProjectsPage ? (
          <div className="works-heading works-page-heading">
            <SpecularButton
              href="/"
              variant="secondary"
              size="md"
              radius={0}
              className="projects-back-button interactive"
            >
              ← Back to home
            </SpecularButton>
            <h1 className="works-title">Explore all my work.</h1>
            <p className="featured-showcase-description">Web products, business platforms, and experiences shaped around people.</p>
          </div>
        ) : (
          <div className="works-heading works-heading--mobile">
            <div><p className="works-eyebrow">Projects</p><h2 className="works-title">Selected work.</h2></div>
          </div>
        )}

        {!allProjectsPage && <section
          ref={worksSection}
          className="featured-showcase"
          aria-labelledby="featured-projects-title"
        >
          <div className="works-heading featured-showcase-heading">
            <div className="featured-showcase-copy">
              <p className="works-eyebrow">Featured projects</p>
              <h2 id="featured-projects-title" className="works-title">
                Selected work.
              </h2>
              <p className="featured-showcase-description">Web products, business platforms, and experiences shaped around people.</p>
            </div>
            <SpecularButton
              href="/projects"
              variant="secondary"
              size="lg"
              radius={0}
              className="hero-button hero-button-secondary interactive"
            >
              View all projects
            </SpecularButton>
          </div>

          <div className="featured-project-viewport">
            <div className="featured-project-list">
              {featuredWorks.map((work, index) => (
                <article
                  className="featured-project-row"
                  key={work.name}
                  style={{
                    "--stack-top": `${96 + index * 16}px`,
                    "--featured-image-ratio": `${work.image.width} / ${work.image.height}`,
                  }}
                  onPointerEnter={moveFeaturedPreview}
                  onPointerMove={moveFeaturedPreview}
                  onFocus={centerFeaturedPreview}
                >
                  <div className="featured-preview" role="img" aria-label={`Project preview: ${work.name}`}>
                    <Image
                      src={work.image}
                      alt=""
                      fill
                      priority={index === 0}
                      sizes="(min-width: 900px) 48vw, 100vw"
                    />
                  </div>

                  <a
                    href={work.links[0]?.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="featured-mobile-card-link"
                    aria-label={`View case study: ${work.name}`}
                  />

                  <div className="featured-project-details">
                    <span className="featured-project-number">{formatIndex(index)}</span>
                    <p className="work-kicker featured-project-kicker">
                      <span>{formatIndex(index)}</span>{work.kicker}
                    </p>
                    <h3 className="featured-project-title">{work.name}</h3>
                    <p className="featured-project-description">{work.description}</p>
                  </div>

                  <motion.div
                    className="featured-case-positioner"
                    style={{ x: caseSpringX, y: caseSpringY }}
                  >
                    <div className="featured-case-preview">
                      <div className="featured-case-image-wrap" aria-hidden="true">
                        <Image
                          src={work.image}
                          alt=""
                          fill
                          sizes="(min-width: 900px) 11vw, 100vw"
                          className="featured-case-image"
                        />
                      </div>
                      <a
                        href={work.links[0]?.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="featured-case-link"
                        aria-label={`View case study: ${work.name}`}
                      >
                        <span>View case</span>
                        <span aria-hidden="true">&rarr;</span>
                      </a>
                    </div>
                  </motion.div>
                </article>
              ))}
            </div>
          </div>
        </section>}

        <div
          id="all-projects"
          className={`works-groups${allProjectsPage ? " is-visible" : ""}`}
        >
        {workGroups.map((group) => (
          <div key={group.key} className="works-group">
            {!allProjectsPage && <div className="works-group-heading">
              <div>
                <p className="works-group-eyebrow">{group.eyebrow}</p>
              </div>
              <p>{group.description}</p>
            </div>}
            <div className="works-grid">
              {group.items.map(({ work, index: projectIndex }) => (
                <motion.a
                  key={work.name}
                  href={work.links[0]?.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="work-card interactive"
                  style={{
                    "--reveal-delay": `${projectIndex * 55}ms`,
                    "--image-position": work.imagePosition || "center",
                    "--card-aspect-ratio": `${work.image.width} / ${work.image.height}`,
                  }}
                  initial={motionEnabled ? { opacity: 0, y: 36, filter: "blur(7px)" } : false}
                  whileInView={motionEnabled ? { opacity: 1, y: 0, filter: "blur(0px)" } : undefined}
                  viewport={{ once: true, amount: 0.18 }}
                  transition={{ duration: 0.72, delay: projectIndex * 0.06, ease: [0.22, 1, 0.36, 1] }}
                  onPointerEnter={handleEnter}
                  onPointerMove={handleMove}
                  onPointerLeave={resetMove}
                >
                  <div className="work-card-inner">
                    <Image
                      src={work.image}
                      alt={work.name}
                      fill
                      sizes="(max-width: 900px) 90vw, 30vw"
                      className="work-image"
                    />
                    <div className="work-copy">
                      <p className="work-kicker"><span>{formatIndex(projectIndex)}</span>{work.kicker}</p>
                      <h3 className="work-title">{work.name}</h3>
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        ))}
        </div>
      </div>
    </section>
  );
}
