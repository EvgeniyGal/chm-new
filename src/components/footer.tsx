import { getTranslations } from "next-intl/server";
import { Mail, MapPin, Phone } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { navItems, site } from "@/lib/site";
import { Logo } from "@/components/logo";

export async function Footer() {
  const t = await getTranslations();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-navy-dark text-cream">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-4 lg:px-8">
        <div className="lg:col-span-2">
          <Link href="/" className="inline-flex items-center gap-3 text-cream">
            <Logo size={52} />
            <span className="font-display text-2xl">{t("nav.brand")}</span>
          </Link>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-cream/70">
            {t("footer.blurb")}
          </p>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold">
            {t("footer.navTitle")}
          </p>
          <ul className="mt-5 space-y-3 text-sm text-cream/75">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="transition hover:text-gold">
                  {t(`nav.${item.key}`)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold">
            {t("footer.contactsTitle")}
          </p>
          <ul className="mt-5 space-y-4 text-sm text-cream/75">
            <li className="flex gap-3">
              <MapPin className="mt-0.5 h-4 w-4 text-gold" />
              {t("contacts.address")}
            </li>
            <li className="flex gap-3">
              <Phone className="mt-0.5 h-4 w-4 text-gold" />
              <a href={site.phoneHref} className="hover:text-gold">
                {site.phone}
              </a>
            </li>
            <li className="flex gap-3">
              <Mail className="mt-0.5 h-4 w-4 text-gold" />
              <a href={`mailto:${site.email}`} className="hover:text-gold">
                {site.email}
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-6 text-center text-xs tracking-wide text-cream/50">
        {t("footer.copyright", { year })}
      </div>
    </footer>
  );
}
