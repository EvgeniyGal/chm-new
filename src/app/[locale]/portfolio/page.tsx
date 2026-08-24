import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/section-heading";
import { portfolio } from "@/content/portfolio";
import { resolveLocale } from "@/i18n/routing";
import { buildPageMetadata } from "@/lib/seo";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale = resolveLocale(localeParam);
  const t = await getTranslations({ locale, namespace: "seo.portfolio" });
  const siteName =
    locale === "en" ? "LLC Chornomormontazh" : "ТОВ «Чорномормонтаж»";

  return buildPageMetadata({
    locale,
    path: "/portfolio",
    title: t("title"),
    description: t("description"),
    keywords: t.raw("keywords") as string[],
    image: "/images/portfolio-hero.jpg",
    siteName,
  });
}

export default async function PortfolioPage({ params }: Props) {
  const { locale: localeParam } = await params;
  const locale = resolveLocale(localeParam);
  setRequestLocale(locale);
  const t = await getTranslations("portfolio");
  const tSeo = await getTranslations("seo.portfolio");
  const loc = locale;

  return (
    <>
      <PageHero
        image="/images/portfolio-hero.jpg"
        title={t("title")}
        subtitle={t("subtitle")}
        imageAlt={tSeo("imageAlt")}
      />
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <SectionHeading description={t("overview")} title={t("title")} />
        <div className="mt-16 space-y-16">
          {portfolio.map((project, index) => (
            <article
              key={project.id}
              className="grid overflow-hidden rounded-2xl border border-navy/10 bg-white lg:grid-cols-2"
            >
              <div
                className={`relative min-h-[280px] ${index % 2 === 1 ? "lg:order-2" : ""}`}
              >
                <Image
                  src={project.image}
                  alt={project.name[loc]}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 50vw, 100vw"
                />
              </div>
              <div className="flex flex-col justify-center p-8 sm:p-12">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h2 className="mt-3 font-display text-3xl text-navy">
                  {project.name[loc]}
                </h2>
                <ul className="mt-6 space-y-4">
                  {project.details.map((detail) => (
                    <li key={detail[loc]} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                      {detail[loc]}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
