import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404",
  description: "Error 404 - Page not found",
};

export default function NotFound() {
  return (
    <section className="mx-auto mt-6 max-w-6xl px-6 md:px-[50px] pb-24 flex flex-col items-center justify-center min-h-[70vh] text-center">
      {/* 404 Logo 容器 */}
      <div className="relative mb-8 transition-transform duration-500 hover:scale-105">
        <img
          src="/404.png"
          alt="404 Not Found"
          className="w-full max-w-[150px] md:max-w-[200px] object-contain mx-auto"
        />
      </div>

      {/* 标题与标志性的下划线 */}
      <div className="flex flex-col items-center mb-6">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Page Not Found
        </h2>
        <div className="h-1 w-12 bg-[#41e0e2] mt-2"></div>
      </div>

      {/* 描述文本 - 缩小字号以匹配项目页面的精致感 */}
      <p className="text-sm text-neutral-500 dark:text-neutral-400 max-w-md leading-relaxed mb-10">
        Oops! Cannot find the page you're looking for. It might have been moved or the link is broken...
      </p>

      {/* 返回首页按钮 - 使用项目卡片中的紫色调 */}
      <Link
        href="/"
        className="group flex items-center space-x-2 bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 px-6 py-2.5 rounded-full text-xs font-bold text-[#7c3aed] transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
      >
        <svg 
          className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
        </svg>
        <span>Back to Home</span>
      </Link>
    </section>
  );
}