import { experience } from "@/data/experience";
import MediaPlaceholder from "./MediaPlaceholder";

export default function Experience() {
  return (
    <section id="experience" className="precision-page precision-experience">
      <header className="precision-intro" data-reveal-section>
        <div data-reveal="title">
          <p className="precision-kicker">Experience / 02</p>
          <h1 data-attract="text">Selected experience.</h1>
        </div>
        <p data-reveal="body">三段经历以横向索引展开，聚焦品牌、内容与现场执行。</p>
        <span data-reveal="body">2025—2026<br />03 records</span>
      </header>

      <div className="precision-experience__list">
        {experience.map((item, index) => (
          <article className="precision-experience__row" key={item.company} data-reveal-section>
            <span>0{index + 1}</span>
            <time>{item.period}</time>
            <div data-reveal="title">
              <h2>{item.company}</h2>
              <p>{item.role}</p>
            </div>
            <p data-reveal="body">{item.summary}</p>
            <span data-reveal="body">{item.tags.slice(0, 3).join(" / ")}</span>
            <div data-attract="image"><div data-reveal="media"><MediaPlaceholder label="PROJECT PREVIEW" path={item.image} ratio="3 / 2" showImage /></div></div>
          </article>
        ))}
      </div>
    </section>
  );
}
