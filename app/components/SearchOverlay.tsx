"use client";

import { FaMagnifyingGlass, FaXmark } from "react-icons/fa6";
import { useEffect, useState, useMemo } from "react";
import Link from "next/link";

export function SearchOverlay({ isOpen, onClose, allPosts = [] }: { 
  isOpen: boolean; 
  onClose: () => void; 
  allPosts: any[] 
}) {
  const [query, setQuery] = useState("");
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => { setHasMounted(true); }, []);

  const results = useMemo(() => {
    if (!query.trim() || query.length < 2) return [];
    const lowerQuery = query.toLowerCase();

    return allPosts.map(post => {
      const plainContent = post.content.replace(/<[^>]*>/g, '').replace(/\n/g, ' ');
      const title = post.metadata.title || "";
      const tags = post.metadata.tags || "";

      const titleMatch = title.toLowerCase().indexOf(lowerQuery);
      const contentIndex = plainContent.toLowerCase().indexOf(lowerQuery);
      const tagMatch = tags.toLowerCase().includes(lowerQuery);

      if (titleMatch !== -1 || contentIndex !== -1 || tagMatch) {
        let excerpt = "";
        if (contentIndex !== -1) {
          const start = Math.max(0, contentIndex - 40);
          const end = Math.min(plainContent.length, contentIndex + 80);
          excerpt = (start > 0 ? "..." : "") + plainContent.substring(start, end) + "...";
        } else {
          excerpt = post.metadata.summary || plainContent.substring(0, 100) + "...";
        }

        return {
          slug: post.slug,
          title,
          excerpt,
          matchType: titleMatch !== -1 ? "title" : "content"
        };
      }
      return null;
    }).filter(Boolean);
  }, [query, allPosts]);

  const Highlight = ({ text, target }: { text: string, target: string }) => {
    if (!target) return <>{text}</>;
    const parts = text.split(new RegExp(`(${target})`, "gi"));
    return (
      <>
        {parts.map((part, i) => 
          part.toLowerCase() === target.toLowerCase() 
            ? <span key={i} className="text-[#7c5ede] dark:text-[#41e0e2] font-bold">{part}</span> 
            : part
        )}
      </>
    );
  };

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
  }, [isOpen]);

  if (!hasMounted) return null;

  return (
    <div className={`fixed inset-0 z-[999998] transition-all duration-500 ${isOpen ? "visible" : "invisible delay-500"}`}>
      <div 
        className={`absolute inset-0 transition-all duration-500 ease-in-out ${isOpen ? "bg-white/70 dark:bg-[#111010]/70 backdrop-blur-xl opacity-100" : "bg-white/0 dark:bg-[#111010]/0 backdrop-blur-none opacity-0"}`}
        onClick={onClose}
      />
      
      <div className={`relative w-full max-w-4xl mx-auto px-6 pt-[80px] transition-all duration-500 ${isOpen ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0"}`}>
        <div className="relative flex items-center">
          <FaMagnifyingGlass className="absolute left-5 text-gray-400 h-4 w-4" />
          <input
            autoFocus={isOpen}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search blogs, tags, content..."
            className="w-full bg-white/90 dark:bg-neutral-900/90 border border-gray-200 dark:border-gray-800 rounded-full py-3.5 pl-12 pr-12 text-sm shadow-2xl focus:outline-none focus:ring-2 focus:ring-[#41e0e2]/50 transition-all"
          />
          {query && (
            <button onClick={() => setQuery("")} className="absolute right-5 text-gray-400 hover:text-gray-600">
              <FaXmark className="h-5 w-5" />
            </button>
          )}
        </div>
        
        <div className="mt-8 overflow-y-auto max-h-[65vh] pr-2 custom-scrollbar">
          {query.length >= 2 && (
            <div className="mb-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                {results.length} results found
              </h3>
            </div>
          )}

          <div className="space-y-8 pb-10">
            {results.map((post: any) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} onClick={onClose} className="block group">
                <h4 className="text-base font-semibold text-[#000000] dark:text-[#ffffff] group-hover:underline decoration-[#41e0e2] underline-offset-4 transition-all">
                  <Highlight text={post.title} target={query} />
                </h4>
                <p className="mt-2 text-gray-600 dark:text-gray-400 leading-relaxed text-sm line-clamp-2">
                  <Highlight text={post.excerpt} target={query} />
                </p>
                <div className="mt-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                  Posts
                </div>
              </Link>
            ))}

            {query.length >= 2 && results.length === 0 && (
              <div className="text-center py-20 text-gray-500 italic">
                No results found for "{query}"
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}