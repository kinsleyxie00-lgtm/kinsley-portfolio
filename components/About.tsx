import { profile } from "@/data/profile";
import MediaPlaceholder from "./MediaPlaceholder";
import SectionHeading from "./SectionHeading";

export default function About() {
  return (
    <section id="about" className="section about">
      <SectionHeading number="05" title="ABOUT ME" />
      <div className="about__grid">
        <MediaPlaceholder
          label="PORTRAIT"
          path={profile.portrait}
          ratio="4 / 5"
          className="about__portrait"
        />
        <div className="about__content">
          <p className="about__lead">
            KINSLEY XIE is a creative marketer focusing on brand marketing,
            content operation and visual storytelling.
          </p>
          <p>{profile.intro}</p>
          <dl className="about__details">
            <div>
              <dt>SKILLS</dt>
              <dd>{profile.skills.join(" / ")}</dd>
            </div>
            <div>
              <dt>TOOLS</dt>
              <dd>{profile.tools.join(" / ")}</dd>
            </div>
            <div>
              <dt>CONTACT</dt>
              <dd>{profile.email} / NANJING</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}
