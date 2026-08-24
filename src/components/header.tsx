"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Menu } from "lucide-react";
import { Link, usePathname } from "@/i18n/navigation";
import { navItems } from "@/lib/site";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/logo";
import { LanguageSwitcher } from "@/components/language-switcher";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export function Header() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-navy-dark/85 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3 text-cream">
          <Logo size={46} />
          <span className="hidden font-display text-lg leading-tight sm:block">
            {t("brand")}
          </span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-sm font-medium tracking-wide transition-colors",
                isActive(item.href)
                  ? "text-gold"
                  : "text-cream/75 hover:text-gold",
              )}
            >
              {t(item.key)}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <LanguageSwitcher className="hidden sm:flex" />
          <Button asChild size="sm" className="hidden md:inline-flex">
            <Link href="/contacts">{t("cta")}</Link>
          </Button>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden text-cream">
                <Menu />
                <span className="sr-only">{t("menu")}</span>
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle className="flex items-center gap-3">
                  <Logo size={40} />
                  {t("brand")}
                </SheetTitle>
              </SheetHeader>
              <nav className="mt-10 flex flex-col gap-5">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "font-display text-2xl",
                      isActive(item.href) ? "text-gold" : "text-cream/80",
                    )}
                  >
                    {t(item.key)}
                  </Link>
                ))}
              </nav>
              <div className="mt-10 flex flex-col gap-4">
                <LanguageSwitcher />
                <Button asChild>
                  <Link href="/contacts" onClick={() => setOpen(false)}>
                    {t("cta")}
                  </Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
