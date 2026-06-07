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
  sofaCleaning:
    "https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg?auto=compress&cs=tinysrgb&w=900",
  waterTankCleaning:
    "https://images.pexels.com/photos/221027/pexels-photo-221027.jpeg?auto=compress&cs=tinysrgb&w=900",
  facade: "/images/facade.webp",
  gardenCleaning:
    "https://images.pexels.com/photos/413227/pexels-photo-413227.jpeg?auto=compress&cs=tinysrgb&w=900",
  servicesVilla:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBs_tOO_6pFLtZt2ilk7ietjIzHceNll9Exn5DzGRJvC_GOcMWMDRVyXGPqiGli4OsEPLlCxr2mntlutel0FzlZPoiRRg4rfbDea_rWBeRcbeURzdSOQG-UMBHLkbfNGLt9YG7VwaHotpwuxgfzIT2Vqe0SXtjPWhOvi1vSSzjvbEAN2Q88EefOYIdaLaJQKNsztbJeMxqAC0dtVYxdEZmMENHwjc_g22FVA8lOcIfLTZkv18Co78LSxO7k4j8jioc4i5PsA84wKZjE",
  servicesMajlis:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAh9CWv2faCOfB46P8ikq_o-J7dkdFIbaxhQsvYpYF3FUyBHT9Oh0B-1-I-sD5OpjzoRWVtoyEdYu8I4BY37mFGrY6RDWyjjy9ELRaK2clg19jilsFxF781eg6CerPVV-CTC5n8a8yR8wU3S74jl8TFZkMniM7j5CGQSDIQpqfxa5FO4wgyJtk9CTAM_38Bk456QuUvM7yIaFEsDWtswi_n9JQf09mujz6tqsfD7_0KaJSEahD947FU9YOcuFtyHqSRwHZlZsqsLat8",
  servicesPest:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuAFuFg4oX6NNbhtaV959bBNeGHDuFpZHY_K1y-ShnNggqYiryiOR77U_cDF4LMsgUuaKUQKfuFar0NRIjrju43EsR9rmiuq2RxpDlxeG-32RciD2xMzxsHfNrrAjbu17gTULvuMsGGrR3yxww7Bwvf4LCAC-6_S0cHLDxS9eJ6yzT898_hiTFhogQN2z46Kb-1csD3Cf8KRMQNn8SslCpxKHss4cl1lv5uhe5QCnjGyHl0rXTq-v1C59nv5N7-Eq4ahZ43XASbvAeQM",
  aboutHero:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuD5gDaW0R9Vg1h8U7dFaaMM1vYh4BHh8yLMBNdrgzOtIqOVGxhMFfjYKtBurIX6OMipcl5ZALqDl5D8uj1PNARdiC5dB5T5ldebnvc1na5-MaZoExM2D258S9xcG_FfMXbC0eGYjzy_LWEOqd6k2RCIAGILNES9IUeyH51D50Zj_T1QbT4Kj-zYAMoClZlcuq7nNG0tPWGnv7RadHaZlbKsk7MINl6qnH_mZHo8tk1zpqP4EwHyIy77eahoqHbIDSh-ECBiSxyYif2f",
  aboutStatsBg:
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCGINllRNqXkbTUBPbXbGUaM7KyY1-YAZabxFd8eFJz1ZmZVWx3v90W7ov0sIyTYuAbRldQA15Z0t_huIq5-bz_7CGxTzaWO4hBECaWzmiDstb2RZCwtuObopPa9lctvBXNMC3gb17LvYm6qcStnSeH-LEuGUogGT7L8W1XipBnJjn7VFRO1PPT7YTt3zYWhIWTvRdZom1GAuShB124O6E1IlcKL_aw5A7VD8rqAJSy9OfQ52zABX6I1BWVwPMnhfBvhXTltbwxIO3u",
  featureTeam:
    "https://plus.unsplash.com/premium_photo-1682126104327-ef7d5f260cf7?auto=format&fit=crop&w=900&q=85",
  featureMaterials:
    "https://images.pexels.com/photos/4107277/pexels-photo-4107277.jpeg?auto=compress&cs=tinysrgb&w=900",
  featureSchedule:
    "https://images.pexels.com/photos/7033891/pexels-photo-7033891.jpeg?auto=compress&cs=tinysrgb&w=900",
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
} as const;
