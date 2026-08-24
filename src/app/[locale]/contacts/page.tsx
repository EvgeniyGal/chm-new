import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Mail, MapPin, Phone } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { ContactForm } from "@/components/contact-form";
import { SiteMap } from "@/components/site-map";
import { site } from "@/lib/site";
import { resolveLocale } from "@/i18n/routing";
import { buildPageMetadata } from "@/lib/seo";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale = resolveLocale(localeParam);
  const t = await getTranslations({ locale, namespace: "seo.contacts" });
  const siteName =
    locale === "en" ? "LLC Chornomormontazh" : "ТОВ «Чорномормонтаж»";

  return buildPageMetadata({
    locale,
    path: "/contacts",
    title: t("title"),
    description: t("description"),
    keywords: t.raw("keywords") as string[],
    image: "/images/contacts.jpg",
    siteName,
  });
}

export default async function ContactsPage({ params }: Props) {
  const { locale: localeParam } = await params;
  const locale = resolveLocale(localeParam);
  setRequestLocale(locale);
  const t = await getTranslations("contacts");
  const tSeo = await getTranslations("seo.contacts");

  return (
    <>
      <PageHero
        image="/images/contacts.jpg"
        title={t("title")}
        subtitle={t("subtitle")}
        imageAlt={tSeo("imageAlt")}
      />
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-sm leading-relaxed text-muted-foreground">{t("intro")}</p>
            <ul className="mt-8 space-y-5 text-sm">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 h-5 w-5 text-gold" />
                <span>{t("address")}</span>
              </li>
              <li className="flex gap-3">
                <Phone className="mt-0.5 h-5 w-5 text-gold" />
                <a href={site.phoneHref} className="hover:text-gold">
                  {site.phone}
                </a>
              </li>
              <li className="flex gap-3">
                <Mail className="mt-0.5 h-5 w-5 text-gold" />
                <a href={`mailto:${site.email}`} className="hover:text-gold">
                  {site.email}
                </a>
              </li>
            </ul>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-[0_20px_50px_-30px_rgba(0,50,79,0.35)] sm:p-8">
            <h2 className="font-display text-3xl">{t("formTitle")}</h2>
            <p className="mt-2 mb-8 text-sm text-muted-foreground">{t("formLead")}</p>
            <ContactForm />
          </div>
        </div>

        <div className="mt-16">
          <h2 className="mb-6 font-display text-3xl">{t("map")}</h2>
          <SiteMap title={t("map")} caption={t("address")} />
        </div>
      </section>
    </>
  );
}
