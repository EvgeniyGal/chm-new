import type { Locale } from "@/i18n/routing";

export const portfolio = [
  {
    id: "exim",
    image: "/images/portfolio/exim.jpg",
    name: {
      uk: "ПАТ «Ексімнафтопродукт»",
      en: "PJSC Eximnaftoprodukt",
    },
    details: [
      {
        uk: "Модернізація та ремонт котлів DE 25/14, HOLMAN, ДКВр 6.5/13 і DE 10/14.",
        en: "Modernization and repair of DE 25/14, HOLMAN, DKVR 6.5/13, and DE 10/14 boilers.",
      },
      {
        uk: "Руйнівний і неруйнівний контроль зварних з’єднань під час ремонту та монтажу нового обладнання.",
        en: "Destructive and non-destructive testing of welds during repair and installation of new equipment.",
      },
      {
        uk: "Експертна оцінка котлів, резервуарів, трубопроводів та іншого обладнання.",
        en: "Expert assessment of boilers, tanks, pipelines, and related equipment.",
      },
    ],
  },
  {
    id: "port",
    image: "/images/portfolio/port.jpg",
    name: {
      uk: "ДП «Морський торговельний порт Южний»",
      en: "SE Sea Commercial Port Yuzhny",
    },
    details: [
      {
        uk: "Проєкт і ремонт котла ДЕ 25/14: конвективна частина та обмурівка.",
        en: "Design and repair of the DE 25/14 boiler: convective section and lining.",
      },
      {
        uk: "Обстеження металоконструкцій вагоноперекидача та цеху.",
        en: "Inspection of wagon-tippler and workshop steel structures.",
      },
      {
        uk: "Оцінка стану резервуарів на відповідність нормам.",
        en: "Condition assessment of tanks for code compliance.",
      },
    ],
  },
  {
    id: "stikon",
    image: "/images/portfolio/stikon.jpg",
    name: {
      uk: "ТОВ «Стікон»",
      en: "LLC Stikon",
    },
    details: [
      {
        uk: "Контроль зварних з’єднань і основного металу під час монтажу технологічного обладнання.",
        en: "Testing of welds and base metal during installation of process equipment.",
      },
      {
        uk: "Комплексний ремонт баштового крана КБ-403.",
        en: "Complete repair of a KB-403 tower crane.",
      },
      {
        uk: "Експертиза вантажопідіймальних машин і атестація зварювальників.",
        en: "Expert examination of lifting machinery and welder certification.",
      },
    ],
  },
  {
    id: "vest",
    image: "/images/portfolio/vest.jpg",
    name: {
      uk: "КФ «ВеСТТ»",
      en: "KF VestT",
    },
    details: [
      {
        uk: "Руйнівний і неруйнівний контроль під час монтажу обладнання.",
        en: "Destructive and non-destructive testing during equipment installation.",
      },
      {
        uk: "Технічна експертиза та ремонт вантажопідіймальних кранів.",
        en: "Technical expertise and repair of lifting cranes.",
      },
      {
        uk: "Сертифікація зварювальників за галузевими стандартами.",
        en: "Welder certification to industry standards.",
      },
    ],
  },
] satisfies {
  id: string;
  image: string;
  name: Record<Locale, string>;
  details: Record<Locale, string>[];
}[];
