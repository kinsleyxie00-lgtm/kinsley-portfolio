import { profile } from "@/data/profile";

export default function Contact() {
  return (
    <section id="contact" className="contact">
      <p className="micro-label">06 / CONTACT</p>
      <h2>
        <span>LET&apos;S CREATE</span>
        <span>MEANINGFUL</span>
        <span>CONTENT.</span>
      </h2>
      <div className="contact__bottom">
        <p>
          Looking for opportunities.
          <br />
          Let&apos;s connect.
        </p>
        <dl>
          <div>
            <dt>EMAIL</dt>
            <dd>
              <a href={`mailto:${profile.email}`}>{profile.email}</a>
            </dd>
          </div>
          <div>
            <dt>PHONE</dt>
            <dd>
              <a href={`tel:${profile.phone}`}>{profile.phone}</a>
            </dd>
          </div>
          <div>
            <dt>LOCATION</dt>
            <dd>{profile.location}</dd>
          </div>
        </dl>
        <div className="contact__actions">
          <a href={`mailto:${profile.email}`}>SEND EMAIL ↗</a>
          <a href={profile.resume} download>
            DOWNLOAD RESUME ↓
          </a>
        </div>
      </div>
    </section>
  );
}
