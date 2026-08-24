export const site = {
  nameUk: "ТОВ «Чорномормонтаж»",
  nameEn: "LLC Chornomormontazh",
  email: "office@chm.in.ua",
  phone: "+380 (482) 34-60-65",
  phoneHref: "tel:+380482346065",
  founded: 1997,
  addressUk: "65007, м. Одеса, вул. Мечнікова, 98",
  addressEn: "65007, Odesa, 98 Mechnikova St",
  map: {
    // OSM building: 98 Mechnykova Street, 65007 Odesa
    lat: 46.4716119,
    lng: 30.7264505,
  },
} as const;

export const navItems = [
  { href: "/", key: "home" },
  { href: "/about", key: "about" },
  { href: "/services", key: "services" },
  { href: "/portfolio", key: "portfolio" },
  { href: "/contacts", key: "contacts" },
] as const;
