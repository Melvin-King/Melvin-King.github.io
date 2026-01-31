import { metaData } from "./lib/config";
export const dynamic = "force-static";

export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
      },
    ],
    sitemap: `${metaData.baseUrl}/sitemap.xml`,
  };
}
