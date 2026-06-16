import Link from "next/link";

import { Icon } from "@/components/Icon";
import { getNeighborhoodServiceHighlights } from "@/lib/neighborhood-services-deep-content";
import { getServiceArticle } from "@/lib/service-articles";
import { getServiceLinkFromNeighborhood } from "@/lib/url-indexing-policy";
import type { CityLocation, Neighborhood } from "@/src/data/locations";

export function NeighborhoodServicesHighlight({
  city,
  neighborhood,
}: {
  city: CityLocation;
  neighborhood: Neighborhood;
}) {
  const blocks = getNeighborhoodServiceHighlights(city, neighborhood);

  return (
    <section
      className="mt-8 rounded-[2rem] border border-slate-200 bg-white p-6 text-right shadow-sm md:p-10"
      aria-labelledby="neighborhood-services-deep-heading"
    >
      <p className="mb-2 text-sm font-extrabold text-secondary">دليل الخدمات في حيك</p>
      <h2
        id="neighborhood-services-deep-heading"
        className="font-headline text-2xl font-extrabold text-primary md:text-4xl"
      >
        نظافة المنزل، الخزان، الحشرات، والحديقة في حي {neighborhood.name}، {city.name}
      </h2>
      <p className="mt-4 max-w-3xl text-base font-medium leading-8 text-on-surface-variant md:text-lg">
        التالي ملخّص عملي لسكان حي {neighborhood.name} في {city.name}: متى يهمّ كل نوع خدمة، وماذا تجهّز قبل
        الزيارة، مع رابط مباشر لصفحة الخدمة في موقعك نفسه.
      </p>

      <div className="mt-10 grid gap-8">
        {blocks.map((block) => {
          const svc = getServiceArticle(block.slug);
          if (!svc) return null;
          const href = getServiceLinkFromNeighborhood(block.slug, city.slug, neighborhood.slug);
          return (
            <article
              key={block.slug}
              className="rounded-3xl border border-slate-100 bg-slate-50/80 p-6 shadow-sm md:p-8 dark:border-slate-800 dark:bg-slate-900/40"
            >
              <div className="flex flex-col gap-4 border-b border-slate-200 pb-5 dark:border-slate-700 md:flex-row md:items-start md:justify-between md:gap-6">
                <div className="flex items-start gap-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary text-white shadow-md">
                    <Icon name={svc.icon} className="text-2xl" />
                  </span>
                  <div>
                    <h3 className="font-headline text-xl font-extrabold text-primary md:text-2xl">{block.heading}</h3>
                    <p className="mt-2 text-sm font-semibold text-secondary">{svc.shortTitle}</p>
                  </div>
                </div>
                <Link
                  href={href}
                  className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-secondary px-5 py-2.5 text-sm font-bold text-white shadow-md transition hover:opacity-95 md:self-start"
                >
                  <span>
                    {svc.shortTitle} في حي {neighborhood.name}، {city.name}
                  </span>
                  <Icon name="arrow_back" className="text-lg" />
                </Link>
              </div>

              <div className="mt-5 space-y-4 text-base leading-9 text-on-surface-variant">
                {block.paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>

              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {block.bullets.map((b) => (
                  <li key={b} className="flex gap-2 text-sm font-semibold leading-7 text-primary">
                    <Icon name="check_circle" className="mt-0.5 shrink-0 text-lg text-secondary" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </article>
          );
        })}
      </div>
    </section>
  );
}
