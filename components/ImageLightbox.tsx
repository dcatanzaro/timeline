"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";

interface ImageLightboxProps {
  images: string[];
  currentIndex: number;
  onClose: () => void;
}

export default function ImageLightbox({
  images,
  currentIndex,
  onClose,
}: ImageLightboxProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(currentIndex);
  const [mounted, setMounted] = useState(false);

  // Actualizar el índice cuando cambia desde fuera
  useEffect(() => {
    setCurrentImageIndex(currentIndex);
  }, [currentIndex]);

  useEffect(() => {
    setMounted(true);
    // Guardar la posición del scroll
    const scrollY = window.scrollY;
    // Prevenir el scroll del body
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";

    return () => {
      // Restaurar el scroll del body
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      window.scrollTo(0, scrollY);
    };
  }, []);

  const handlePrevious = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    const diff = touchStart - touchEnd;
    const minSwipeDistance = 50;

    if (diff > minSwipeDistance) {
      handleNext();
    }
    if (diff < -minSwipeDistance) {
      handlePrevious();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") onClose();
    if (e.key === "ArrowLeft") handlePrevious();
    if (e.key === "ArrowRight") handleNext();
  };

  const lightboxContent = (
    <div
      className="fixed inset-0 z-[9999] bg-black/95 flex items-center justify-center overflow-hidden"
      onClick={onClose}
      onKeyDown={handleKeyDown}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      tabIndex={0}
      style={{ top: 0, left: 0, right: 0, bottom: 0 }}
    >
      <button
        className="fixed top-6 right-6 text-white hover:text-gray-300 transition-colors z-10 flex items-center justify-center w-10 h-10 rounded-full bg-white/10 hover:bg-white/20"
        onClick={onClose}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      {images.length > 1 && (
        <>
          <button
            className="fixed left-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors z-10 flex items-center justify-center w-12 h-12 rounded-full bg-white/10 hover:bg-white/20"
            onClick={(e) => {
              e.stopPropagation();
              handlePrevious();
            }}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            className="fixed right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-300 transition-colors z-10 flex items-center justify-center w-12 h-12 rounded-full bg-white/10 hover:bg-white/20"
            onClick={(e) => {
              e.stopPropagation();
              handleNext();
            }}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </>
      )}

      <div
        className="relative w-full h-full flex items-center justify-center p-4"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={`/images_opt/${images[currentImageIndex]}`}
          alt={`Image ${currentImageIndex + 1}`}
          width={1920}
          height={1080}
          className="max-w-[95vw] max-h-[85vh] object-contain"
        />
        {images.length > 1 && (
          <div className="fixed bottom-8 left-1/2 -translate-x-1/2 text-white text-sm bg-black/50 px-4 py-2 rounded-full">
            {currentImageIndex + 1} / {images.length}
          </div>
        )}
      </div>
    </div>
  );

  if (!mounted) return null;

  return createPortal(lightboxContent, document.body);
}
