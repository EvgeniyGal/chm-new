import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-gold">404</p>
      <h1 className="mt-4 font-display text-4xl text-navy">Сторінку не знайдено</h1>
      <p className="mt-3 max-w-md text-muted-foreground">
        Перевірте адресу або поверніться на головну.
      </p>
      <Button asChild className="mt-8">
        <Link href="/">На головну</Link>
      </Button>
    </div>
  );
}
