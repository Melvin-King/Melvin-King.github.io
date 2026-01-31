"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Block {
  image: string;
  title: string;
  link: string;
}

interface CarouselProps {
  blocks: Block[];
}

export default function Carousel({ blocks: initialBlocks }: CarouselProps) {
  const blocks = [...initialBlocks.slice(-3), ...initialBlocks, ...initialBlocks.slice(0, 3)];
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [isMoving, setIsMoving] = useState(false);
  
  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      const blockWidth = el.clientWidth / (window.innerWidth >= 768 ? 3 : 1);
      el.scrollLeft = blockWidth * 3;
    }
  }, []);

  const getBlockWidth = () => {
    const el = scrollRef.current;
    if (!el) return 0;
    return window.innerWidth >= 768 ? el.clientWidth / 3 : el.clientWidth;
  };

  const handleLoop = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const blockWidth = getBlockWidth();
    const { scrollLeft } = el;

    if (scrollLeft >= blockWidth * (initialBlocks.length + 3)) {
      el.style.scrollBehavior = "auto";
      el.scrollLeft = blockWidth * 3;
    }
    if (scrollLeft <= 0) {
      el.style.scrollBehavior = "auto";
      el.scrollLeft = blockWidth * initialBlocks.length;
    }
  }, [initialBlocks.length]);

  const scroll = useCallback((direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el || isMoving) return;

    setIsMoving(true);
    const blockWidth = getBlockWidth();
    el.style.scrollBehavior = "smooth";
    el.scrollLeft += direction === "left" ? -blockWidth : blockWidth;

    setTimeout(() => {
      handleLoop();
      setIsMoving(false);
    }, 500);
  }, [handleLoop, isMoving]);

  useEffect(() => {
    if (initialBlocks.length <= 3) return;
    const interval = setInterval(() => {
      if (!isPaused) scroll("right");
    }, 5000);
    return () => clearInterval(interval);
  }, [isPaused, scroll, initialBlocks.length]);

  return (
    <div 
      className="group relative w-full"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {initialBlocks.length > 3 && (
        <>
          <button
            onClick={() => scroll("left")}
            className="absolute -left-5 top-1/2 z-30 -translate-y-1/2 bg-white/90 dark:bg-black/80 p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all hidden md:flex hover:scale-110 active:scale-90"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => scroll("right")}
            className="absolute -right-5 top-1/2 z-30 -translate-y-1/2 bg-white/90 dark:bg-black/80 p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all hidden md:flex hover:scale-110 active:scale-90"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </>
      )}

      <div
        ref={scrollRef}
        onScroll={() => { if (!isMoving) handleLoop(); }}
        className="flex overflow-x-auto no-scrollbar snap-x snap-mandatory py-4"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {blocks.map((block, index) => (
          <div key={index} className="flex-shrink-0 snap-start w-full md:w-1/3 p-2">
            <Link
              href={block.link}
              className="relative block w-full aspect-[3/2] overflow-hidden transition-all duration-500 hover:scale-[1.03] group/item shadow-sm"
            >
              <Image
                src={block.image}
                alt={block.title}
                fill
                className="object-cover"
                onError={(e) => { (e.target as HTMLImageElement).src = "https://placehold.co/600x400?text=Image+Not+Found"; }}
              />

              <div className="absolute bottom-0 left-0 right-0 h-[35%] overflow-hidden">
                <div className="absolute inset-0 bg-black/40 backdrop-blur-md [mask-image:linear-gradient(to_top,black_60%,transparent)]" />
                
                <div className="relative h-full w-full flex items-end p-5">
                  <span className="text-white font-medium text-sm md:text-base tracking-wide leading-tight drop-shadow-sm">
                    {block.title}
                  </span>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}