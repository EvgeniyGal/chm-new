import { site } from "@/lib/site";

export function SiteMap({ title, caption }: { title: string; caption: string }) {
  const { lat, lng } = site.map;
  const padLng = 0.004;
  const padLat = 0.0025;
  const src = `https://www.openstreetmap.org/export/embed.html?bbox=${lng - padLng}%2C${lat - padLat}%2C${lng + padLng}%2C${lat + padLat}&layer=mapnik&marker=${lat}%2C${lng}`;
  const openUrl = `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lng}#map=18/${lat}/${lng}`;

  return (
    <div className="overflow-hidden rounded-2xl border border-navy/10 shadow-[0_20px_50px_-30px_rgba(0,50,79,0.35)]">
      <iframe
        title={title}
        src={src}
        className="h-[380px] w-full border-0"
        loading="lazy"
      />
      <a
        href={openUrl}
        target="_blank"
        rel="noreferrer"
        className="block bg-cream px-4 py-3 text-center text-xs text-navy/70 transition hover:text-gold"
      >
        {caption}
      </a>
    </div>
  );
}
