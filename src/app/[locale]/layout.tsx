import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import { resolveLocale, routing } from "@/i18n/routing";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Toaster } from "@/components/ui/sonner";
import { organizationJsonLd, siteUrl } from "@/lib/seo";

const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600"],
  variable: "--font-manrope",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin", "cyrillic"],
  weight: ["500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale = resolveLocale(localeParam);
  const t = await getTranslations({ locale, namespace: "meta" });

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: t("title"),
      template:
        locale === "en"
          ? "%s · LLC Chornomormontazh"
          : "%s · ТОВ «Чорномормонтаж»",
    },
    description: t("description"),
    openGraph: {
      type: "website",
      siteName:
        locale === "en" ? "LLC Chornomormontazh" : "ТОВ «Чорномормонтаж»",
      locale: locale === "uk" ? "uk_UA" : "en_US",
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale: localeParam } = await params;
  const locale = resolveLocale(localeParam);

  setRequestLocale(locale);
  const messages = await getMessages();
  const jsonLd = organizationJsonLd(locale);

  return (
    <html
      lang={locale}
      data-scroll-behavior="smooth"
      className={`${manrope.variable} ${cormorant.variable} h-full`}
    >
      <body className="flex min-h-full flex-col bg-cream font-sans text-navy">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <NextIntlClientProvider messages={messages}>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <Toaster />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
