"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { formatDate } from "app/lib/posts";

export default function BlogList({ allBlogs }: { allBlogs: any[] }) {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    allBlogs.forEach((post) => {
      if (post.metadata.tags) {
        post.metadata.tags.split(",").forEach((tag: string) => tags.add(tag.trim()));
      }
    });
    return Array.from(tags).sort();
  }, [allBlogs]);

  const filteredBlogs = useMemo(() => {
    let filtered = allBlogs;
    if (selectedTags.length > 0) {
      filtered = allBlogs.filter((post) => {
        const postTags = post.metadata.tags?.split(",").map((t: string) => t.trim()) || [];
        return selectedTags.every((tag) => postTags.includes(tag));
      });
    }
    return filtered.sort((a, b) => 
      new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime()
    );
  }, [allBlogs, selectedTags]);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  return (
    <>
      <div className="flex flex-wrap gap-2 mb-8">
        {allTags.map((tag) => (
          <button
            key={tag}
            onClick={() => toggleTag(tag)}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-all border ${
              selectedTags.includes(tag)
                ? "bg-[#41e0e2] border-[#41e0e2] text-white"
                : "bg-neutral-100 dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-400 hover:border-[#41e0e2]"
            }`}
          >
            #{tag}
          </button>
        ))}
      </div>

      <div>
        {filteredBlogs.map((post) => (
          <Link
            key={post.slug}
            className="flex flex-col space-y-1 mb-5 transition-opacity duration-200 hover:opacity-80"
            href={`/blog/${post.slug}`}
          >
            <div className="w-full flex flex-col sm:flex-row justify-between items-start sm:items-center">
              <h2 className="text-black dark:text-white font-medium">{post.metadata.title}</h2>
              <p className="text-neutral-600 dark:text-neutral-400 tabular-nums text-sm">
                {formatDate(post.metadata.publishedAt, false)}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}