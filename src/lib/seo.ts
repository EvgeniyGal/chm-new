import type { Metadata } from "next";
import type { Locale } from "@/i18n/routing";
import { site } from "@/lib/site";

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://chm.in.ua";

export type SeoPageKey =
  | "home"
  | "about"
  | "services"
  | "portfolio"
  | "contacts";

/** Locale-prefixed path without trailing slash, except home → `/uk` or `/en`. */
export function localePath(locale: Locale, path: string): string {
  const normalized = path === "/" ? "" : path.replace(/\/$/, "");
  return `/${locale}${normalized}`;
}

export function absoluteUrl(locale: Locale, path: string): string {
  return `${siteUrl}${localePath(locale, path)}`;
}

type BuildPageMetadataInput = {
  locale: Locale;
  path: string;
  title: string;
  description: string;
  keywords: string[];
  image: string;
  siteName: string;
};

export function buildPageMetadata({
  locale,
  path,
  title,
  description,
  keywords,
  image,
  siteName,
}: BuildPageMetadataInput): Metadata {
  const canonical = localePath(locale, path);
  const url = absoluteUrl(locale, path);
  const imageUrl = image.startsWith("http") ? image : `${siteUrl}${image}`;
  const languages: Record<string, string> = {
    uk: localePath("uk", path),
    en: localePath("en", path),
    "x-default": localePath("uk", path),
  };

  return {
    // Home already includes the brand in the title — skip the layout template.
    title: path === "/" ? { absolute: title } : title,
    description,
    keywords,
    alternates: {
      canonical,
      languages,
    },
    openGraph: {
      title,
      description,
      url,
      siteName,
      locale: locale === "uk" ? "uk_UA" : "en_US",
      type: "website",
      images: [
        {
          url: imageUrl,
          width: 1600,
          height: 1200,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}

export function organizationJsonLd(locale: Locale) {
  const name = locale === "en" ? site.nameEn : site.nameUk;
  const address =
    locale === "en" ? site.addressEn : site.addressUk;

  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "LocalBusiness"],
    name,
    url: siteUrl,
    email: site.email,
    telephone: site.phoneHref.replace("tel:", ""),
    foundingDate: String(site.founded),
    address: {
      "@type": "PostalAddress",
      streetAddress: locale === "en" ? "98 Mechnikova St" : "вул. Мечнікова, 98",
      addressLocality: locale === "en" ? "Odesa" : "Одеса",
      postalCode: "65007",
      addressCountry: "UA",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: site.map.lat,
      longitude: site.map.lng,
    },
    description: address,
  };
}
