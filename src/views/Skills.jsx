import {
  SiChatbot,
  SiCss,
  SiFigma,
  SiFramer,
  SiHtml5,
  SiLottiefiles,
  SiReact,
} from "react-icons/si";

const skills = [
  { name: "Figma", slug: "figma", icon: SiFigma },
  { name: "Adobe XD", slug: "adobe-xd" },
  { name: "HTML", slug: "html", icon: SiHtml5 },
  { name: "CSS", slug: "css", icon: SiCss },
  { name: "Framer", slug: "framer", icon: SiFramer },
  { name: "ChatGPT", slug: "chatgpt", icon: SiChatbot },
  { name: "Lottie Files", slug: "lottie", icon: SiLottiefiles },
  { name: "Adobe Illustrator", slug: "illustrator" },
  { name: "React", slug: "react", icon: SiReact },
];

function SkillIcon({ Icon, name }) {
  if (!Icon) {
    return <span className="skill-fallback-icon" aria-hidden="true">{name.slice(0, 2)}</span>;
  }

  return <Icon className="skill-icon" aria-label={`${name} icon`} role="img" />;
}

export default function Skills() {
  return (
    <section className="skills">
      <div className="skills-shell site-container">
        <div className="skills-heading">
          <div>
            <p className="skills-eyebrow">Toolkit</p>
            <h2 className="skills-title">Core stack.</h2>
          </div>
          <p className="skills-text">Tools for clear interfaces and dependable systems.</p>
        </div>

        <div className="skills-frame">
          <div className="skills-marquee" aria-label="Technology stack" role="list">
            <div className="skills-track">
              {[0, 1, 2].map((copy) => (
                <div key={copy} className="skills-group" aria-hidden={copy > 0 || undefined}>
                  {skills.map(({ name, slug, icon }) => (
                    <div key={`${copy}-${name}`} className="skill-pill" role="listitem">
                      <span className={`skill-mark skill-mark-${slug}`}>
                        <SkillIcon Icon={icon} name={name} />
                      </span>
                      <span>{name}</span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
