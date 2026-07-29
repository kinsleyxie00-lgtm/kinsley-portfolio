import { social } from "@/data/social";
import MediaPlaceholder from "./MediaPlaceholder";
import SectionHeading from "./SectionHeading";

export default function SocialMedia() {
  return (
    <section id="social" className="section social">
      <SectionHeading number="03" title="SOCIAL MEDIA" />
      <div className="social__grid">
        <MediaPlaceholder
          label="ACCOUNT SCREENSHOT"
          path={social.screenshot}
          ratio="9 / 16"
          className="social__screenshot"
        />
        <div className="social__content">
          <p className="micro-label">{social.platform} / 0—1 ACCOUNT GROWTH</p>
          <h3>{social.username}</h3>
          <p>
            独立负责账号定位、选题策划、造型呈现、图片精修、版式设计、流量优化与数据复盘。
          </p>
          <div className="social__stats">
            {social.stats.map((stat) => (
              <div key={stat.label}>
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </div>
            ))}
          </div>
          <div className="tag-row">
            {social.focus.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
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
