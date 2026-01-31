"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface Photo {
  src: string;
  alt?: string;
  title?: string;
  introduction?: string;
}

interface PhotoWallProps {
  photos: Photo[];
}

export default function PhotoWall({ photos }: PhotoWallProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  const selectedPhoto = selectedIndex !== null ? photos[selectedIndex] : null;
  
  const showNext = useCallback(() => {
    setSelectedIndex((prev) => (prev !== null && prev < photos.length - 1 ? prev + 1 : 0));
  }, [photos.length]);

  const showPrev = useCallback(() => {
    setSelectedIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : photos.length - 1));
  }, [photos.length]);

  const closeModal = () => setSelectedIndex(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === "ArrowRight") showNext();
      if (e.key === "ArrowLeft") showPrev();
      if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex, showNext, showPrev]);

  const handleTouchStart = (e: React.TouchEvent) => setTouchStart(e.targetTouches[0].clientX);
  
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const touchEnd = e.changedTouches[0].clientX;
    const distance = touchStart - touchEnd;

    if (distance > 50) showNext(); 
    if (distance < -50) showPrev(); 
    setTouchStart(null);
  };

  return (
    <div className="w-full h-full"> 
      <div className="grid grid-cols-3 gap-0 h-full border-[#eeeeee] dark:border-[#333333]">
        {photos.map((photo, index) => (
          <div
            key={index}
            onClick={() => setSelectedIndex(index)}
            className={`relative overflow-hidden cursor-pointer group border-[0.5px] border-[#eeeeee] dark:border-[#333333] ${
              index % 6 === 0 ? "col-span-2 row-span-2" : "col-span-1 row-span-1"
            }`}
            style={{ minHeight: index % 6 === 0 ? 'auto' : '100px' }} 
          >
            <Image
              src={photo.src}
              alt={photo.alt || `Photo ${index + 1}`}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 66vw, 33vw"
              priority={index < 2}
            />
            <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        ))}
      </div>

        {selectedPhoto && (
        <div 
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10 select-none"
            onClick={closeModal}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
        >
            <div className="absolute inset-0 bg-black/95 backdrop-blur-lg" />

            <button 
            onClick={closeModal}
            className="fixed top-6 right-6 z-[120] text-white/50 hover:text-white transition-colors p-2"
            >
            <X size={32} strokeWidth={1.5} />
            </button>

            <button 
            className="hidden md:flex absolute left-8 z-[110] text-white/50 hover:text-white transition-all bg-white/5 p-3 rounded-full hover:bg-white/10"
            onClick={(e) => { e.stopPropagation(); showPrev(); }}
            >
            <ChevronLeft size={40} strokeWidth={1.5} />
            </button>

            <button 
            className="hidden md:flex absolute right-8 z-[110] text-white/50 hover:text-white transition-all bg-white/5 p-3 rounded-full hover:bg-white/10"
            onClick={(e) => { e.stopPropagation(); showNext(); }}
            >
            <ChevronRight size={40} strokeWidth={1.5} />
            </button>
            
            <div 
            className="relative z-10 max-w-5xl w-full flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
            >

            <div className="relative w-full h-[60vh] md:h-[75vh]">
                <Image
                key={selectedPhoto.src}
                src={selectedPhoto.src}
                alt={selectedPhoto.alt || "Selected"}
                fill
                className="object-contain"
                unoptimized
                />
            </div>

            {(selectedPhoto.title || selectedPhoto.introduction) && (
                <div className="mt-6 text-center text-white max-w-2xl px-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
                {selectedPhoto.title && (
                    <h3 className="text-xl font-bold mb-2">{selectedPhoto.title}</h3>
                )}
                {selectedPhoto.introduction && (
                    <p className="text-sm md:text-base text-gray-400 font-light leading-relaxed">
                    {selectedPhoto.introduction}
                    </p>
                )}
                </div>
            )}
            </div>
        </div>
        )}
    </div>
  );
}