import { useState, useMemo } from "react";
import Link from "next/link";
import { formatDate, getBlogPosts } from "app/lib/posts";
import Carousel from "app/components/Carousel";

export const metadata = {
  title: "Blog",
  description: "Researchfolio Blog",
};

export default function BlogPosts() {
  const BlogBlocks = [
    {
      image: "/ieee-tem/featured.jpg",
      title: "My first 1st-authored paper accepted!",
      link: "/blog/ieee-tem"
    },
    {
      image: "/graduation/featured.jpg",
      title: "Just graduated from PolyU with a Bachelor's degree in Computer Science!",
      link: "/blog/graduation"
    },
    {
      image: "/pittsburgh/featured.jpg",
      title: "Conference travel at Pittsburgh, Penn",
      link: "/blog/pittsburgh"
    },
    {
      image: "/aws/featured.jpg",
      title: "Milestone achieved as an Amazon Web Services (AWS) student ambassador",
      link: "/blog/aws"
    }
  ];
  let allBlogs = getBlogPosts();

  return (
    <section className="mx-auto mt-6 max-w-6xl px-6 md:px-[50px] pb-24">
      <div className="mb-6">
        <h2 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
          Pinned Blogs
        </h2>
        <div className="h-1 w-12 bg-[#41e0e2] mt-2"></div>
      </div>
      <div className="text-sm mb-4">
        Sharing highlights of my research, work and life.
      </div>

      <Carousel blocks={BlogBlocks} />
      <div className="mb-6">
        <h2 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
          All Blogs
        </h2>
        <div className="h-1 w-12 bg-[#41e0e2] mt-2"></div>
      </div>
      <div>
        {allBlogs
          .sort((a, b) => {
            if (
              new Date(a.metadata.publishedAt) >
              new Date(b.metadata.publishedAt)
            ) {
              return -1;
            }
            return 1;
          })
          .map((post) => (
            <Link
              key={post.slug}
              className="flex flex-col space-y-1 mb-5 transition-opacity duration-200 hover:opacity-80"
              href={`/blog/${post.slug}`}
            >
              <div className="w-full flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-1 sm:space-y-0 sm:space-x-2">
                <h2 className="text-black dark:text-white">
                  {post.metadata.title}
                </h2>
                <p className="text-neutral-600 dark:text-neutral-400 tabular-nums text-sm">
                  {formatDate(post.metadata.publishedAt, false)}
                </p>
              </div>
            </Link>
          ))}
      </div>
    </section>
  );
}
