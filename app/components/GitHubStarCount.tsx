"use client";

import { useState, useEffect } from "react";

interface GitHubProps {
  owner: string;
  repo: string;
}

export default function GitHubStarCount({ owner, repo }: GitHubProps) {
  const [stars, setStars] = useState<number | null>(null);

  useEffect(() => {
    if (!owner || !repo) return;

    const fetchStars = async () => {
      try {
        const response = await fetch(`https://api.github.com/repos/${owner}/${repo}`);
        if (!response.ok) throw new Error("Network response was not ok");
        
        const data = await response.json();
        
        if (data && data.stargazers_count > 0) {
          setStars(data.stargazers_count);
        }
      } catch (error) {
        console.error("Failed to fetch GitHub stars:", error);
      }
    };

    fetchStars();
  }, [owner, repo]);

  if (stars === null) return null;

  const displayStars = stars >= 1000 ? `${(stars / 1000).toFixed(1)}k` : stars;

  return (
    <span className="flex items-center">
      <svg className="w-3 h-3 mr-1 fill-current" viewBox="0 0 16 16">
        <path d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25z"></path>
      </svg>
      Stars {displayStars}
    </span>
  );
}