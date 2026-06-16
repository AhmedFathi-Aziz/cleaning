/**
 * صور مضغوطة محلياً (`npm run images:build`) — أخف من روابط googleusercontent وتُحسّن LCP.
 *
 * تسمية الملفات (SEO صور): تجنّب أسماء الكاميرا مثل `IMG_1234.jpg` أو `DSC0001.jpg`.
 * فضّل أسماء وصفية قصيرة: `hero.webp`، `deep-clean-living-room.webp`، `facade-glass-jeddah.webp`.
 * للتحقق من المجلد: `npm run images:check-seo`. استبدل روابط الستوك التكرارية بصور حقيقية من الميدان عند الإمكان.
 */
export const images = {
  hero: "/images/hero.webp",
  deepClean: "/images/deep-clean.webp",
  carpet: "/images/carpet.webp",
  sofaCleaning: "/images/sofa-cleaning.webp",
  waterTankCleaning:
    "/images/water-tank-cleaning-riyadh/hero.webp",
  facade: "/images/facade-cleaning-riyadh/hero.webp",
  facadeCleaningRiyadhHero: "/images/facade-cleaning-riyadh/hero.webp",
  gardenCleaning: "/images/garden-cleaning.webp",
  servicesVilla: "/images/services-villa.webp",
  servicesMajlis: "/images/services-majlis.webp",
  servicesPest: "/images/services-pest.webp",
  aboutHero: "/images/about-hero.webp",
  aboutStatsBg: "/images/about-stats-bg.webp",
  featureTeam: "/images/feature-team.webp",
  featureMaterials: "/images/feature-materials.webp",
  featureSchedule: "/images/feature-schedule.webp",
  /** نموذج بصري لشكل تقرير كشف تسربات (SVG) — صفحة التقدير ومحتوى التسربات */
  leakDetectionReportSample: "/images/leak-detection-report-sample.svg",
  cleaningCompanyRiyadhHero: "/images/cleaning-company-riyadh/hero.webp",
  cleaningCompanyRiyadhTeam: "/images/cleaning-company-riyadh/team.webp",
  houseCleaningRiyadhHero: "/images/house-cleaning-riyadh/hero.webp",
  houseCleaningRiyadhLivingRoom: "/images/house-cleaning-riyadh/living-room.webp",
  villaCleaningRiyadhHero: "/images/villa-cleaning-riyadh/hero.webp",
  villaCleaningRiyadhInterior: "/images/villa-cleaning-riyadh/villa-interior.webp",
  apartmentCleaningRiyadhHero: "/images/apartment-cleaning-riyadh/hero.webp",
  majlisCleaningRiyadhHero: "/images/majlis-cleaning-riyadh/hero.webp",
  sofaCleaningRiyadhHero: "/images/sofa-cleaning-riyadh/hero.webp",
  carpetCleaningRiyadhHero: "/images/carpet-cleaning-riyadh/hero.webp",
  waterTankCleaningRiyadhHero: "/images/water-tank-cleaning-riyadh/hero.webp",
  waterTankCleaningRiyadhProcess: "/images/water-tank-cleaning-riyadh/tank-process.webp",
  postConstructionCleaningRiyadhHero:
    "/images/post-construction-cleaning-riyadh/hero.webp",
  postConstructionEquipmentVacuum:
    "/images/post-construction-cleaning-riyadh/equipment-vacuum.webp",
  postConstructionEquipmentGlass:
    "/images/post-construction-cleaning-riyadh/equipment-glass-1920.webp",
  postConstructionEquipmentSteam:
    "/images/post-construction-cleaning-riyadh/equipment-steam.webp",
  cockroachControlRiyadhTechnician: "/images/cockroach-control-riyadh/technician-spraying.webp",
  cockroachControlRiyadhKitchen: "/images/cockroach-control-riyadh/kitchen-gel-treatment.webp",
  termiteControlRiyadhInspection: "/images/termite-control-riyadh/wood-inspection.webp",
  termiteControlRiyadhSoilTreatment: "/images/termite-control-riyadh/soil-barrier-treatment.webp",
} as const;
