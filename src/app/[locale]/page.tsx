import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowRight, Award, Landmark, Microscope } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/section-heading";
import { services } from "@/content/services";
import { portfolio } from "@/content/portfolio";
import { resolveLocale } from "@/i18n/routing";
import { buildPageMetadata } from "@/lib/seo";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale = resolveLocale(localeParam);
  const t = await getTranslations({ locale, namespace: "seo.home" });
  const siteName =
    locale === "en" ? "LLC Chornomormontazh" : "ТОВ «Чорномормонтаж»";

  return buildPageMetadata({
    locale,
    path: "/",
    title: t("title"),
    description: t("description"),
    keywords: t.raw("keywords") as string[],
    image: "/images/hero.jpg",
    siteName,
  });
}

export default async function HomePage({ params }: Props) {
  const { locale: localeParam } = await params;
  const locale = resolveLocale(localeParam);
  setRequestLocale(locale);
  const t = await getTranslations();
  const tSeo = await getTranslations("seo");
  const loc = locale;
  const serviceAlts = tSeo.raw("services.serviceAlts") as Record<string, string>;

  const why = [
    {
      icon: Landmark,
      title: t("home.why.experience"),
      text: t("home.why.experienceDesc"),
    },
    {
      icon: Microscope,
      title: t("home.why.quality"),
      text: t("home.why.qualityDesc"),
    },
    {
      icon: Award,
      title: t("home.why.team"),
      text: t("home.why.teamDesc"),
    },
  ];

  return (
    <>
      <section className="relative isolate min-h-[88vh] overflow-hidden">
        <Image
          src="/images/hero.jpg"
          alt={tSeo("home.imageAlt")}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-dark via-navy-dark/80 to-navy/30" />
        <div className="relative z-10 mx-auto flex min-h-[88vh] max-w-7xl flex-col justify-end px-4 pb-20 pt-32 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-gold">
            {t("home.eyebrow")}
          </p>
          <h1 className="mt-5 max-w-3xl font-display text-5xl font-semibold leading-[1.05] text-cream sm:text-6xl lg:text-7xl">
            {t("home.heroTitle")}
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-cream/80 sm:text-lg">
            {t("home.heroSubtitle")}
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Button asChild size="lg">
              <Link href="/services">{t("home.ctaServices")}</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/contacts">{t("home.ctaContact")}</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="bg-navy text-cream">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
          {[
            ["1997", t("home.stats.year")],
            [t("home.stats.cityValue"), t("home.stats.city")],
            [t("home.stats.cycleValue"), t("home.stats.cycle")],
            [t("home.stats.labValue"), t("home.stats.lab")],
          ].map(([value, label]) => (
            <div key={label} className="border-l border-gold/40 pl-5">
              <p className="font-display text-2xl text-gold sm:text-3xl">{value}</p>
              <p className="mt-1 text-xs uppercase tracking-[0.18em] text-cream/60">
                {label}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={t("home.servicesEyebrow")}
          title={t("home.servicesTitle")}
          description={t("home.servicesLead")}
        />
        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {services.map((service) => (
            <Link
              key={service.id}
              href="/services"
              className="group relative isolate min-h-[280px] overflow-hidden rounded-2xl"
            >
              <Image
                src={service.image}
                alt={serviceAlts[service.id] ?? t(`home.services.${service.homeKey}`)}
                fill
                className="object-cover transition duration-700 group-hover:scale-105"
                sizes="(min-width: 768px) 50vw, 100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-dark via-navy/50 to-transparent" />
              <div className="relative z-10 flex h-full min-h-[280px] flex-col justify-end p-8">
                <h3 className="font-display text-3xl text-cream">
                  {t(`home.services.${service.homeKey}`)}
                </h3>
                <span className="mt-3 inline-flex items-center gap-2 text-sm text-gold">
                  {t("nav.services")}
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-navy-dark py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            light
            eyebrow={t("home.whyEyebrow")}
            title={t("home.whyTitle")}
          />
          <div className="mt-14 grid gap-8 lg:grid-cols-3">
            {why.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-white/10 bg-white/5 p-8"
              >
                <item.icon className="h-8 w-8 text-gold" />
                <h3 className="mt-6 font-display text-2xl text-cream">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-cream/70">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={t("home.clientsEyebrow")}
          title={t("home.clientsTitle")}
        />
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {portfolio.map((item) => (
            <Link
              key={item.id}
              href="/portfolio"
              className="group overflow-hidden rounded-2xl border border-navy/10 bg-white"
            >
              <div className="relative h-40">
                <Image
                  src={item.image}
                  alt={item.name[loc]}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                  sizes="(min-width: 1024px) 25vw, 50vw"
                />
              </div>
              <div className="p-5">
                <p className="font-display text-lg text-navy">{item.name[loc]}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="relative isolate overflow-hidden py-24">
        <Image src="/images/texture.jpg" alt="" fill className="object-cover opacity-40" />
        <div className="absolute inset-0 bg-navy/90" />
        <div className="relative z-10 mx-auto max-w-3xl px-4 text-center sm:px-6">
          <h2 className="font-display text-4xl text-cream sm:text-5xl">
            {t("home.ctaBandTitle")}
          </h2>
          <p className="mt-5 text-cream/75">{t("home.ctaBandText")}</p>
          <Button asChild size="lg" className="mt-8">
            <Link href="/contacts">{t("home.ctaBandButton")}</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
