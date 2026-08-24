import Image from "next/image";

export function PageHero({
  image,
  title,
  subtitle,
}: {
  image: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <section className="relative isolate flex min-h-[46vh] items-end overflow-hidden">
      <Image
        src={image}
        alt=""
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-navy-dark via-navy-dark/70 to-navy/20" />
      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 pb-16 pt-32 sm:px-6 lg:px-8">
        <div className="gold-rule mb-6" />
        <h1 className="max-w-3xl font-display text-4xl font-semibold text-cream sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        {subtitle ? (
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-cream/75 sm:text-lg">
            {subtitle}
          </p>
        ) : null}
      </div>
    </section>
  );
}
