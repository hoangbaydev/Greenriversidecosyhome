"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { IMAGE_BLUR_PLACEHOLDER, DEFAULT_BANNER_IMAGE } from "@/lib/constants";

const IMAGE_FALLBACK = DEFAULT_BANNER_IMAGE;

interface OptimizedImageProps {
  src: string;
  alt: string;
  fill?: boolean;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  sizes?: string;
  aspectRatio?: string;
}

export function OptimizedImage({
  src,
  alt,
  fill,
  width,
  height,
  className,
  priority,
  sizes = "(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw",
  aspectRatio,
}: OptimizedImageProps) {
  const [failedSrc, setFailedSrc] = useState<string | null>(null);

  if (!src) return null;

  const currentSrc = failedSrc === src ? IMAGE_FALLBACK : src;
  const isExternal = currentSrc.startsWith("http");

  const handleError = () => {
    if (currentSrc !== IMAGE_FALLBACK) setFailedSrc(src);
  };

  if (fill) {
    return (
      <Image
        src={currentSrc}
        alt={alt}
        fill
        className={cn("object-cover", className)}
        sizes={sizes}
        priority={priority}
        placeholder="blur"
        blurDataURL={IMAGE_BLUR_PLACEHOLDER}
        unoptimized={!isExternal && currentSrc.startsWith("/")}
        onError={handleError}
      />
    );
  }

  return (
    <div
      className={cn("relative overflow-hidden", aspectRatio)}
      style={aspectRatio ? { aspectRatio } : undefined}
    >
      <Image
        src={currentSrc}
        alt={alt}
        width={width ?? 800}
        height={height ?? 600}
        className={cn("h-full w-full object-cover", className)}
        sizes={sizes}
        priority={priority}
        placeholder="blur"
        blurDataURL={IMAGE_BLUR_PLACEHOLDER}
        onError={handleError}
      />
    </div>
  );
}
