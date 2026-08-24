import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/section-heading";
import { resolveLocale } from "@/i18n/routing";
import { buildPageMetadata } from "@/lib/seo";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale = resolveLocale(localeParam);
  const t = await getTranslations({ locale, namespace: "seo.about" });
  const siteName =
    locale === "en" ? "LLC Chornomormontazh" : "ТОВ «Чорномормонтаж»";

  return buildPageMetadata({
    locale,
    path: "/about",
    title: t("title"),
    description: t("description"),
    keywords: t.raw("keywords") as string[],
    image: "/images/about.jpg",
    siteName,
  });
}

export default async function AboutPage({ params }: Props) {
  const { locale: localeParam } = await params;
  const locale = resolveLocale(localeParam);
  setRequestLocale(locale);
  const t = await getTranslations("about");
  const tSeo = await getTranslations("seo.about");
  const capabilities = t.raw("capabilities") as string[];

  return (
    <>
      <PageHero
        image="/images/about.jpg"
        title={t("title")}
        subtitle={t("subtitle")}
        imageAlt={tSeo("imageAlt")}
      />

      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow={t("eyebrow")}
              title={t("heritageTitle")}
              description={t("heritage")}
            />
          </div>
          <div className="relative min-h-[360px] overflow-hidden rounded-2xl">
            <Image
              src="/images/about.jpg"
              alt={tSeo("imageAlt")}
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
          </div>
        </div>

        <div className="mt-24 rounded-2xl bg-navy px-8 py-12 text-cream sm:px-12">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-gold">
            {t("missionTitle")}
          </p>
          <p className="mt-4 max-w-3xl font-display text-3xl leading-snug">
            {t("mission")}
          </p>
        </div>

        <div className="mt-24">
          <SectionHeading title={t("valuesTitle")} />
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {(["precision", "continuity", "site"] as const).map((key) => (
              <div key={key} className="border-t border-gold pt-6">
                <h3 className="font-display text-2xl">{t(`values.${key}.title`)}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {t(`values.${key}.text`)}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-24">
          <SectionHeading title={t("capabilitiesTitle")} />
          <ul className="mt-10 grid gap-4 sm:grid-cols-2">
            {capabilities.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 rounded-xl bg-white px-5 py-4 text-sm shadow-sm"
              >
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
