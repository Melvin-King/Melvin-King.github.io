import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { CustomMDX } from "app/components/mdx";
import { formatDate, getBlogPosts } from "app/lib/posts";
import { metaData, owner, education, socialLinks } from "app/lib/config";

import Image from "next/image";
import { FaGraduationCap, FaXTwitter, FaGithub, FaLinkedinIn, FaGoogleScholar } from "react-icons/fa6";
import { SiArxiv, SiOrcid } from "react-icons/si";

export async function generateStaticParams() {
  let posts = getBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function Blog({ params }) {
  const { slug } = await params;
  const allPosts = getBlogPosts();
  let post = allPosts.find((post) => post.slug === slug);

  if (!post) notFound();

  const wordCount = post.content.split(/\s+/).length;
  const readingTime = Math.max(1, Math.ceil(wordCount / 200));

  return (
    <section className="mx-auto max-w-6xl px-6 md:px-[50px]">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.metadata.title,
            datePublished: post.metadata.publishedAt,
            url: `${metaData.baseUrl}/blog/${post.slug}`,
            author: { "@type": "Person", name: metaData.name },
          }),
        }}
      />

      <div className="flex flex-col md:flex-row gap-10 items-start relative">

        <aside className="hidden md:block w-64 flex-shrink-0 sticky top-20 self-start h-[calc(100vh-144px)]">
          <div className="flex flex-col h-full space-y-4">
            <div className="flex-shrink-0 p-6 border border-neutral-200 dark:border-neutral-800 rounded-2xl bg-white dark:bg-neutral-900 shadow-sm">
              <div className="flex justify-center mb-4">
                <div className="w-20 h-20 rounded-full bg-neutral-100 dark:bg-neutral-800 overflow-hidden border border-neutral-100 dark:border-neutral-800 shadow-inner">
                  <Image src="/author/profile.PNG" alt={owner.name} width={80} height={80} className="object-cover" />
                </div>
              </div>
              <div className="text-center mb-6">
                <h2 className="text-lg font-bold text-neutral-900 dark:text-neutral-100 leading-tight">{owner.name}</h2>
                <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-2 leading-snug">{education.mscDegree}</p>
                <p className="text-[10px] text-neutral-500 mt-1">{education.mscSchool}</p>
              </div>
              <div className="flex justify-center items-center gap-3.5 mb-3 text-neutral-600 dark:text-neutral-400">
                <a href={socialLinks.twitter} target="_blank" className="hover:text-black dark:hover:text-white transition-colors"><FaXTwitter size={16} /></a>
                <a href={socialLinks.github} target="_blank" className="hover:text-black dark:hover:text-white transition-colors"><FaGithub size={16} /></a>
                <a href={socialLinks.googlescholar} target="_blank" className="hover:text-black dark:hover:text-white transition-colors"><FaGoogleScholar size={16} /></a>
                <a href={socialLinks.linkedin} target="_blank" className="hover:text-black dark:hover:text-white transition-colors"><FaLinkedinIn size={16} /></a>
                <a href={socialLinks.arxiv} target="_blank" className="hover:text-black dark:hover:text-white transition-colors"><SiArxiv size={18} /></a>
                <a href={socialLinks.orcid} target="_blank" className="hover:text-black dark:hover:text-white transition-colors"><SiOrcid size={18} /></a>
              </div>
              
              <div className="hidden [@media(min-height:750px)]:block">
                <hr className="border-neutral-100 dark:border-neutral-800 mb-3" />
                <div className="space-y-4 text-xs">
                  <div className="flex gap-3">
                    <FaGraduationCap className="w-4 h-4 text-neutral-400 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-neutral-800 dark:text-neutral-200">{education.mscDegree}</p>
                      <p className="text-[10px] text-neutral-500">{education.mscSchool}</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <FaGraduationCap className="w-4 h-4 text-neutral-400 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-neutral-800 dark:text-neutral-200">{education.bscDegree}</p>
                      <p className="text-[10px] text-neutral-500">{education.bscSchool}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex-1 min-h-0 p-4 border border-neutral-200 dark:border-neutral-800 rounded-2xl bg-white dark:bg-neutral-900 shadow-sm flex flex-col">
              <h3 className="text-[11px] font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-widest px-2 mb-3 flex-shrink-0">All Blogs</h3>
              <div className="flex-1 overflow-y-auto pr-1 space-y-1 scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                <style dangerouslySetInnerHTML={{ __html: `.scrollbar-hide::-webkit-scrollbar { display: none; }` }} />
                {allPosts
                  .sort((a, b) => new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime())
                  .map((p) => {
                    const isActive = p.slug === slug;
                    return (
                      <Link key={p.slug} href={`/blog/${p.slug}`} scroll={false} className={`block p-2 rounded-lg transition-all group ${isActive ? "bg-neutral-100 dark:bg-neutral-800" : "hover:bg-neutral-50 dark:hover:bg-neutral-800/50"}`}>
                        <p className={`text-[13px] font-medium leading-tight mb-1 ${isActive ? "text-[#7c5ede] dark:text-[#41e0e2]" : "text-neutral-700 dark:text-neutral-300 group-hover:text-black dark:group-hover:text-white"}`}>{p.metadata.title}</p>
                        <p className="text-[10px] text-neutral-400">{formatDate(p.metadata.publishedAt)}</p>
                      </Link>
                    );
                  })}
              </div>
            </div>
          </div>
        </aside>
        
        <div className="flex-1 min-w-0">
          <div className="max-w-[640px] w-full"> 
            <h1 className="title mb-3 font-medium text-2xl pt-5 tracking-tighter">
              {post.metadata.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-y-3 gap-x-3 mt-2 mb-8 text-sm text-neutral-600 dark:text-neutral-400">
              <div>{formatDate(post.metadata.publishedAt)}</div>
              <span className="text-neutral-300">•</span>
              <div className="flex items-center gap-2 font-medium text-neutral-900 dark:text-neutral-100">
                <Image src="/author/profile.PNG" alt="Ming Melvin Wang" width={24} height={24} className="rounded-full object-cover" />
                <span>{owner.name}</span>
              </div>
              <span className="text-neutral-300">•</span>
              <div>{readingTime} min read</div>
            </div>
            
            <article className="prose prose-quoteless prose-neutral dark:prose-invert max-w-none">
              <CustomMDX source={post.content} />
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}