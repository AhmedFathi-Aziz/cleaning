import Image from "next/image";

import { getLocalImageSources } from "@/lib/responsive-image";

type Props = {
  src: string;
  alt: string;
  title?: string;
  className?: string;
  fill?: boolean;
  priority?: boolean;
  sizes?: string;
  width?: number;
  height?: number;
  quality?: number;
};

/**
 * صور محلية WebP مع srcset (static export — بدون Image Optimization API).
 * الروابط الخارجية تُمرَّر لـ next/image كاحتياط نادر.
 */
export function ResponsiveImage({
  src,
  alt,
  title,
  className,
  fill,
  priority = false,
  sizes = "100vw",
  width,
  height,
  quality,
}: Props) {
  const local = getLocalImageSources(src);

  if (!local) {
    if (fill) {
      return (
        <Image
          src={src}
          alt={alt}
          title={title}
          fill
          priority={priority}
          sizes={sizes}
          quality={quality}
          className={className}
        />
      );
    }
    return (
      <Image
        src={src}
        alt={alt}
        title={title}
        width={width ?? 800}
        height={height ?? 600}
        priority={priority}
        sizes={sizes}
        quality={quality}
        className={className}
      />
    );
  }

  const loading = priority ? "eager" : "lazy";
  const fetchPriority = priority ? ("high" as const) : undefined;

  if (fill) {
    return (
      // eslint-disable-next-line @next/next/no-img-element -- srcset يتطلب img مباشر مع static export
      <img
        src={local.defaultSrc}
        srcSet={local.srcSet}
        sizes={sizes}
        alt={alt}
        title={title}
        loading={loading}
        fetchPriority={fetchPriority}
        decoding="async"
        className={className}
        style={{ position: "absolute", height: "100%", width: "100%", inset: 0 }}
      />
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={local.defaultSrc}
      srcSet={local.srcSet}
      sizes={sizes}
      alt={alt}
      title={title}
      width={width}
      height={height}
      loading={loading}
      fetchPriority={fetchPriority}
      decoding="async"
      className={className}
    />
  );
}
