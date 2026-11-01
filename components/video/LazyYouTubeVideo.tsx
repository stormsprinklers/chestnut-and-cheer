"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "./LazyYouTubeVideo.module.css";

type LazyYouTubeVideoProps = {
  videoId: string;
  title: string;
  poster?: string;
  className?: string;
};

export function LazyYouTubeVideo({
  videoId,
  title,
  poster,
  className = "",
}: LazyYouTubeVideoProps) {
  const [loaded, setLoaded] = useState(false);
  const posterSrc = poster ?? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
  const embedSrc = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;

  return (
    <div className={`${styles.wrapper} ${className}`}>
      {!loaded ? (
        <button
          type="button"
          className={styles.poster}
          onClick={() => setLoaded(true)}
          aria-label={`Play video: ${title}`}
        >
          <Image
            src={posterSrc}
            alt={title}
            fill
            sizes="(max-width: 1024px) 100vw, 56vw"
            priority={false}
            loading="lazy"
            className={styles.posterImage}
          />
          <span className={styles.playButton} aria-hidden="true">
            <svg width="68" height="48" viewBox="0 0 68 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M66.52 7.74c-.78-2.93-2.49-5.41-5.42-6.19C55.79.13 34 0 34 0S12.21.13 6.68 1.55c-2.93.78-4.64 3.26-5.42 6.19C.06 13.38 0 24 0 24s.06 10.62 1.36 16.26c.78 2.93 2.49 5.41 5.42 6.19C12.21 47.87 34 48 34 48s21.79-.13 27.32-1.55c2.93-.78 4.64-3.26 5.42-6.19C67.94 34.62 68 24 68 24s-.06-10.62-1.36-16.26z" fill="#f00" />
              <path d="M45 24 27 14v20l18-10Z" fill="#fff" />
            </svg>
          </span>
        </button>
      ) : (
        <iframe
          src={embedSrc}
          title={title}
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          className={styles.iframe}
        />
      )}
    </div>
  );
}
