import { projects } from "@/data/projects";
import MediaPlaceholder from "./MediaPlaceholder";
import SectionHeading from "./SectionHeading";

export default function Projects() {
  return (
    <section className="section projects">
      <SectionHeading number="02" title="SELECTED WORK" />
      <div className="projects__list">
        {projects.map((project) => (
          <article className="project" key={project.number}>
            <MediaPlaceholder
              label={`${project.number} COVER`}
              path={project.cover}
              ratio="16 / 10"
              className="project__cover"
            />
            <div className="project__body">
              <div>
                <p className="micro-label">{project.number}</p>
                <h3>{project.title}</h3>
                <p className="project__category">{project.category}</p>
              </div>
              <dl>
                <div>
                  <dt>BACKGROUND</dt>
                  <dd>{project.background}</dd>
                </div>
                <div>
                  <dt>ROLE</dt>
                  <dd>{project.role}</dd>
                </div>
                <div>
                  <dt>EXECUTION</dt>
                  <dd>{project.execution}</dd>
                </div>
                <div>
                  <dt>RESULT</dt>
                  <dd>{project.result}</dd>
                </div>
              </dl>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
