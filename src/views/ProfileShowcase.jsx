import Image from "next/image";
import nithinProfileLarge from "../assets/images/nithin/nithin-profile-large.jpg";

export default function ProfileShowcase() {
  return (
    <section className="profile-showcase" aria-labelledby="profile-showcase-title">
      <div className="site-container">
        <div className="profile-showcase-heading">
          <span className="profile-showcase-kicker">A closer look</span>
          <h2 id="profile-showcase-title">The person behind the pixels.</h2>
        </div>

        <div className="profile-showcase-stage">
          <div className="profile-showcase-word profile-showcase-word-top" aria-hidden="true">NITHIN</div>
          <div className="profile-showcase-word profile-showcase-word-bottom" aria-hidden="true">SUBHASH</div>
          <div className="profile-showcase-shape profile-showcase-shape-one" aria-hidden="true" />
          <div className="profile-showcase-shape profile-showcase-shape-two" aria-hidden="true" />

          <figure className="profile-showcase-portrait">
            <Image
              src={nithinProfileLarge}
              alt="Nithin Subhash standing outdoors"
              fill
              sizes="(max-width: 700px) 72vw, 27rem"
              className="profile-showcase-image"
            />
            <figcaption>
              <strong>Nithin Subhash</strong>
              <span>UI/UX designer</span>
            </figcaption>
          </figure>

          <span className="profile-showcase-dot" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
