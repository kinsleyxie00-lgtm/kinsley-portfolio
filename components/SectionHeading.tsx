export default function SectionHeading({
  number,
  title,
}: {
  number: string;
  title: string;
}) {
  return (
    <header className="section-heading">
      <span>{number}</span>
      <h2>{title}</h2>
      <span className="section-heading__line" />
    </header>
  );
}
