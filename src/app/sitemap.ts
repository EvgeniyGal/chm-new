import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { absoluteUrl, localePath, siteUrl } from "@/lib/seo";

const paths = ["/", "/about", "/services", "/portfolio", "/contacts"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return paths.flatMap((path) =>
    routing.locales.map((locale) => ({
      url: absoluteUrl(locale, path),
      lastModified: now,
      changeFrequency: path === "/" ? ("weekly" as const) : ("monthly" as const),
      priority: path === "/" ? 1 : 0.8,
      alternates: {
        languages: Object.fromEntries(
          routing.locales.map((lang) => [
            lang,
            `${siteUrl}${localePath(lang, path)}`,
          ]),
        ),
      },
    })),
  );
}
