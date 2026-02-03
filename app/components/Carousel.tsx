"use client";

import React, { useRef, useState, useEffect, useCallback, MouseEvent } from "react";
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
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

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
    setTimeout(() => { handleLoop(); setIsMoving(false); }, 500);
  }, [handleLoop, isMoving]);

  useEffect(() => {
    if (initialBlocks.length <= 3) return;
    const interval = setInterval(() => { if (!isPaused) scroll("right"); }, 5000);
    return () => clearInterval(interval);
  }, [isPaused, scroll, initialBlocks.length]);

  return (
    <div className="group relative w-full" onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}>
      {initialBlocks.length > 3 && (
        <>
          <button
            onClick={() => scroll("left")}
            className="absolute -left-5 top-1/2 z-40 -translate-y-1/2 bg-white/60 dark:bg-black/60 backdrop-blur-md p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all hidden md:flex hover:scale-110 active:scale-90 border border-white/20 dark:border-white/10"
          >
            <ChevronLeft className="w-5 h-5 text-gray-900 dark:text-white" />
          </button>

          <button
            onClick={() => scroll("right")}
            className="absolute -right-5 top-1/2 z-40 -translate-y-1/2 bg-white/60 dark:bg-black/60 backdrop-blur-md p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all hidden md:flex hover:scale-110 active:scale-90 border border-white/20 dark:border-white/10"
          >
            <ChevronRight className="w-5 h-5 text-gray-900 dark:text-white" />
          </button>
        </>
      )}

      <div ref={scrollRef} onScroll={() => { if (!isMoving) handleLoop(); }} className="flex overflow-x-auto no-scrollbar snap-x snap-mandatory py-2" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
        {blocks.map((block, index) => (
          <div key={index} className="flex-shrink-0 snap-start w-full md:w-1/3 p-3">
            <Link
              href={block.link}
              onMouseMove={handleMouseMove}
              className="group/item relative block w-full aspect-[3/2] rounded-2xl transition-all duration-500 hover:scale-[1.02] overflow-hidden bg-gray-200/50 dark:bg-neutral-800/50 p-[2px]"
              style={{
                // @ts-ignore
                "--x": `${mousePos.x}px`,
                "--y": `${mousePos.y}px`,
              }}
            >
              
              <div 
                className="absolute inset-0 z-0 opacity-0 transition-opacity duration-500 group-hover/item:opacity-100"
                style={{
                  background: `radial-gradient(300px circle at var(--x) var(--y), rgba(65, 224, 226, 0.5), transparent 80%)`,
                }}
              />

              
              <div className="relative z-10 w-full h-full rounded-[14px] overflow-hidden bg-white dark:bg-neutral-900">
                <Image
                  src={block.image}
                  alt={block.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover/item:scale-105"
                  onError={(e) => { (e.target as HTMLImageElement).src = "https://placehold.co/600x400?text=Image+Not+Found"; }}
                />

                
                <div className="absolute bottom-0 left-0 right-0 h-[40%] flex flex-col justify-end">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  
                  <div className="relative p-5">
                    <span className="text-white font-medium text-sm md:text-base tracking-wide leading-snug line-clamp-2 overflow-hidden text-ellipsis drop-shadow-md">
                      {block.title}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}