import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://kgraphics-portfolio.vercel.app"; // swap for the real production domain

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/admin",
        "/dashboard",
        "/designs",
        "/user-reviews",
        "/brand-story",
      ],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
