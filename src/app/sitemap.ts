import type { MetadataRoute } from "next";

const SITE_URL = "https://ismaelsilva.org";

export default function sitemap(): MetadataRoute.Sitemap {
  const chapters = (base: string) =>
    Array.from({ length: 22 }, (_, i) => ({
      url: `${SITE_URL}/venibible/${base}/${i + 1}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    }));

  return [
    {
      url: `${SITE_URL}/venibible`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/venibible/apocalipse`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/venibible/revelation`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.9,
    },
    ...chapters("apocalipse"),
    ...chapters("revelation"),
  ];
}
