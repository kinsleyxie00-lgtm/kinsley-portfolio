"use client";

import { useState } from "react";

export default function MediaPlaceholder({
  label,
  path,
  ratio = "4 / 3",
  className = "",
  showImage = false,
}: {
  label: string;
  path: string;
  ratio?: string;
  className?: string;
  showImage?: boolean;
}) {
  const [loadedPath, setLoadedPath] = useState<string | null>(null);
  const isLoaded = loadedPath === path;

  return (
    <div
      className={`media-placeholder ${isLoaded ? "is-loaded" : ""} ${className}`}
      style={{ aspectRatio: ratio }}
      aria-label={`${label}占位区域`}
    >
      {showImage && (
        <img
          key={path}
          className="media-placeholder__image"
          src={path}
          alt=""
          loading="lazy"
          onLoad={() => setLoadedPath(path)}
          onError={() => setLoadedPath(null)}
        />
      )}
      <span>{label}</span>
      <small>MEDIA PENDING / {path}</small>
    </div>
  );
}
