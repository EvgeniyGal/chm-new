"use client";

import type { ReactNode } from "react";
import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import type { Locale } from "@/i18n/routing";

function UaFlag() {
  return (
    <svg viewBox="0 0 36 24" className="h-3.5 w-5 rounded-[2px] shadow-sm" aria-hidden>
      <rect width="36" height="12" fill="#005BBB" />
      <rect y="12" width="36" height="12" fill="#FFD500" />
    </svg>
  );
}

function GbFlag() {
  return (
    <svg viewBox="0 0 36 24" className="h-3.5 w-5 rounded-[2px] shadow-sm" aria-hidden>
      <rect width="36" height="24" fill="#012169" />
      <path d="M0 0 L36 24 M36 0 L0 24" stroke="#fff" strokeWidth="5" />
      <path d="M0 0 L36 24 M36 0 L0 24" stroke="#C8102E" strokeWidth="3" />
      <path d="M18 0 V24 M0 12 H36" stroke="#fff" strokeWidth="8" />
      <path d="M18 0 V24 M0 12 H36" stroke="#C8102E" strokeWidth="5" />
    </svg>
  );
}

const locales: { code: Locale; label: string; Flag: () => ReactNode }[] = [
  { code: "uk", label: "UA", Flag: UaFlag },
  { code: "en", label: "EN", Flag: GbFlag },
];

export function LanguageSwitcher({ className }: { className?: string }) {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className={cn("flex items-center gap-1", className)} role="group" aria-label="Language">
      {locales.map(({ code, label, Flag }) => {
        const active = locale === code;
        return (
          <button
            key={code}
            type="button"
            onClick={() => router.replace(pathname, { locale: code })}
            aria-current={active ? "true" : undefined}
            aria-label={code === "uk" ? "Українська" : "English"}
            className={cn(
              "flex cursor-pointer items-center gap-1.5 rounded-full border px-2.5 py-1.5 text-[11px] font-semibold tracking-wider transition-all",
              active
                ? "border-gold bg-gold/15 text-gold"
                : "border-white/15 text-cream/70 hover:border-gold/50 hover:text-gold",
            )}
          >
            <Flag />
            {label}
          </button>
        );
      })}
    </div>
  );
}
