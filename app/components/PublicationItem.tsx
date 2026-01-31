"use client";

import { useState } from "react";
import CitationCount from "./CitationCount";
import GitHubStarCount from "./GitHubStarCount";
import GitHubForkCount from "./GitHubForkCount";

interface PublicationProps {
  title: string;
  authors: string[];
  venue: string;
  date: string;
  image: string;
  tag?: string;
  links: {
    abs?: string;
    bib?: string;
    doi?: string;
    html?: string;
    video?: string;
  };
  abstract: string;
  bibtex: string;
  stats: {
    doi: string;
    githubOwner: string;
    githubRepo: string;
  };
}

export default function PublicationItem({
  title, authors, venue, date, image, tag, links, abstract, bibtex, stats
}: PublicationProps) {
  const [expandedSection, setExpandedSection] = useState<"ABS" | "BIB" | null>(null);

  const toggleSection = (section: "ABS" | "BIB") => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(bibtex);
    alert("BibTeX copied!");
  };

  const downloadBib = () => {
    const element = document.createElement("a");
    const file = new Blob([bibtex], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = `${title.slice(0, 10)}.bib`;
    document.body.appendChild(element);
    element.click();
  };

  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 mb-3 shadow-sm hover:shadow-md transition-shadow bg-white dark:bg-transparent">
      <div className="flex items-start space-x-4">
        <div className="relative flex-shrink-0 flex flex-col items-start space-y-2 w-20 sm:w-28 sm:mt-1">
            {tag && (
                <div className="w-full sm:w-auto sm:absolute sm:-top-2 sm:-left-2 sm:z-10 bg-purple-600 text-white text-[10px] px-2 py-1 rounded shadow-sm flex items-center justify-center min-w-[50px]">
                  {tag}
                </div>
            )}
            
            <div className="w-full aspect-[4/3] sm:aspect-video bg-gray-100 dark:bg-gray-800 rounded overflow-hidden border border-gray-100 dark:border-gray-700 shadow-sm">
                <img 
                src={image} 
                alt="Paper Preview" 
                className="w-full h-full object-cover" 
                />
            </div>
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-sm mb-1 truncate">{title}</h3>
          
          <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
            {authors.map((author, i) => (
              <span key={i}>
                <span className={author.includes("M Wang") ? "font-bold underline" : "font-medium"}>{author}</span>
                {i < authors.length - 1 ? ", " : ""}
              </span>
            ))}
          </p>

          <p className="text-xs text-gray-600 dark:text-gray-400 mb-3">
            {venue}. <a href={links.html} target="_blank" className="text-purple-600 dark:text-purple-400 hover:underline">Link</a>, {date}
          </p>

          <div className="flex flex-nowrap space-x-2 mb-2 overflow-x-auto no-scrollbar [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <button 
              onClick={() => toggleSection("ABS")} 
              className={`flex-shrink-0 border text-xs px-2 py-1 rounded transition-all active:scale-95 ${expandedSection === 'ABS' ? 'bg-purple-600 text-white border-purple-600' : 'border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800'}`}>
              ABS
            </button>
            <button 
              onClick={() => toggleSection("BIB")} 
              className={`flex-shrink-0 border text-xs px-2 py-1 rounded transition-all active:scale-95 ${expandedSection === 'BIB' ? 'bg-purple-600 text-white border-purple-600' : 'border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800'}`}>
              BIB
            </button>
            {links.doi && <a href={links.doi} target="_blank" className="flex-shrink-0 border border-gray-300 dark:border-gray-600 text-xs px-2 py-1 rounded hover:bg-gray-50 dark:hover:bg-gray-800">DOI</a>}
            {links.html && <a href={links.html} target="_blank" className="flex-shrink-0 border border-gray-300 dark:border-gray-600 text-xs px-2 py-1 rounded hover:bg-gray-50 dark:hover:bg-gray-800">HTML</a>}
            {links.video && <a href={links.video} target="_blank" className="flex-shrink-0 border border-gray-300 dark:border-gray-600 text-xs px-2 py-1 rounded hover:bg-gray-50 dark:hover:bg-gray-800">VIDEO</a>}
          </div>

          <div className={`grid transition-all duration-300 ease-in-out ${expandedSection ? 'grid-rows-[1fr] opacity-100 mt-3' : 'grid-rows-[0fr] opacity-0'}`}>
            <div className="overflow-hidden">
              {expandedSection === "ABS" && (
                <div className="p-3 bg-gray-50 dark:bg-gray-800/50 rounded text-xs text-gray-700 dark:text-gray-300 leading-relaxed border-l-2 border-purple-500 italic">
                  {abstract}
                </div>
              )}
              {expandedSection === "BIB" && (
                <div className="relative">
                  <pre className="p-3 bg-gray-900 text-gray-300 rounded text-[10px] font-mono overflow-x-auto no-scrollbar">
                    {bibtex}
                  </pre>
                  <div className="flex space-x-3 mt-2">
                    <button onClick={copyToClipboard} className="text-[10px] text-purple-600 hover:text-purple-500 font-medium">Copy BibTeX</button>
                    <button onClick={downloadBib} className="text-[10px] text-purple-600 hover:text-purple-500 font-medium">Download .bib</button>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="flex space-x-4 text-xs text-gray-600 dark:text-gray-400 mt-3 overflow-x-auto no-scrollbar [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <span className="flex-shrink-0 font-medium text-purple-600 dark:text-purple-400">
              <CitationCount doi={stats.doi} />
            </span>
            <span className="flex-shrink-0 font-medium text-orange-500">
              <GitHubStarCount owner={stats.githubOwner} repo={stats.githubRepo} />
            </span>
            <span className="flex-shrink-0 font-medium text-blue-500">
              <GitHubForkCount owner={stats.githubOwner} repo={stats.githubRepo} />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}