"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ThemeSwitch } from "./theme-switch";
import { usePathname } from "next/navigation";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { FaBars, FaTimes } from "react-icons/fa";

const navItems = {
  "/papers": { name: "Papers" },
  "/blog": { name: "Blog" },
  "/projects": { name: "Projects" },
  "/personal": { name: "Personal" },
  "/misc": {name: "Misc"}
};

export function Navbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/95 dark:bg-[#111010]/95 backdrop-blur py-3 border-b border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between max-w-6xl mx-auto px-4 sm:px-[60px] gap-3 sm:gap-4">
        {/* Left side: Sign and Waterloo logo - never shrink */}
        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
          <Link href="/" className="flex items-center flex-shrink-0" onClick={closeMenu}>
            <Image
              src="/sign.png"
              alt="Ming Wang home"
              width={32}
              height={32}
              priority
              className="h-8 w-12 flex-shrink-0"
            />
          </Link>
          
          {/*
          <a
            href="https://uwaterloo.ca/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center flex-shrink-0"
          >
            <Image
              src="/waterloo_light.png"
              alt="University of Waterloo"
              width={240}
              height={20}
              priority
              className="h-6 w-auto block dark:hidden max-w-[140px] sm:max-w-none"
            />
            <Image
              src="/waterloo_dark.png"
              alt="University of Waterloo"
              width={240}
              height={20}
              priority
              className="h-6 w-auto hidden dark:block max-w-[140px] sm:max-w-none"
            />
          </a>*/}
        </div>

        {/* Desktop navigation - hidden on mobile */}
        <div className="hidden md:flex items-center gap-8 flex-shrink-0">
          {Object.entries(navItems).map(([path, { name }]) => {
            const isActive = pathname === path;
            return (
              <Link
                key={path}
                href={path}
                className={`text-sm font-medium transition-colors whitespace-nowrap ${
                  isActive
                    ? "text-gray-900 dark:text-white"
                    : "text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                }`}
              >
                {name}
              </Link>
            );
          })}
        </div>

        {/* Right side: Search, Theme, and Mobile Menu */}
        <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
          <button
            type="button"
            aria-label="Search"
            className="inline-flex items-center justify-center h-8 w-8 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/10 transition flex-shrink-0"
          >
            <FaMagnifyingGlass className="h-4 w-4" />
          </button>
          <ThemeSwitch />
          
          {/* Mobile menu button - only shown on small screens */}
          <button
            type="button"
            onClick={toggleMenu}
            aria-label="Toggle menu"
            className="md:hidden inline-flex items-center justify-center h-8 w-8 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/10 transition flex-shrink-0"
          >
            {isMenuOpen ? (
              <FaTimes className="h-5 w-5" />
            ) : (
              <FaBars className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      <div
        className={`md:hidden border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-[#111010] overflow-hidden transition-all duration-300 ease-in-out ${
          isMenuOpen
            ? "max-h-96 opacity-100"
            : "max-h-0 opacity-0"
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-[60px] py-4">
          <div className="flex flex-col gap-3">
            {Object.entries(navItems).map(([path, { name }]) => {
              const isActive = pathname === path;
              return (
                <Link
                  key={path}
                  href={path}
                  onClick={closeMenu}
                  className={`text-base font-medium transition-colors py-2 text-center ${
                    isActive
                      ? "text-gray-900 dark:text-white"
                      : "text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                  }`}
                >
                  {name}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}
