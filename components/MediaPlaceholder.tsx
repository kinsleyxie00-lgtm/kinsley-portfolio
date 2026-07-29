export default function MediaPlaceholder({
  label,
  path,
  ratio = "4 / 3",
  className = "",
}: {
  label: string;
  path: string;
  ratio?: string;
  className?: string;
}) {
  return (
    <div
      className={`media-placeholder ${className}`}
      style={{ aspectRatio: ratio }}
      aria-label={`${label}占位区域`}
    >
      <span>{label}</span>
      <small>REPLACE: {path}</small>
    </div>
  );
}
