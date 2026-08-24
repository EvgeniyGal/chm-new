import { defineRouting } from "next-intl/routing";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";

export const routing = defineRouting({
  locales: ["uk", "en"],
  defaultLocale: "uk",
  localePrefix: "always",
});

export type Locale = (typeof routing.locales)[number];

export function resolveLocale(locale: string): Locale {
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  return locale;
}
