"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Photo {
  src: string;
  alt?: string;
  title?: string;
  introduction?: string;
}

interface PhotoWallProps {
  photos: Photo[];
}

// 动画变体配置
const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? "100%" : direction < 0 ? "-100%" : 0,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    zIndex: 1,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? "100%" : direction > 0 ? "-100%" : 0,
    opacity: 0,
    zIndex: 0,
  }),
};

export default function PhotoWall({ photos }: PhotoWallProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  // page 用于追踪动画次数，direction 决定位移方向 (1 为向后, -1 为向前)
  const [[page, direction], setPage] = useState([0, 0]);

  const selectedPhoto = selectedIndex !== null ? photos[selectedIndex] : null;

  // 统一的切换逻辑
  const paginate = useCallback((newDirection: number) => {
    setPage(([prevPage]) => [prevPage + newDirection, newDirection]);
    setSelectedIndex((prev) => {
      if (prev === null) return null;
      if (newDirection === 1) {
        return prev < photos.length - 1 ? prev + 1 : 0;
      } else {
        return prev > 0 ? prev - 1 : photos.length - 1;
      }
    });
  }, [photos.length]);

  const showNext = () => paginate(1);
  const showPrev = () => paginate(-1);

  const closeModal = () => {
    setSelectedIndex(null);
    setPage([0, 0]);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;
      if (e.key === "ArrowRight") showNext();
      if (e.key === "ArrowLeft") showPrev();
      if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex, paginate]);

  return (
    <div className="w-full h-full">
      {/* 缩略图网格 - 保持原始布局设计 */}
      <div className="grid grid-cols-3 gap-0 h-full border-[#eeeeee] dark:border-[#333333]">
        {photos.map((photo, index) => (
          <div
            key={index}
            onClick={() => {
              setPage([0, 0]); // 点击缩略图进入时不带方向动画
              setSelectedIndex(index);
            }}
            className={`relative overflow-hidden cursor-pointer group border-[0.5px] border-[#eeeeee] dark:border-[#333333] ${
              index % 6 === 0 ? "col-span-2 row-span-2" : "col-span-1 row-span-1"
            }`}
            style={{ minHeight: index % 6 === 0 ? "auto" : "100px" }}
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

      {/* 弹窗部分 */}
      <AnimatePresence>
        {selectedIndex !== null && selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex flex-col select-none touch-none"
            onClick={closeModal}
          >
            <div className="absolute inset-0 bg-black/95 backdrop-blur-lg" />

            <div className="relative z-10 w-full h-full flex flex-col" onClick={(e) => e.stopPropagation()}>
              
              {/* 关闭按钮 */}
              <button
                onClick={closeModal}
                className="absolute right-6 z-[120] text-white/50 hover:text-white transition-colors p-2"
                style={{ top: '75px' }}
              >
                <X size={32} strokeWidth={1.5} />
              </button>

              <div
                className="flex flex-col items-center justify-between h-full w-full"
                style={{ paddingTop: '130px', paddingBottom: '80px' }}
              >
                {/* 图片展示区域 - 实现随手指拖动位移 */}
                <div className="relative w-full flex-grow flex items-center justify-center px-4 overflow-hidden">
                  <AnimatePresence initial={false} custom={direction}>
                    <motion.div
                      key={page} // 使用 page 确保循环切图时动画方向不乱
                      custom={direction}
                      variants={variants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{
                        x: { type: "spring", stiffness: 300, damping: 30 },
                        opacity: { duration: 0.2 }
                      }}
                      drag="x"
                      dragConstraints={{ left: 0, right: 0 }}
                      dragElastic={1}
                      onDragEnd={(e, { offset, velocity }) => {
                        const swipe = offset.x;
                        if (swipe < -50 || velocity.x < -500) {
                          showNext();
                        } else if (swipe > 50 || velocity.x > 500) {
                          showPrev();
                        }
                      }}
                      className="absolute w-full h-full max-w-5xl cursor-grab active:cursor-grabbing flex items-center justify-center"
                    >
                      <div className="relative w-full h-full pointer-events-none">
                        <Image
                          src={selectedPhoto.src}
                          alt={selectedPhoto.alt || "Selected"}
                          fill
                          className="object-contain"
                          unoptimized
                        />
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* 介绍文字部分 - 在切换后才执行进入动画 */}
                <div 
                  key={`info-${selectedIndex}`} 
                  className="w-full text-center text-white max-w-2xl px-6 pt-4 animate-in fade-in slide-in-from-bottom-2 duration-300"
                >
                  {selectedPhoto.title && (
                    <h3 className="text-xl font-bold mb-2">{selectedPhoto.title}</h3>
                  )}
                  {selectedPhoto.introduction && (
                    <p className="text-sm md:text-base text-gray-400 font-light leading-relaxed">
                      {selectedPhoto.introduction}
                    </p>
                  )}
                </div>
              </div>

              {/* PC端控制按钮 */}
              <button
                className="hidden md:flex absolute left-6 top-1/2 -translate-y-1/2 z-[110] text-white/40 hover:text-white transition-colors"
                onClick={(e) => { e.stopPropagation(); showPrev(); }}
              >
                <ChevronLeft size={48} strokeWidth={1} />
              </button>

              <button
                className="hidden md:flex absolute right-6 top-1/2 -translate-y-1/2 z-[110] text-white/40 hover:text-white transition-colors"
                onClick={(e) => { e.stopPropagation(); showNext(); }}
              >
                <ChevronRight size={48} strokeWidth={1} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}