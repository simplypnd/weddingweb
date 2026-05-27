"use client";

import { useEffect, useRef, useState } from "react";
import type { SiteConfig } from "@/lib/site-config-schema";

export function MusicToggle({ config }: { config: SiteConfig }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [available, setAvailable] = useState(true);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onError = () => setAvailable(false);
    audio.addEventListener("error", onError);
    return () => audio.removeEventListener("error", onError);
  }, []);

  if (!config.music.enabled) return null;

  const toggle = async () => {
    const audio = audioRef.current;
    if (!audio || !available) return;

    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      try {
        await audio.play();
        setPlaying(true);
      } catch {
        setPlaying(false);
      }
    }
  };

  if (!available) return null;

  return (
    <>
      <audio ref={audioRef} src={config.music.src} loop preload="none" />
      <button
        type="button"
        onClick={toggle}
        className="safe-bottom fixed bottom-4 right-4 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-dusty text-cream shadow-lg transition-colors hover:bg-dusty-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dusty"
        style={{ marginBottom: "max(1rem, env(safe-area-inset-bottom))" }}
        aria-label={playing ? "Pause music" : "Play music"}
      >
        {playing ? (
          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
            <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
          </svg>
        ) : (
          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
            <path d="M8 5v14l11-7L8 5z" />
          </svg>
        )}
      </button>
    </>
  );
}
