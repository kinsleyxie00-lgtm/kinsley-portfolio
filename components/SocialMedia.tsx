import { social } from "@/data/social";
import MediaPlaceholder from "./MediaPlaceholder";
import SectionHeading from "./SectionHeading";

export default function SocialMedia() {
  return (
    <section id="social" className="section social">
      <SectionHeading number="04" title="SOCIAL STUDY" />
      <div className="social__grid">
        <div className="social__visual">
          <MediaPlaceholder
            label="CONTENT STUDY"
            path={social.screenshot}
            ratio="4 / 5"
            className="social__screenshot"
          />
        </div>
        <div className="social__content">
          <span className="social__annotation" aria-hidden="true">
            visual study
          </span>
          <p className="micro-label">{social.platform} / 2026</p>
          <h3>{social.username}</h3>
          <p>
            独立负责账号定位、选题策划、造型呈现、图片精修、版式设计、流量优化与数据复盘。
          </p>
          <p className="social__result">
            {social.stats[0].value} {social.stats[0].label} /{" "}
            {social.stats[1].value} {social.stats[1].label}
          </p>
          {social.profileUrl ? (
            <a className="text-link" href={social.profileUrl} target="_blank" rel="noreferrer">
              VIEW PROFILE ↗
            </a>
          ) : (
            <span className="text-link text-link--disabled" title="添加真实主页链接后启用">
              VIEW PROFILE ↗ / LINK TO ADD
            </span>
          )}
        </div>
      </div>
    </section>
  );
}
