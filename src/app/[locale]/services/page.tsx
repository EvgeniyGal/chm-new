import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/section-heading";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { extraCapabilities, serviceDetails, services } from "@/content/services";
import { resolveLocale } from "@/i18n/routing";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function ServicesPage({ params }: Props) {
  const { locale: localeParam } = await params;
  const locale = resolveLocale(localeParam);
  setRequestLocale(locale);
  const t = await getTranslations("services");
  const loc = locale;

  return (
    <>
      <PageHero
        image="/images/services/construction.jpg"
        title={t("title")}
        subtitle={t("subtitle")}
      />

      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow={t("overviewEyebrow")}
          title={t("overviewTitle")}
          description={t("overview")}
        />

        <div className="mt-16 space-y-20">
          {services.map((service, index) => {
            const detail = serviceDetails[service.id];
            const reverse = index % 2 === 1;
            return (
              <article
                key={service.id}
                className="grid items-center gap-10 lg:grid-cols-2"
              >
                <div
                  className={`relative min-h-[320px] overflow-hidden rounded-2xl ${reverse ? "lg:order-2" : ""}`}
                >
                  <Image
                    src={service.image}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 50vw, 100vw"
                  />
                </div>
                <div className={reverse ? "lg:order-1" : ""}>
                  <h2 className="font-display text-3xl text-navy sm:text-4xl">
                    {detail.title[loc]}
                  </h2>
                  <div className="gold-rule mt-4" />
                  <p className="mt-5 text-base leading-relaxed text-muted-foreground">
                    {detail.intro[loc]}
                  </p>
                  <ul className="mt-6 space-y-4">
                    {detail.items.map((item) => (
                      <li key={item.title[loc]}>
                        <p className="text-sm font-semibold text-navy">
                          {item.title[loc]}
                        </p>
                        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                          {item.text[loc]}
                        </p>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-6 text-sm leading-relaxed text-navy/80">
                    {detail.closing[loc]}
                  </p>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-24">
          <SectionHeading title={t("moreTitle")} />
          <Accordion type="single" collapsible className="mt-8">
            {extraCapabilities[loc].map((item) => (
              <AccordionItem key={item.title} value={item.title}>
                <AccordionTrigger>{item.title}</AccordionTrigger>
                <AccordionContent>{item.text}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </>
  );
}
