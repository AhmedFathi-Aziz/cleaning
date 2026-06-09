/**
 * يحمّل الصور من الروابط السابقة ويولّد ملفات WebP في public/images
 * (تشغيل: npm run images:build — يحتاج شبكة).
 */
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const outDir = path.join(process.cwd(), "public", "images");
/** مصدر التحميل → اسم الملف الناتج + أقصى عرض بعد الضغط */
const jobs = [
  {
    file: "hero.webp",
    url: "https://lh3.googleusercontent.com/aida-public/AB6AXuDYfBjP5Ey9nThryin2nuNlYWzHfEW7pRPs-4KAsXcLNbTIKZQ9AhRKBnao3bkjQHEGmQDG7wepLkyzuqDxCwLMw9ovIge2usCRh8VsFIu_8SChm4kG0oEcnrleLXDKvAqyy1124mFUYrudSJYhtRsjQGx3wcOuLHoWXcv2-5lWTgECLU0mivgAVnHbrLoypZ7GCYeZi9gwD9IIGunO7Ivqbblfibq8Tihgy6k6w_hWLi9i9b9o3hdOI1KT75gFAKpPyakMjSt9V74E=s2048",
    width: 1400,
    quality: 68,
  },
  {
    file: "deep-clean.webp",
    url: "https://lh3.googleusercontent.com/aida-public/AB6AXuDZzarQBnJkjYma7N-VjCwXGKcbcsRO7mcJX3NNXo1zVPLjDLE8RsVVAvGOYnL0-HWqlgh0KTcFeP6bNs8Rl9kWYrJRey-xccudtDBAOrI_3mMuJSDAB04LnH_b5rC-k9ziDwYfxPDwOGxfQ77LFrCiMh4G18H-ECbTo1-a3xkROq1Skrd6W8ZC7s30rCKt9yPBGbmMwCERMliFbSzG4DG2aXZFmr2UrD8rYuA1MFkzdJiCeYzcqFX85WRaXubQC8BfLaajwsNFlKoX=s1600",
    width: 1400,
    quality: 82,
  },
  {
    file: "carpet.webp",
    url: "https://lh3.googleusercontent.com/aida-public/AB6AXuCmVlQDGzt4kNR6_hExlctPBMY_QvBTHVJYnRtQmHBdLy1uJTFkQ6SvX0cFa6gL4KL7bFEGTGdaedeemcUPteiL1CxinEbEFklNzuTPQQ0zL7wvEGBa3H0EC4QidOiVVTp6TEj3ReHOF3TMTmR_vgPhWgvLH6zxaSZnIrLHoQDsTWj2W9VYjRFzJFglOsL0PWNsKDZiItM6Fy0XsLfkTPU7kaB3ZXX-CtFo3VYl-iHjhhwesr0LMkf1lyfqOx1OHMvjFQm7Zx5ZXEGL=s1600",
    width: 480,
    quality: 52,
  },
  {
    file: "facade.webp",
    url: "https://lh3.googleusercontent.com/aida-public/AB6AXuAYwudxC08hJYsOz3UzZw5XRDUhmW0Vn0x_Qljj5_k-GBaoZpyuHSuH73kHVvadLGqYNI6HgZQGtHBCIiW1sV3PXvphDlxctBUnV0Sh31UZmKUGAiDlK3eKe2APliUijftWgJ06NpTUqUNtM3h_SKAfmq_nvZUqBqThnmdbACQ_TXrg1SYp4ZPSh8qVBWCkINt4xFkLpphp897Scem7YDmpnW0i_t9AL7C4o4jjqNzSj7_030mz50DCDw8IFhUAvrtpyrVdlmIFXkIe=s1600",
    width: 520,
    quality: 52,
  },
  {
    file: "services-villa.webp",
    url: "https://lh3.googleusercontent.com/aida-public/AB6AXuBs_tOO_6pFLtZt2ilk7ietjIzHceNll9Exn5DzGRJvC_GOcMWMDRVyXGPqiGli4OsEPLlCxr2mntlutel0FzlZPoiRRg4rfbDea_rWBeRcbeURzdSOQG-UMBHLkbfNGLt9YG7VwaHotpwuxgfzIT2Vqe0SXtjPWhOvi1vSSzjvbEAN2Q88EefOYIdaLaJQKNsztbJeMxqAC0dtVYxdEZmMENHwjc_g22FVA8lOcIfLTZkv18Co78LSxO7k4j8jioc4i5PsA84wKZjE=s1600",
    width: 1200,
    quality: 82,
  },
  {
    file: "services-majlis.webp",
    url: "https://lh3.googleusercontent.com/aida-public/AB6AXuAh9CWv2faCOfB46P8ikq_o-J7dkdFIbaxhQsvYpYF3FUyBHT9Oh0B-1-I-sD5OpjzoRWVtoyEdYu8I4BY37mFGrY6RDWyjjy9ELRaK2clg19jilsFxF781eg6CerPVV-CTC5n8a8yR8wU3S74jl8TFZkMniM7j5CGQSDIQpqfxa5FO4wgyJtk9CTAM_38Bk456QuUvM7yIaFEsDWtswi_n9JQf09mujz6tqsfD7_0KaJSEahD947FU9YOcuFtyHqSRwHZlZsqsLat8=s1600",
    width: 1200,
    quality: 82,
  },
  {
    file: "services-pest.webp",
    url: "https://images.pexels.com/photos/5299362/pexels-photo-5299362.jpeg?auto=compress&cs=tinysrgb&w=1600",
    width: 1200,
    quality: 82,
  },
  {
    file: "about-hero.webp",
    url: "https://lh3.googleusercontent.com/aida-public/AB6AXuD5gDaW0R9Vg1h8U7dFaaMM1vYh4BHh8yLMBNdrgzOtIqOVGxhMFfjYKtBurIX6OMipcl5ZALqDl5D8uj1PNARdiC5dB5T5ldebnvc1na5-MaZoExM2D258S9xcG_FfMXbC0eGYjzy_LWEOqd6k2RCIAGILNES9IUeyH51D50Zj_T1QbT4Kj-zYAMoClZlcuq7nNG0tPWGnv7RadHaZlbKsk7MINl6qnH_mZHo8tk1zpqP4EwHyIy77eahoqHbIDSh-ECBiSxyYif2f=s1800",
    width: 1600,
    quality: 82,
  },
  {
    file: "about-stats-bg.webp",
    url: "https://lh3.googleusercontent.com/aida-public/AB6AXuCGINllRNqXkbTUBPbXbGUaM7KyY1-YAZabxFd8eFJz1ZmZVWx3v90W7ov0sIyTYuAbRldQA15Z0t_huIq5-bz_7CGxTzaWO4hBECaWzmiDstb2RZCwtuObopPa9lctvBXNMC3gb17LvYm6qcStnSeH-LEuGUogGT7L8W1XipBnJjn7VFRO1PPT7YTt3zYWhIWTvRdZom1GAuShB124O6E1IlcKL_aw5A7VD8rqAJSy9OfQ52zABX6I1BWVwPMnhfBvhXTltbwxIO3u=s1400",
    width: 1200,
    quality: 80,
  },
  {
    file: "feature-team.webp",
    url: "https://plus.unsplash.com/premium_photo-1682126104327-ef7d5f260cf7?auto=format&fit=crop&w=1600&q=80",
    width: 800,
    quality: 72,
  },
  {
    file: "feature-materials.webp",
    url: "https://images.pexels.com/photos/4107277/pexels-photo-4107277.jpeg?auto=compress&cs=tinysrgb&w=1600",
    width: 800,
    quality: 72,
  },
  {
    file: "feature-schedule.webp",
    url: "https://images.pexels.com/photos/7033891/pexels-photo-7033891.jpeg?auto=compress&cs=tinysrgb&w=1600",
    width: 800,
    quality: 72,
  },
  {
    file: "sofa-cleaning.webp",
    url: "https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg?auto=compress&cs=tinysrgb&w=1600",
    width: 1200,
    quality: 82,
  },
  {
    file: "water-tank-cleaning.webp",
    url: "https://images.pexels.com/photos/260754/pexels-photo-260754.jpeg?auto=compress&cs=tinysrgb&w=1600",
    width: 1200,
    quality: 82,
  },
  {
    file: "water-tank-cleaning-riyadh/tank-process.webp",
    url: "https://images.pexels.com/photos/260754/pexels-photo-260754.jpeg?auto=compress&cs=tinysrgb&w=1600",
    width: 960,
    quality: 72,
  },
  {
    file: "water-tank-cleaning-riyadh/tank-process-640.webp",
    url: "https://images.pexels.com/photos/260754/pexels-photo-260754.jpeg?auto=compress&cs=tinysrgb&w=1600",
    width: 640,
    quality: 70,
  },
  {
    file: "garden-cleaning.webp",
    url: "https://images.pexels.com/photos/1083881/pexels-photo-1083881.jpeg?auto=compress&cs=tinysrgb&w=1600",
    width: 960,
    quality: 72,
  },
];

async function main() {
  await fs.promises.mkdir(outDir, { recursive: true });
  for (const job of jobs) {
    const dest = path.join(outDir, job.file);
    process.stdout.write(`→ ${job.file} … `);
    const res = await fetch(job.url, { headers: { "User-Agent": "SaudiCleaningImageBot/1.0" } });
    if (!res.ok) throw new Error(`HTTP ${res.status} لـ ${job.url}`);
    const buf = Buffer.from(await res.arrayBuffer());
    await sharp(buf)
      .resize({ width: job.width, withoutEnlargement: true })
      .webp({ quality: job.quality, effort: 4 })
      .toFile(dest);
    const st = await fs.promises.stat(dest);
    console.log(`${(st.size / 1024).toFixed(0)} KiB`);
  }
  console.log("تم — المجلد:", outDir);
}

await main();
