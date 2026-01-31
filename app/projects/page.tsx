import Link from "next/link";
import type { Metadata } from "next";
import { projects } from "./project-data";

export const metadata: Metadata = {
  title: "Projects",
  description: "Researchfolio Projects",
};

export default function Projects() {
  return (
    <section className="mx-auto mt-6 max-w-6xl px-6 md:px-[50px] pb-24">
      <div className="mb-6">
        <h2 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
          Projects
        </h2>
        <div className="h-1 w-12 bg-[#41e0e2] mt-2"></div>
      </div>

      {/* Grid 容器：在 max-w-6xl 下，调整 gap 为 8 以获得更好的呼吸感 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <Link
            key={index}
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex flex-col w-full bg-white dark:bg-neutral-900 border border-gray-100 dark:border-neutral-800 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
          >
            {/* 图片区域 */}
            <div className="relative h-44 w-full overflow-hidden bg-gray-50 dark:bg-neutral-800">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            {/* 内容区域 */}
            <div className="p-4 flex flex-col flex-grow">
              <h3 className="text-base font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 leading-tight">
                {project.title}
              </h3>
              
              <p className="text-xs text-neutral-500 dark:text-neutral-400 line-clamp-3 mb-5 flex-grow leading-relaxed">
                {project.description}
              </p>

              {/* 底部信息 */}
              <div className="flex justify-between items-center mt-auto pt-2 dark:border-neutral-800">
                <span className="text-[11px] uppercase tracking-wider text-neutral-400 font-semibold">
                  {project.month} {project.year}
                </span>
                
                <div className="flex items-center text-[#7c3aed] text-xs font-bold transition-colors group-hover:text-[#6d28d9]">
                  <span>{project.linkText}</span>
                  <svg 
                    className="ml-1 w-3 h-3 transition-transform group-hover:translate-x-1" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}