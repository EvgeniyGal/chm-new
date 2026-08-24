import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  light = false,
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  light?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("max-w-3xl", className)}>
      {eyebrow ? (
        <p
          className={cn(
            "mb-3 text-xs font-semibold uppercase tracking-[0.28em]",
            light ? "text-gold" : "text-gold",
          )}
        >
          {eyebrow}
        </p>
      ) : null}
      <h2
        className={cn(
          "font-display text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl",
          light ? "text-cream" : "text-navy",
        )}
      >
        {title}
      </h2>
      <div className={cn("mt-5", light ? "gold-rule" : "gold-rule")} />
      {description ? (
        <p
          className={cn(
            "mt-6 text-base leading-relaxed sm:text-lg",
            light ? "text-cream/75" : "text-muted-foreground",
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
