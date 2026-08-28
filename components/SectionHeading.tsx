export default function SectionHeading({
  number,
  title,
  subtitle,
}: {
  number: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <header className="section-heading">
      <span>{number}</span>
      <div>
        <p>{subtitle}</p>
        <h2>{title}</h2>
      </div>
      <span className="section-heading__line" />
    </header>
  );
}
