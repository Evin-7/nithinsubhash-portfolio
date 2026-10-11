export default function Highlights() {
  return (
    <section className="highlights">
      <div className="highlights-shell site-container">
        <div className="highlights-intro">
          <div className="highlights-copy">
            <p className="highlights-eyebrow">What I Do</p>
            <h2 className="highlights-title">UI/UX design with a user-first product mindset.</h2>
            <p className="highlights-text">
              I&apos;m Nithin Subhash, a UI/UX Designer creating intuitive, user-centered experiences through thoughtful visual design, clear interactions, and practical solutions for web, mobile, and enterprise products.
            </p>
          </div>

          <div className="highlights-feature">
            <h3>Thoughtful flows. Clear interfaces. Better experiences.</h3>
            <p>
              I turn complex requirements into intuitive experiences that balance user needs, business goals, and practical implementation.
            </p>
            <div className="feature-points">
              {[
                "UI/UX design",
                "Product design",
                "Design systems",
                "Responsive UI",
                "Prototyping",
                "Developer Handoff",
              ].map((point) => <span key={point}>{point}</span>)}
            </div>
          </div>
        </div>

        <div className="highlights-grid">
          {[
            ["01", "UI/UX Design", "User flows, wireframes, prototypes, and intuitive interfaces that simplify complex products and improve usability."],
            ["02", "Product Design", "Web and mobile experiences shaped around user needs, intuitive interactions, and meaningful business objectives."],
            ["03", "Design Systems", "Reusable components, consistent visual patterns, and responsive layouts that help teams build scalable digital products."],
          ].map(([number, title, copy], index) => (
            <article key={number} className={`highlight-card${index === 0 ? " highlight-card-primary" : ""}`}>
              <div className="highlight-icon">{number}</div>
              <h3>{title}</h3>
              <p>{copy}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
