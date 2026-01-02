"use client";

import { useState } from "react";
import Image from "next/image";
import ImageLightbox from "./ImageLightbox";

interface ImageGalleryProps {
  images: string[];
}

export default function ImageGallery({ images }: ImageGalleryProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleImageClick = (index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  if (!images || images.length === 0) return null;

  return (
    <>
      <div className="my-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {images.map((image, index) => (
            <div
              key={index}
              className="relative rounded-lg overflow-hidden bg-gray-700 cursor-pointer group"
              onClick={() => handleImageClick(index)}
            >
              <Image
                width={1000}
                height={1000}
                src={`/images_opt/${image}`}
                alt={`Gallery image ${index + 1}`}
                className="w-full h-auto group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                <svg
                  className="w-12 h-12 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                  />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>

      {lightboxOpen && (
        <ImageLightbox
          images={images}
          currentIndex={currentIndex}
          onClose={() => setLightboxOpen(false)}
        />
      )}
    </>
  );
}
