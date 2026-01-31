"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import {
  FaGithub,
  FaLinkedinIn,
  FaXTwitter,
  FaGoogleScholar,
} from "react-icons/fa6";
import { socialLinks } from "../lib/config";
import { FaGraduationCap, FaCode } from "react-icons/fa6";
import { SiArxiv, SiOrcid } from "react-icons/si";

import HoverCard from "app/components/hover-card";

function SocialIconLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="inline-flex h-9 items-center justify-center rounded-md border border-white/20 bg-white/10 px-2.5 py-1.5 text-white/90 backdrop-blur transition hover:bg-white/15 hover:text-white"
    >
      {children}
    </a>
  );
}

export default function HomeHero() {
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!bgRef.current) return;
      const scrolled = window.scrollY;
      window.requestAnimationFrame(() => {
        if (bgRef.current) {
          bgRef.current.style.transform = `translate3d(0, ${scrolled * 0.2}px, 0)`;
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative w-full overflow-hidden">
      <div className="relative border-b border-black/10 dark:border-white/10">
        
        <div 
          ref={bgRef} 
          className="absolute inset-0 z-0 scale-110 will-change-transform"
        >
          <Image
            src="/thumbnail_image.png"
            alt=""
            fill
            priority
            className="object-cover"
          />
        </div>

        <div className="absolute inset-0 bg-black/55 z-10" />

        <div className="relative z-20 mx-auto max-w-6xl px-6 md:px-[50px] py-14 sm:py-20">
          <div className="grid items-center gap-10 md:gap-8 md:grid-cols-[1fr_auto]">
            <div className="order-2 text-white md:order-1 w-full md:max-w-2xl">
              <p className="text-sm leading-relaxed text-white/90 sm:text-[15px]">
                I received my B.Sc. in Computer Science from The Hong Kong Polytechnic University. My current research focus on understanding code inteligence of Multi-modal Large Language Models (MLLMs) in multimodal scenarios, and my interests revolve around Agentic AI, AI4SE & SE4AI, Social Network Analysis, Graph Neural Networks, and more! I have experience in areas such as Federated Learning and Temporal GNN in recommendation networks. My existing research have also made contributions to AI and strategic practices in engineering management.
              </p>

              <p className="text-sm leading-relaxed text-white/90 sm:text-[15px]">
                 <br />
                <strong>I am actively seeking opportunities for Ph.D. studies in the fall of 2026!</strong>
              </p>

              <div className="mt-6 flex flex-wrap items-center justify-center md:justify-start gap-3">
                <div className="flex flex-wrap items-center justify-center gap-2 order-1">
                  <SocialIconLink href={socialLinks.twitter} label="Twitter / X">
                    <FaXTwitter className="h-5 w-5" />
                  </SocialIconLink>
                  <SocialIconLink href={socialLinks.github} label="GitHub">
                    <FaGithub className="h-5 w-5" />
                  </SocialIconLink>
                  <SocialIconLink href={socialLinks.googlescholar} label="Google Scholar">
                    <FaGoogleScholar className="h-5 w-5" />
                  </SocialIconLink>
                  <SocialIconLink href={socialLinks.linkedin} label="LinkedIn">
                    <FaLinkedinIn className="h-5 w-5" />
                  </SocialIconLink>
                  <SocialIconLink href={socialLinks.arxiv} label="ArXiv">
                    <SiArxiv className="h-5 w-5" />
                  </SocialIconLink>
                  <SocialIconLink href={socialLinks.orcid} label="ORCID">
                    <SiOrcid className="h-5 w-5" />
                  </SocialIconLink>
                </div>

                <Link
                  href="/author/CV.pdf"
                  className="inline-flex h-9 items-center justify-center rounded-md px-4 text-sm font-medium transition 
                    border border-white/20
                    dark:bg-black dark:text-white dark:hover:bg-black/90 
                    bg-white text-black hover:bg-white/90 
                    order-2"
                >
                  Download CV
                </Link>
              </div>

              <div className="mt-10 grid gap-10 sm:grid-cols-3">
                <div>
                  <h2 className="text-xl font-semibold mb-4">Interests</h2>
                  <ul className="space-y-4 text-sm text-white/90">
                    <li className="flex gap-3 items-start"><FaCode className="h-5 w-5 mt-0.5 opacity-80" /><span>Multimodal LLM</span></li>
                    <li className="flex gap-3 items-start"><FaCode className="h-5 w-5 mt-0.5 opacity-80" /><span>Software Engineering</span></li>
                    <li className="flex gap-3 items-start"><FaCode className="h-5 w-5 mt-0.5 opacity-80" /><span>AI4SE</span></li>
                  </ul>
                </div>

                <div className="sm:col-span-2">
                  <h2 className="text-xl font-semibold mb-4">Education</h2>
                  <ul className="space-y-6 text-sm text-white/90">
                    <li className="flex gap-3 items-start">
                      <FaGraduationCap className="h-6 w-6 mt-1 opacity-90" />
                      <div>
                        <div className="font-medium">MSc Information Engineering</div>
                        <div className="text-white/70 text-xs">The Chinese University of Hong Kong</div>
                      </div>
                    </li>
                    <li className="flex gap-3 items-start">
                      <FaGraduationCap className="h-6 w-6 mt-1 opacity-90" />
                      <div>
                        <div className="font-medium">BSc Computer Science</div>
                        <div className="text-white/70 text-xs">The Hong Kong Polytechnic University</div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="order-1 md:order-2 flex justify-center md:justify-start">
              <div className="px-6 py-5 text-white flex flex-col items-center text-center gap-3 md:px-0 md:max-w-[240px]">
                <Image
                  src="/author/profile.PNG"
                  alt="Profile photo"
                  width={160}
                  height={160}
                  className="h-[160px] w-[160px] rounded-lg border border-white/20 object-cover rotate-[3deg]"
                  unoptimized
                  priority
                />
                <div className="text-lg font-semibold">Ming Melvin Wang</div>
                
                <div className="flex items-center justify-center gap-[1px] text-sm text-white/90">
                  <span>cd</span>
                  <img src="/dot.png" alt="dot" className="h-[12px] w-auto mx-0.5 self-center" />
                  <span>melvin</span>
                  <img src="/dot.png" alt="dot" className="h-[12px] w-auto mx-0.5 self-center" />
                  <span>wang</span>
                  <img src="/at.png" alt="at" className="h-[12px] w-auto mx-0.5 self-center" />
                  <span>outlook</span>
                  <img src="/dot.png" alt="dot" className="h-[12px] w-auto mx-0.5 self-center" />
                  <span>com</span>
                </div>


                <div className="text-xs text-white/85">MSc in Information Engineering<br />The Chinese University of Hong Kong</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}