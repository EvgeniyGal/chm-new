import type { Locale } from "@/i18n/routing";

export const services = [
  {
    id: "design",
    image: "/images/services/design.jpg",
    homeKey: "design",
  },
  {
    id: "construction",
    image: "/images/services/construction.jpg",
    homeKey: "construction",
  },
  {
    id: "repair",
    image: "/images/services/repair.jpg",
    homeKey: "repair",
  },
  {
    id: "lab",
    image: "/images/services/lab.jpg",
    homeKey: "lab",
  },
] as const;

export const serviceDetails: Record<
  string,
  {
    title: Record<Locale, string>;
    intro: Record<Locale, string>;
    items: { title: Record<Locale, string>; text: Record<Locale, string> }[];
    closing: Record<Locale, string>;
  }
> = {
  design: {
    title: {
      uk: "Проєктні роботи та розробка документації",
      en: "Design and documentation",
    },
    intro: {
      uk: "Від архітектурної концепції до робочого проєкту будівель і споруд будь-якого призначення. На основі технічного завдання готуємо комерційну пропозицію зі строками та вартістю.",
      en: "From architectural concept to working documentation for buildings and facilities of any purpose. Based on your brief, we prepare a commercial proposal with scope, timeline, and cost.",
    },
    items: [
      {
        title: { uk: "Архітектурне та будівельне проєктування", en: "Architectural and construction design" },
        text: { uk: "Естетично вивірені та конструктивно надійні рішення під ваші задачі.", en: "Aesthetically considered and structurally sound solutions for your brief." },
      },
      {
        title: { uk: "Несучі конструкції", en: "Load-bearing structures" },
        text: { uk: "Розрахунки та проєкти, що забезпечують стабільність і безпеку споруд.", en: "Calculations and drawings that secure the stability and safety of the facility." },
      },
      {
        title: { uk: "Внутрішні інженерні мережі", en: "Internal engineering networks" },
        text: { uk: "Водопостачання, каналізація, ОВК, холодопостачання, газ, електропостачання, освітлення, автоматизація, КВП, охоронно-пожежна сигналізація та відеоспостереження.", en: "Water, sewerage, HVAC, refrigeration, gas, power, lighting, automation, instrumentation, fire/security alarms, and CCTV." },
      },
      {
        title: { uk: "Зовнішні мережі та споруди", en: "External networks and utilities" },
        text: { uk: "Водопостачання, каналізація, теплові мережі, газопостачання та супутня інфраструктура.", en: "Water, sewerage, heating networks, gas supply, and related infrastructure." },
      },
      {
        title: { uk: "Технологічне проєктування", en: "Process design" },
        text: { uk: "Котельні, компресорні станції, технологічні трубопроводи, нафто- та газопроводи.", en: "Boiler plants, compressor stations, process piping, oil and gas pipelines." },
      },
    ],
    closing: {
      uk: "Супроводжуємо проєкт від першої концепції до реалізації, узгоджуючи рішення з цілями замовника та галузевими нормами.",
      en: "We stay with the project from first concept to delivery, aligning every decision with the client’s goals and industry codes.",
    },
  },
  construction: {
    title: {
      uk: "Будівельно-монтажні роботи",
      en: "Construction and installation",
    },
    intro: {
      uk: "Будівництво, монтаж, реконструкція та пусконалагодження на об’єктах цивільного й промислового призначення.",
      en: "Construction, installation, reconstruction, and commissioning of civil and industrial facilities.",
    },
    items: [
      {
        title: { uk: "Металоконструкції", en: "Steel structures" },
        text: { uk: "Каркаси будівель і споруд під різні навантаження та режими експлуатації.", en: "Building and facility frames designed for the required loads and operating regimes." },
      },
      {
        title: { uk: "Котельні та компресорні", en: "Boiler and compressor plants" },
        text: { uk: "Комплексні рішення з монтажу, обв’язки та введення в експлуатацію.", en: "Complete installation, piping, and commissioning packages." },
      },
      {
        title: { uk: "Вантажопідйомне обладнання", en: "Lifting equipment" },
        text: { uk: "Монтаж і обслуговування кранів та підйомних механізмів.", en: "Installation and maintenance of cranes and hoisting machinery." },
      },
      {
        title: { uk: "Трубопроводи та інженерні системи", en: "Pipelines and building services" },
        text: { uk: "Технологічні, газові, водопровідні мережі, ОВК, електропостачання, автоматизація, КВП, сигналізація.", en: "Process, gas and water networks, HVAC, power, automation, instrumentation, and alarm systems." },
      },
    ],
    closing: {
      uk: "Результат — спільна робота проєктантів, кошторисників, виконробів, інженерів і кваліфікованих робітників. Для наших спеціалістів немає нерозв’язних задач.",
      en: "Delivery is a joint effort of designers, estimators, site managers, engineers, and skilled trades. For our specialists, there are no unsolvable tasks.",
    },
  },
  repair: {
    title: {
      uk: "Ремонтні роботи на об’єкті замовника",
      en: "On-site repair",
    },
    intro: {
      uk: "Капітальний і поточний ремонт технологічного обладнання, металоконструкцій і споруд безпосередньо на майданчику — без демонтажу та транспортування до цеху. Працюємо з вітчизняним і імпортним обладнанням, зокрема зі знятим з виробництва.",
      en: "Major and current repairs of process equipment, steel structures, and facilities are performed on site — without dismantling or shipping to a workshop. We service domestic and imported equipment, including models no longer in production.",
    },
    items: [
      {
        title: { uk: "Діагностика та профілактика", en: "Diagnostics and preventive work" },
        text: { uk: "Виявлення несправностей на місці, щоб скоротити простої.", en: "On-site fault finding to reduce downtime." },
      },
      {
        title: { uk: "Гарантія на вузли та роботи", en: "Warranty on parts and work" },
        text: { uk: "На виконані роботи, замінені вузли та деталі надається гарантія.", en: "Completed work, replaced units, and parts are covered by warranty." },
      },
      {
        title: { uk: "Експертиза доцільності ремонту", en: "Repair vs replacement expertise" },
        text: { uk: "Якщо ремонт економічно недоцільний, допоможемо зі списанням і актом технічної експертизи, а також оцінимо можливість модернізації чи автоматизації.", en: "If repair is uneconomical, we assist with write-off and a technical expert report, and can assess reconstruction, modernization, or automation." },
      },
    ],
    closing: {
      uk: "Мета — довговічність, надійність і сучасність вашого обладнання, менше простоїв і вища ефективність процесів.",
      en: "The aim is durability, reliability, and a modern plant — fewer stoppages and higher process efficiency.",
    },
  },
  lab: {
    title: {
      uk: "Лабораторія руйнівного і неруйнівного контролю",
      en: "Destructive and non-destructive testing laboratory",
    },
    intro: {
      uk: "Лабораторія РіНК — структурний підрозділ компанії. Контролюємо обладнання та матеріали під час виготовлення, будівництва, монтажу, ремонту та реконструкції.",
      en: "The DNDT laboratory is an in-house unit. We inspect equipment and materials during manufacture, construction, installation, repair, and reconstruction.",
    },
    items: [
      {
        title: { uk: "Механічні випробування", en: "Mechanical testing" },
        text: { uk: "Розтяг, вигин, ударна в’язкість — оцінка міцності та поведінки матеріалу під навантаженням.", en: "Tensile, bend, and impact toughness tests to assess strength and material behaviour under load." },
      },
      {
        title: { uk: "Візуально-оптичний контроль", en: "Visual and optical inspection" },
        text: { uk: "Виявлення поверхневих дефектів і відхилень геометрії.", en: "Detection of surface defects and geometric irregularities." },
      },
      {
        title: { uk: "Капілярний контроль", en: "Penetrant testing" },
        text: { uk: "Пошук тріщин і поверхневих несплошностей проникними рідинами.", en: "Detection of cracks and surface discontinuities with penetrant liquids." },
      },
      {
        title: { uk: "Ультразвуковий контроль", en: "Ultrasonic testing" },
        text: { uk: "Дослідження внутрішніх дефектів і цілісності металу.", en: "Examination of internal defects and material integrity." },
      },
      {
        title: { uk: "Рентгенографічний контроль", en: "Radiographic testing" },
        text: { uk: "Виявлення прихованих дефектів зварних з’єднань і основного металу.", en: "Detection of hidden defects in welds and base metal." },
      },
    ],
    closing: {
      uk: "За результатами складаємо технічний звіт і протоколи встановлених форм — документована підстава для безпечної експлуатації.",
      en: "Results are issued as a technical report and standard protocols — documented evidence for safe operation.",
    },
  },
};

export const extraCapabilities: Record<Locale, { title: string; text: string }[]> = {
  uk: [
    {
      title: "Обслуговування технологічного обладнання",
      text: "Плановий сервіс: зовнішній огляд, заземлення, електроконтакти, мастило, сальникові ущільнення, кріплення, чищення вузлів, усунення несправностей електроапаратури.",
    },
    {
      title: "Експертне обстеження та технічна діагностика",
      text: "На базі лабораторій РіНК та електротехнічної лабораторії обстежуємо об’єкти котлонагляду, трубопроводи, несучі конструкції та вантажопідйомні машини.",
    },
    {
      title: "Атестація зварювальників",
      text: "Періодична атестація згідно з НПАОП 0.00-1.16-96 для ручного дугового, MAG, TIG і газового зварювання на піднаглядних об’єктах.",
    },
    {
      title: "Електровимірювання до 1000 В",
      text: "Контроль електроустановок у межах компетенції електротехнічної лабораторії компанії.",
    },
  ],
  en: [
    {
      title: "Process equipment maintenance",
      text: "Planned service: visual inspection, earthing, electrical contacts, lubrication, gland seals, fasteners, cleaning of critical units, and electrical troubleshooting.",
    },
    {
      title: "Expert examination and technical diagnostics",
      text: "Using the DNDT and electrotechnical laboratories we inspect boiler-supervision objects, pipelines, load-bearing structures, and lifting machinery.",
    },
    {
      title: "Welder certification",
      text: "Periodic certification under NPAOP 0.00-1.16-96 for MMA, MAG, TIG, and gas welding on supervised facilities.",
    },
    {
      title: "Electrical measurements up to 1000 V",
      text: "Verification of electrical installations within the scope of the company’s electrotechnical laboratory.",
    },
  ],
};
