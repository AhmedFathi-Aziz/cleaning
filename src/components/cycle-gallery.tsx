"use client";

import Image, { type StaticImageData } from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";

export type CycleGalleryImage = {
  src: string | StaticImageData;
  alt: string;
  /** يُعرض كـ HTML title على الصورة — مفيد لأدوات SEO وللمتصفحات */
  title?: string;
};

type CycleGalleryProps = {
  images: CycleGalleryImage[];
  cardWidth?: number;
  cardHeight?: number;
  gap?: number;
  speedPxPerSec?: number;
  imageFit?: "cover" | "contain";
  className?: string;
};

function usePrefersReducedMotion() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(mediaQuery.matches);

    update();
    mediaQuery.addEventListener("change", update);

    return () => mediaQuery.removeEventListener("change", update);
  }, []);

  return reducedMotion;
}

export function CycleGallery({
  images,
  cardWidth = 280,
  cardHeight = 240,
  gap = 20,
  speedPxPerSec = 32,
  imageFit = "cover",
  className = "",
}: CycleGalleryProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const firstGroupRef = useRef<HTMLDivElement>(null);
  const groupWidthRef = useRef(0);
  const offsetRef = useRef(0);
  const frameRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  const renderedImages = useMemo(() => {
    if (images.length === 0) return [];
    return [images, images];
  }, [images]);

  useEffect(() => {
    const firstGroup = firstGroupRef.current;
    if (!firstGroup) return;

    const measure = () => {
      groupWidthRef.current = firstGroup.scrollWidth;
      offsetRef.current = groupWidthRef.current > 0 ? offsetRef.current % groupWidthRef.current : 0;

      if (trackRef.current) {
        trackRef.current.style.transform = `translate3d(${-offsetRef.current}px, 0, 0)`;
      }
    };

    measure();

    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(firstGroup);
    resizeObserver.observe(document.documentElement);

    return () => resizeObserver.disconnect();
  }, [images, cardWidth, cardHeight]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { rootMargin: "200px 0px" },
    );

    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (prefersReducedMotion || !isVisible || images.length === 0) {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
      lastTimeRef.current = null;
      return;
    }

    const animate = (time: number) => {
      const lastTime = lastTimeRef.current ?? time;
      const deltaSeconds = (time - lastTime) / 1000;
      lastTimeRef.current = time;

      const groupWidth = groupWidthRef.current;

      if (groupWidth > 0) {
        offsetRef.current = (offsetRef.current + speedPxPerSec * deltaSeconds) % groupWidth;

        if (trackRef.current) {
          trackRef.current.style.transform = `translate3d(${-offsetRef.current}px, 0, 0)`;
        }
      }

      frameRef.current = requestAnimationFrame(animate);
    };

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
      lastTimeRef.current = null;
    };
  }, [images.length, isVisible, prefersReducedMotion, speedPxPerSec]);

  if (images.length === 0) return null;

  return (
    <div ref={rootRef} className={`decor-gallery-mask overflow-hidden ${className}`} dir="ltr">
      <div
        ref={trackRef}
        className="flex w-max will-change-transform"
        style={{ minHeight: cardHeight }}
        aria-label="شريط صور متحرك"
      >
        {renderedImages.map((group, groupIndex) => (
          <div
            key={groupIndex}
            ref={groupIndex === 0 ? firstGroupRef : undefined}
            className="flex shrink-0"
            style={{ gap, paddingInlineEnd: gap }}
            aria-hidden={groupIndex === 1 ? "true" : undefined}
          >
            {group.map((image, index) => (
              <figure
                key={`${groupIndex}-${index}-${image.alt}`}
                className="group relative shrink-0 overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm"
                style={{ width: cardWidth, height: cardHeight }}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  title={image.title ?? image.alt}
                  fill
                  sizes={imageFit === "contain" ? "220px" : `${cardWidth}px`}
                  quality={58}
                  className={`transition-transform duration-500 ease-out group-hover:scale-[1.04] ${
                    imageFit === "contain" ? "object-contain p-2" : "object-cover"
                  }`}
                />
                <div
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-primary/35 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  aria-hidden="true"
                />
              </figure>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
