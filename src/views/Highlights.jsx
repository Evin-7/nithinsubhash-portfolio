export default function Highlights() {
  return (
    <section className="highlights">
      <div className="highlights-shell site-container">
        <div className="highlights-intro">
          <div className="highlights-copy">
            <p className="highlights-eyebrow">What I Do</p>
            <h2 className="highlights-title">UI/UX design with a sharper product eye.</h2>
            <p className="highlights-text">
              I create clear, usable, and production-ready experiences, balancing
              visual craft with practical interaction design across web products,
              mobile apps, and business platforms.
            </p>
          </div>

          <div className="highlights-feature">
            <span className="feature-label">Design approach</span>
            <h3>Thoughtful flows. Clear interfaces. Strong execution.</h3>
            <p>
              The goal is simple: design work that looks intentional, feels easy
              to use, and is practical for teams to build and maintain.
            </p>
            <div className="feature-points">
              {[
                "UI/UX design",
                "Product design",
                "Design systems",
                "Responsive UI",
                "Prototyping",
                "Implementation-ready design",
              ].map((point) => <span key={point}>{point}</span>)}
            </div>
          </div>
        </div>

        <div className="highlights-grid">
          {[
            ["01", "UI/UX Design", "User journeys, wireframes, prototypes, and polished interfaces that make complex products easier to understand and use."],
            ["02", "Product Design", "Mobile and web product experiences shaped around real user needs, clear interaction patterns, and business goals."],
            ["03", "Design Systems", "Consistent components, responsive layouts, and practical handoff details that help teams build with confidence."],
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
