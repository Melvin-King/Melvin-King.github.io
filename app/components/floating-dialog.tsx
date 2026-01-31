"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

const DIALOG_ID = "2026-01-31-v1";

export default function FloatingDialog() {
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (pathname !== "/") return;
    const savedDialogId = localStorage.getItem("lastSeenFloatingDialogId");
    if (savedDialogId !== DIALOG_ID) {
      setIsVisible(true);
    }
  }, [pathname]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsVisible(false);
      localStorage.setItem("lastSeenFloatingDialogId", DIALOG_ID);
    }, 500); 
  };

  const handleNavigation = () => {
    localStorage.setItem("lastSeenFloatingDialogId", DIALOG_ID);
    router.push("/papers");
  };

  if (!isVisible || pathname !== "/") return null;

  return (
    <div
      className={`absolute bottom-full left-0 right-0 sm:left-auto sm:right-6 z-50 transition-all duration-500 ease-in-out
        ${isClosing 
          ? "translate-y-[150%] opacity-0 sm:translate-y-0 sm:translate-x-[120%]" 
          : "translate-y-0 opacity-100"
        }`}
    >
      <div className="relative flex items-end w-full sm:w-[400px]">
        <div
          className="relative bg-white/70 backdrop-blur-md shadow-[0_-4px_20px_-5px_rgba(0,0,0,0.1)] 
                     p-5 pr-24 w-full flex flex-col gap-3 border-t border-x border-white/30
                     rounded-t-2xl sm:rounded-2xl sm:mb-6 sm:border"
        >
          <div className="text-sm text-gray-800 font-medium leading-relaxed">
            Do reach out to collaborate if you find my publications aligned with yours!
          </div>

          <div className="flex gap-2">
            <button onClick={handleNavigation} className="flex-1 px-4 py-2.5 bg-[#41e0e2] text-white text-xs font-bold rounded-xl active:scale-95 transition-transform">
              See my works
            </button>
            <button onClick={handleClose} className="flex-1 px-4 py-2.5 bg-gray-200/50 text-gray-700 text-xs font-bold rounded-xl hover:bg-gray-200/80 transition-colors">
              Dismiss
            </button>
          </div>
        </div>

        <div className="absolute bottom-0 right-0 z-10 pointer-events-none">
          <Image src="/ani.png" alt="Mascot" width={140} height={140} className="object-contain" unoptimized priority />
        </div>
      </div>
    </div>
  );
}