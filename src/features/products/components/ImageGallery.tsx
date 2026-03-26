"use client";

import { useState } from "react";

interface ImageGalleryProps {
  thumbnail: string;
  images: string[];
  title: string;
}

export function ImageGallery({ thumbnail, images, title }: ImageGalleryProps) {
  const allImages = images.length > 0 ? images : [thumbnail];
  const [selected, setSelected] = useState(allImages[0]);

  return (
    <div className="flex flex-col gap-4">
      <div className="aspect-square bg-gray-50 rounded-2xl overflow-hidden flex items-center justify-center p-8">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={selected}
          alt={title}
          className="h-full w-full object-contain"
        />
      </div>

      {allImages.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {allImages.map((img, i) => (
            <button
              key={i}
              onClick={() => setSelected(img)}
              className={`shrink-0 w-20 h-20 rounded-lg bg-gray-50 border-2 overflow-hidden flex items-center justify-center p-1 transition-colors ${
                selected === img
                  ? "border-orange-400"
                  : "border-gray-200 hover:border-orange-300"
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={img}
                alt={`${title} ${i + 1}`}
                className="h-full w-full object-contain"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
