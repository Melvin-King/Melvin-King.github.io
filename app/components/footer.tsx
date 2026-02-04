"use client";

import React from "react";
import {
  FaXTwitter,
  FaGithub,
  FaRss,
  FaLinkedinIn,
} from "react-icons/fa6";
import { TbMailFilled } from "react-icons/tb";
import { SiGooglescholar } from "react-icons/si";
import { socialLinks } from "app/lib/config";

import { useRef, useEffect } from "react";
import FloatingDialog from "./floating-dialog";
import { SiArxiv, SiOrcid } from "react-icons/si";

const YEAR = new Date().getFullYear();

function SocialLink({ href, icon: Icon }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="hover:text-gray-300 dark:hover:text-gray-600 transition-colors">
      <Icon />
    </a>
  );
}

function SocialLinks() {
  return (
    <div className="flex text-base gap-4 transition-opacity duration-300">
      <SocialLink href={socialLinks.twitter} icon={FaXTwitter} />
      <SocialLink href={socialLinks.github} icon={FaGithub} />
      <SocialLink href={socialLinks.googlescholar} icon={SiGooglescholar} />
      <SocialLink href={socialLinks.linkedin} icon={FaLinkedinIn} />
      <SocialLink href={socialLinks.orcid} icon={SiOrcid} />
      <a href="/rss.xml" target="_self" className="hover:text-gray-300 dark:hover:text-gray-600 transition-colors">
        <FaRss />
      </a>
    </div>
  );
}

export default function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 w-full z-[100001] isolate">
      <div className="relative">
        <FloatingDialog />
      </div>

      <div className="bg-black/85 dark:bg-white/85 backdrop-blur-lg border-t border-white/5 dark:border-black/10 text-white dark:text-black transition-colors duration-300">
        <div className="mx-auto max-w-6xl px-6 md:px-[50px] py-2 flex justify-between items-center">
          <small className="text-[12px] font-light tracking-wide opacity-90 dark:opacity-100">
            © {YEAR} Ming Wang. <span className="opacity-50 dark:opacity-40 ml-2">Last updated on Jan 31.</span>
          </small>
          <SocialLinks />
        </div>
      </div>
    </footer>
  );
}