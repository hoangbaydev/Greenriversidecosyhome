"use client";

import { useCallback, useState, useEffect, useRef } from "react";
import { OptimizedImage } from "@/components/ui/optimized-image";
import {
  ChevronLeft,
  ChevronRight,
  X,
  Grid,
  Maximize2,
  Minimize2,
} from "lucide-react";
import type { RoomImage } from "@/types";
import { cn } from "@/lib/utils";

interface RoomGalleryProps {
  roomTitle: string;
  roomImages?: RoomImage[];
  fallbackImages?: string[];
}

export function RoomGallery({
  roomTitle,
  roomImages = [],
  fallbackImages = [],
}: RoomGalleryProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  // Swipe gesture variables for mobile carousel
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const thumbnailContainerRef = useRef<HTMLDivElement>(null);

  // Normalize images to ensure we always have RoomImage objects
  const images: RoomImage[] =
    roomImages.length > 0
      ? [...roomImages].sort((a, b) => a.sortOrder - b.sortOrder)
      : fallbackImages.map((url, idx) => ({
          id: `fallback-${idx}`,
          imageUrl: url,
          imagePath: "",
          roomId: "",
          sortOrder: idx,
          isCover: idx === 0,
          altText: `${roomTitle} - Gallery Image ${idx + 1}`,
          title: `${roomTitle} - accommodation view`,
          description: "",
          uploadedAt: "",
        }));

  // Lightbox handlers
  const openLightbox = (index: number) => {
    setActiveIndex(index);
    setLightboxOpen(true);
    setIsZoomed(false);
  };

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
    setIsZoomed(false);
  }, []);

  const nextImage = useCallback(() => {
    setIsZoomed(false);
    setActiveIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const prevImage = useCallback(() => {
    setIsZoomed(false);
    setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  useEffect(() => {
    if (!lightboxOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [lightboxOpen]);

  // Keyboard navigation within lightbox
  useEffect(() => {
    if (!lightboxOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
      if (e.key === "Escape") closeLightbox();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [closeLightbox, lightboxOpen, nextImage, prevImage]);

  // Scroll active thumbnail in lightbox into view
  useEffect(() => {
    if (!lightboxOpen || !thumbnailContainerRef.current) return;
    const container = thumbnailContainerRef.current;
    const activeChild = container.children[activeIndex] as HTMLElement;
    if (activeChild) {
      const containerWidth = container.offsetWidth;
      const childLeft = activeChild.offsetLeft;
      const childWidth = activeChild.offsetWidth;
      container.scrollTo({
        left: childLeft - containerWidth / 2 + childWidth / 2,
        behavior: "smooth",
      });
    }
  }, [activeIndex, lightboxOpen]);

  // Swipe navigation helpers
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;
    
    if (isLeftSwipe) {
      nextImage();
    } else if (isRightSwipe) {
      prevImage();
    }
  };

  if (images.length === 0) {
    return (
      <div className="flex aspect-[16/10] w-full items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-gray-50 text-gray-400 dark:border-gray-800 dark:bg-gray-950">
        No images available
      </div>
    );
  }

  // Cover / Main image
  const firstImage = images[0];

  return (
    <div className="w-full space-y-4">
      {/* ----------------- DESKTOP GRID LAYOUT (Airbnb/Booking.com Style) ----------------- */}
      <div className="hidden md:block">
        {images.length >= 5 ? (
          /* Premium 5-Image Grid */
          <div className="relative grid grid-cols-4 gap-2.5 h-[400px] lg:h-[480px] w-full rounded-2xl overflow-hidden shadow-sm">
            {/* Main Cover (Left side, spans 2 columns, 2 rows) */}
            <div
              className="relative col-span-2 row-span-2 cursor-pointer overflow-hidden group bg-soft"
              onClick={() => openLightbox(0)}
            >
              <OptimizedImage
                src={firstImage.imageUrl}
                alt={firstImage.altText || roomTitle}
                fill
                priority
                sizes="(max-width: 1024px) 50vw, 40vw"
                className="img-hover h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.025]"
              />
              <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            </div>

            {/* Grid of 4 smaller images (Right side) */}
            {images.slice(1, 5).map((img, idx) => (
              <div
                key={img.id}
                className="relative cursor-pointer overflow-hidden group bg-soft"
                onClick={() => openLightbox(idx + 1)}
              >
                <OptimizedImage
                  src={img.imageUrl}
                  alt={img.altText || `${roomTitle} - ${idx + 2}`}
                  fill
                  sizes="(max-width: 1024px) 25vw, 20vw"
                  className="img-hover h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.035]"
                />
                <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              </div>
            ))}

            {/* Floating Show All Button */}
            <button
              onClick={() => openLightbox(0)}
              className="absolute bottom-4 right-4 flex items-center gap-2 rounded-lg border border-gray-300 bg-white/90 px-4 py-2 text-sm font-bold text-gray-800 shadow-md backdrop-blur-xs hover:bg-white hover:scale-105 active:scale-95 transition-all dark:border-gray-700 dark:bg-gray-900/90 dark:text-white"
            >
              <Grid className="h-4 w-4" />
              Show all photos ({images.length})
            </button>
          </div>
        ) : images.length === 1 ? (
          /* Single Image layout */
          <div
            className="relative h-[380px] lg:h-[450px] w-full rounded-2xl overflow-hidden cursor-pointer shadow-sm group bg-soft"
            onClick={() => openLightbox(0)}
          >
            <OptimizedImage
              src={firstImage.imageUrl}
              alt={firstImage.altText || roomTitle}
              fill
              priority
              sizes="100vw"
              className="img-hover transition-transform duration-500 group-hover:scale-[1.01]"
            />
          </div>
        ) : (
          /* Adaptive Column Layout (2 to 4 images) */
          <div
            className={cn(
              "relative grid gap-2.5 h-[360px] lg:h-[420px] w-full rounded-2xl overflow-hidden shadow-sm",
              images.length === 2 && "grid-cols-2",
              images.length === 3 && "grid-cols-3",
              images.length === 4 && "grid-cols-4"
            )}
          >
            {images.map((img, idx) => (
              <div
                key={img.id}
                className="relative cursor-pointer overflow-hidden group bg-soft h-full"
                onClick={() => openLightbox(idx)}
              >
                <OptimizedImage
                  src={img.imageUrl}
                  alt={img.altText || `${roomTitle} - ${idx + 1}`}
                  fill
                  sizes={`(max-width: 1024px) ${100 / images.length}vw, ${80 / images.length}vw`}
                  className="img-hover h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.025]"
                />
              </div>
            ))}

            <button
              onClick={() => openLightbox(0)}
              className="absolute bottom-4 right-4 flex items-center gap-2 rounded-lg border border-gray-300 bg-white/90 px-4 py-2 text-sm font-bold text-gray-800 shadow-md backdrop-blur-xs hover:bg-white transition-all dark:border-gray-700 dark:bg-gray-900/90 dark:text-white"
            >
              <Grid className="h-4 w-4" />
              View photos
            </button>
          </div>
        )}
      </div>

      {/* ----------------- MOBILE IMAGE SLIDER (Aspect ratio-stable carousel) ----------------- */}
      <div
        className="relative block md:hidden aspect-[4/3] w-full overflow-hidden rounded-2xl bg-soft shadow-sm group touch-pan-y"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onClick={() => openLightbox(activeIndex)}
      >
        <OptimizedImage
          src={images[activeIndex].imageUrl}
          alt={images[activeIndex].altText || `${roomTitle} - Mobile`}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />

        {/* Swipe Left/Right Help Overlay indicator (brief flash or subtle layout) */}
        <div className="absolute right-3 top-3 rounded-full bg-black/60 px-3 py-1.5 text-sm font-bold text-white backdrop-blur-xs">
          {activeIndex + 1} / {images.length}
        </div>

        {/* Subtle dot indicators */}
        {images.length > 1 && (
          <div className="absolute bottom-3.5 left-0 right-0 flex justify-center gap-1.5">
            {images.map((_, idx) => (
              <span
                key={idx}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-300",
                  idx === activeIndex
                    ? "bg-white w-3.5 shadow-sm"
                    : "bg-white/50 w-1.5"
                )}
              />
            ))}
          </div>
        )}
      </div>

      {/* ----------------- FULLSCREEN LIGHTBOX VIEWER ----------------- */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-100 flex flex-col justify-between bg-black/98 text-white select-none animate-in fade-in duration-200">
          {/* Top Navbar */}
          <div className="flex items-center justify-between p-4 md:px-8 border-b border-white/10 bg-black/40 backdrop-blur-xs">
            <div className="flex flex-col">
              <span className="text-sm font-bold tracking-wide">
                {activeIndex + 1} / {images.length}
              </span>
              <span className="hidden md:inline text-sm text-gray-400 mt-0.5 truncate max-w-lg">
                {images[activeIndex].altText || roomTitle}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsZoomed(!isZoomed)}
                className="hidden md:flex p-2 text-white/70 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
                title={isZoomed ? "Zoom Out" : "Zoom In"}
              >
                {isZoomed ? (
                  <Minimize2 className="h-5 w-5" />
                ) : (
                  <Maximize2 className="h-5 w-5" />
                )}
              </button>
              <button
                onClick={closeLightbox}
                className="flex items-center gap-1.5 rounded-full bg-white/10 hover:bg-white/20 px-3 py-1.5 text-sm font-bold transition-all text-white"
                title="Close (Esc)"
              >
                <X className="h-4 w-4" /> Close
              </button>
            </div>
          </div>

          {/* Core Image Slide Container */}
          <div
            className="relative flex-1 flex items-center justify-center p-4 md:p-6 touch-pan-y"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Left Nav Button */}
            {images.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  prevImage();
                }}
                className="absolute left-4 z-10 hidden md:flex h-12 w-12 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-all backdrop-blur-xs hover:scale-105 active:scale-95"
                title="Previous Image (Left Arrow)"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
            )}

            {/* Slide Image Box */}
            <div
              className={cn(
                "relative max-h-[72vh] md:max-h-[78vh] w-full max-w-5xl h-full flex items-center justify-center transition-all duration-300",
                isZoomed ? "scale-150 cursor-zoom-out" : "cursor-zoom-in"
              )}
              onClick={() => setIsZoomed(!isZoomed)}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={images[activeIndex].imageUrl}
                alt={images[activeIndex].altText || roomTitle}
                title={images[activeIndex].title}
                className="max-h-full max-w-full rounded-md object-contain shadow-2xl transition-all select-none"
              />
            </div>

            {/* Right Nav Button */}
            {images.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  nextImage();
                }}
                className="absolute right-4 z-10 hidden md:flex h-12 w-12 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-all backdrop-blur-xs hover:scale-105 active:scale-95"
                title="Next Image (Right Arrow)"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            )}
          </div>

          {/* Bottom Bar: Alt Text Details (mobile) & Ribbon Thumbnails */}
          <div className="flex flex-col bg-black/60 border-t border-white/10 py-3 backdrop-blur-xs">
            {/* Alt / Title caption strip */}
            {images[activeIndex].description && (
              <p className="text-center text-sm text-gray-300 px-4 mb-2 max-w-xl mx-auto line-clamp-1">
                {images[activeIndex].description}
              </p>
            )}

            {/* Horizontal Scrollable Thumbnails Strip */}
            {images.length > 1 && (
              <div
                ref={thumbnailContainerRef}
                className="flex gap-2 justify-start md:justify-center items-center overflow-x-auto max-w-full px-6 py-1 scroll-smooth no-scrollbar"
              >
                {images.map((img, idx) => (
                  <div
                    key={img.id}
                    className={cn(
                      "relative h-12 w-16 md:h-14 md:w-20 rounded-md overflow-hidden shrink-0 cursor-pointer border-2 transition-all hover:opacity-100",
                      idx === activeIndex
                        ? "border-amber-400 opacity-100 scale-105"
                        : "border-transparent opacity-40 hover:border-white/20"
                    )}
                    onClick={() => {
                      setIsZoomed(false);
                      setActiveIndex(idx);
                    }}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={img.imageUrl}
                      alt={`Thumb ${idx}`}
                      className="h-full w-full object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
