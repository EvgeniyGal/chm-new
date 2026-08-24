import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations, setRequestLocale } from "next-intl/server";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import { resolveLocale, routing } from "@/i18n/routing";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { Toaster } from "@/components/ui/sonner";

const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
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
  const languages = {
    uk: "/uk",
    en: "/en",
  };

  return {
    title: {
      default: t("title"),
      template:
        locale === "en"
          ? "%s · LLC Chornomormontazh"
          : "%s · ТОВ «Чорномормонтаж»",
    },
    description: t("description"),
    alternates: {
      canonical: `/${locale}`,
      languages,
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale: localeParam } = await params;
  const locale = resolveLocale(localeParam);

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      data-scroll-behavior="smooth"
      className={`${manrope.variable} ${cormorant.variable} h-full`}
    >
      <body className="flex min-h-full flex-col bg-cream font-sans text-navy">
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
