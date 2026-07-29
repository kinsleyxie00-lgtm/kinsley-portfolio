import { profile } from "@/data/profile";

export default function Hero() {
  return (
    <section id="top" className="hero">
      <div className="hero__content">
        <p className="hero__eyebrow">
          {profile.chineseName} — {profile.role}
        </p>
        <h1>
          <span>KINSLEY</span>
          <span>XIE</span>
        </h1>
        <div className="hero__disciplines">
          {profile.disciplines.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </div>

      <div className="hero__footer">
        <span>BASED IN {profile.location}</span>
        <a href="#work">SCROLL ↓</a>
        <span>{profile.availability}</span>
      </div>
    </section>
  );
}
