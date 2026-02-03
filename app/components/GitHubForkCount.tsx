"use client";

import { useState, useEffect } from "react";

interface GitHubProps {
  owner: string;
  repo: string;
}

export default function GitHubForkCount({ owner, repo }: GitHubProps) {
  const [forks, setForks] = useState<number | null>(null);

  useEffect(() => {
    if (!owner || !repo) return;

    const fetchForks = async () => {
      try {
        const response = await fetch(`https://api.github.com/repos/${owner}/${repo}`);
        if (!response.ok) throw new Error("Network response was not ok");
        const data = await response.json();
        
        if (data && data.forks_count > 0) {
          setForks(data.forks_count);
        }
      } catch (error) {
        console.error("Failed to fetch GitHub forks:", error);
      }
    };

    fetchForks();
  }, [owner, repo]);

  if (forks === null) return null;

  return (
    <span className="flex items-center">
      <svg className="w-3 h-3 mr-1 fill-current" viewBox="0 0 16 16">
        <path d="M5 5.372v.878c0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75v-.878a2.25 2.25 0 111.5 0v.878a2.25 2.25 0 01-2.25 2.25h-1.5v2.128a2.251 2.251 0 11-1.5 0V8.5h-1.5A2.25 2.25 0 013.5 6.25v-.878a2.25 2.25 0 111.5 0zM5 3.25a.75.75 0 10-1.5 0 .75.75 0 001.5 0zm6.75.75a.75.75 0 100-1.5.75.75 0 000 1.5zm-3 8.75a.75.75 0 10-1.5 0 .75.75 0 001.5 0z"></path>
      </svg>
      Forks {forks}
    </span>
  );
}