import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CustomMDX } from "app/components/mdx";
import { formatDate, getBlogPosts } from "app/lib/posts";
import { metaData } from "app/lib/config";

import Image from "next/image";

export async function generateStaticParams() {
  let posts = getBlogPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function Blog({ params }) {
  const { slug } = await params;
  let post = getBlogPosts().find((post) => post.slug === slug);

  if (!post) {
    notFound();
  }

  const wordCount = post.content.split(/\s+/).length;
  const readingTime = Math.max(1, Math.ceil(wordCount / 200));

  const tags = post.metadata.tags
    ? post.metadata.tags.split(",").map((tag) => tag.trim())
    : [];

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
            dateModified: post.metadata.publishedAt,
            description: post.metadata.summary,
            image: post.metadata.image
              ? `${metaData.baseUrl}${post.metadata.image}`
              : `/og?title=${encodeURIComponent(post.metadata.title)}`,
            url: `${metaData.baseUrl}/blog/${post.slug}`,
            author: {
              "@type": "Person",
              name: metaData.name,
            },
          }),
        }}
      />
      
      <h1 className="title mb-3 font-medium text-2xl pt-10 tracking-tighter">
        {post.metadata.title}
      </h1>

      <div className="flex flex-wrap items-center gap-y-3 gap-x-3 mt-2 mb-8 text-sm text-neutral-600 dark:text-neutral-400">
        <div className="whitespace-nowrap">
          {formatDate(post.metadata.publishedAt)}
        </div>
        
        <span className="text-neutral-300 dark:text-neutral-700">•</span>
        
        <div className="flex items-center gap-2 whitespace-nowrap">
          <Image
            src="/author/profile.PNG" 
            alt="Ming Melvin Wang"
            width={24}
            height={24}
            className="rounded-full object-cover"
          />
          <span className="text-neutral-900 dark:text-neutral-100 font-medium">
            Ming Melvin Wang
          </span>
        </div>

        <span className="text-neutral-300 dark:text-neutral-700">•</span>

        <div className="whitespace-nowrap">
          {readingTime} min read
        </div>
      </div>

      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-8">
          {tags.map((tag) => (
            <span 
              key={tag} 
              className="text-sm font-medium bg-neutral-100 dark:bg-neutral-800 px-2.5 py-1 rounded text-neutral-600 dark:text-neutral-400 border border-neutral-200 dark:border-neutral-700"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      <article className="prose prose-quoteless prose-neutral dark:prose-invert">
        <CustomMDX source={post.content} />
      </article>
    </section>
  );
}