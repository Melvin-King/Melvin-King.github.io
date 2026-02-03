"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { createPortal } from "react-dom";

interface HoverCardProps {
  name: string;
  image: string;
  description: React.ReactNode;
  href: string;
  children: React.ReactNode;
}

export default function HoverCard({ name, image, description, href, children }: HoverCardProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [style, setStyle] = useState<React.CSSProperties>({});
  const [arrowStyle, setArrowStyle] = useState<React.CSSProperties>({});
  const [side, setSide] = useState<"top" | "bottom">("top");
  
  const triggerRef = useRef<HTMLSpanElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handlePageShow = () => {
      setIsVisible(false);
    };

    window.addEventListener("pageshow", handlePageShow);
    return () => window.removeEventListener("pageshow", handlePageShow);
  }, []);

  const updatePosition = useCallback(() => {
    if (!triggerRef.current || !isVisible) return;
    
    const rects = triggerRef.current.getClientRects();
    if (rects.length === 0) return;

    const firstRect = rects[0];
    const windowWidth = window.innerWidth;
    const cardWidth = 320;
    const cardHeight = 210; 

    const verticalSide = firstRect.top < cardHeight ? "bottom" : "top";
    setSide(verticalSide);

    const topPos = verticalSide === "top" 
      ? firstRect.top - 12 
      : firstRect.bottom + 12;

    const triggerCenter = firstRect.left + firstRect.width / 2;
    
    let cardLeft = triggerCenter;
    let arrowLeftPercent = 50;

    if (triggerCenter < cardWidth / 2 + 10) {
      cardLeft = cardWidth / 2 + 10;
      arrowLeftPercent = (triggerCenter / cardWidth) * 100;
    } else if (triggerCenter > windowWidth - cardWidth / 2 - 10) {
      cardLeft = windowWidth - cardWidth / 2 - 10;
      arrowLeftPercent = ((triggerCenter - (windowWidth - cardWidth - 10)) / cardWidth) * 100;
    }

    arrowLeftPercent = Math.max(10, Math.min(90, arrowLeftPercent));

    setStyle({
      position: "fixed",
      left: `${cardLeft}px`,
      top: `${topPos}px`,
      transform: verticalSide === "top" ? "translate(-50%, -100%)" : "translate(-50%, 0)",
      zIndex: 999999,
    });

    setArrowStyle({
      left: `${arrowLeftPercent}%`,
    });
  }, [isVisible]);

  useEffect(() => {
    if (isVisible) {
      const syncPos = () => window.requestAnimationFrame(updatePosition);
      window.addEventListener("scroll", syncPos, { passive: true, capture: true });
      window.addEventListener("resize", syncPos);
      updatePosition();
      return () => {
        window.removeEventListener("scroll", syncPos, { capture: true });
        window.removeEventListener("resize", syncPos);
      };
    }
  }, [isVisible, updatePosition]);

  return (
    <span
      ref={triggerRef}
      onMouseEnter={() => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        setIsVisible(true);
      }}
      onMouseLeave={() => {
        timeoutRef.current = setTimeout(() => setIsVisible(false), 300);
      }}
      onClick={() => setIsVisible(true)}
      className="relative inline cursor-help font-medium"
    >
      <Link 
        href={href} 
        className="text-purple-400 hover:text-purple-300 transition-colors underline decoration-purple-400/30 underline-offset-4"
      >
        {children}
      </Link>

      {isVisible && typeof document !== "undefined" && createPortal(
        <div
          style={style}
          className="pointer-events-auto animate-in fade-in zoom-in duration-200"
          onMouseEnter={() => { if (timeoutRef.current) clearTimeout(timeoutRef.current); }}
          onMouseLeave={() => { timeoutRef.current = setTimeout(() => setIsVisible(false), 300); }}
        >
          <div className="w-[320px] overflow-hidden rounded-lg border border-white/20 bg-white/80 dark:bg-neutral-900/80 shadow-2xl backdrop-blur-md flex text-left">
            <div className="w-1/3 relative bg-neutral-200 dark:bg-neutral-800">
              <Image
                src={`/people/${image}`}
                alt={name}
                width={120}
                height={150}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="w-2/3 p-4 flex flex-col justify-between">
              <div>
                <h4 className="text-[15px] font-bold text-neutral-900 dark:text-white leading-tight">{name}</h4>
                <div className="mt-2 text-[12px] leading-[1.4] text-neutral-600 dark:text-neutral-300 line-clamp-4">{description}</div>
              </div>
              <Link 
                href={href} 
                onClick={() => setIsVisible(false)}
                className="mt-3 inline-flex items-center text-[13px] font-semibold text-purple-600 dark:text-purple-400 hover:underline self-end"
              >
                Read more &gt;
              </Link>
            </div>
          </div>

          <div 
            style={arrowStyle}
            className={`absolute h-0 w-0 -translate-x-1/2 border-l-[8px] border-r-[8px] border-l-transparent border-r-transparent ${
              side === "top" 
                ? "-bottom-2 border-t-[8px] border-t-white/80 dark:border-t-neutral-900/80" 
                : "-top-2 border-b-[8px] border-b-white/80 dark:border-b-neutral-900/80"
            }`} 
          />
        </div>,
        document.body
      )}
    </span>
  );
}