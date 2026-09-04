export default function About() {
  return (
    <section className="about">
      <div className="about-shell site-container">
        <div className="about-copy">
          <p className="about-eyebrow">About</p>
          <h2 className="about-title">
            Thoughtful experiences.
            <br />
            Clearer products.
          </h2>
          <p className="about-text">
            I merge creativity with logic to create digital experiences that look great, work
            <br />
            naturally, and stay practical to build.
          </p>
          <a
            className="about-cv-link"
            href="https://drive.google.com/file/d/1ZWWQpRwakI6nM4hYUjXOWgTxBTjjbpTA/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
          >
            Read Nithin&apos;s CV <span aria-hidden="true">↗</span>
          </a>
        </div>

        <div className="experience">
          <div className="experience-item">
            <div><h3>UI/UX Designer</h3><p>4+ years of experience</p></div>
            <span>Present</span>
          </div>
          <div className="experience-item">
            <div><h3>B.Tech Computer Science</h3><p>Kerala Technological University</p></div>
            <span>Education</span>
          </div>
          <div className="experience-item">
            <div><h3>50+ Products Delivered</h3><p>Web, mobile, and product<br />experiences</p></div>
            <span>Selected work</span>
          </div>
        </div>
      </div>
    </section>
  );
}
