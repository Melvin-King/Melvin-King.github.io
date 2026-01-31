"use client";

import { useState, useEffect } from "react";

export default function CitationCount({ doi }: { doi: string }) {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    if (!doi) return;
    
    fetch(`https://api.semanticscholar.org/graph/v1/paper/DOI:${doi}?fields=citationCount`)
      .then((res) => res.json())
      .then((data) => {
        if (data && data.citationCount > 0) {
          setCount(data.citationCount);
        }
      })
      .catch((err) => console.error("Scholar API Error:", err));
  }, [doi]);

  if (count === null) return null;

  return <span>Citations {count}</span>;
}