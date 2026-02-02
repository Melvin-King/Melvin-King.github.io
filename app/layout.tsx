import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Navbar } from "./components/nav";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Footer from "./components/footer";
import { ThemeProvider } from "./components/theme-switch";
import FloatingDialog from "./components/floating-dialog";
import { metaData } from "./lib/config";
import { getBlogPosts } from "app/lib/posts";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(metaData.baseUrl),
  title: {
    default: metaData.title,
    template: `%s | ${metaData.title}`,
  },
  description: metaData.description,
  openGraph: {
    images: metaData.ogImage,
    title: metaData.title,
    description: metaData.description,
    url: metaData.baseUrl,
    siteName: metaData.name,
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    title: metaData.name,
    card: "summary_large_image",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.ico", type: "image/x-icon" },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const allPosts = getBlogPosts().map(post => ({
    slug: post.slug,
    content: post.content,
    metadata: post.metadata
  }));

  return (
    <html lang="en" className="__className_ece556">
      <body className="antialiased flex flex-col items-center justify-center w-full mb-12">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <main className="flex-auto min-w-0 flex flex-col w-full transition-colors duration-300">
            <Navbar allPosts={allPosts} />
            <div className="mt-0 mb-2 w-full">
              {children}
            </div>
            <div className="border-t border-gray-200 dark:border-gray-700 mt-6 mb-4 max-w-6xl w-full mx-auto px-[60px]" />
            <div className="max-w-6xl w-full mx-auto px-[60px]">
              <Footer />
            </div>
            <FloatingDialog />
            <Analytics />
            <SpeedInsights />
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
