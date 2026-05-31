import type { CityLocation, Neighborhood } from "@/src/data/locations";

export function NeighborhoodLocalContextBlock({
  city,
  neighborhood,
}: {
  city: CityLocation;
  neighborhood: Neighborhood;
}) {
  return (
    <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
      <p className="mb-2 text-sm font-extrabold text-secondary">عن الحي والتغطية</p>
      <h2 className="font-headline text-2xl font-extrabold text-primary md:text-3xl">
        ما الذي يميز {neighborhood.name} ضمن خطة عملنا في {city.name}؟
      </h2>
      <p className="mt-4 text-base leading-9 text-on-surface-variant">{neighborhood.nearbyLandmarksAr}</p>
      <p className="mt-4 text-base leading-9 text-on-surface-variant">
        نغطي حي {neighborhood.name} ضمن {city.name} بخدمات تنظيف ومكافحة حشرات مرنة، وفريق يعمل وفق مواعيد تنسّق معك
        مع مراعاة طبيعة الأحياء السكنية والتجارية في المدينة.
      </p>
      <p className="mt-4 text-base leading-9 text-on-surface-variant">
        نسعى لتحديد موعد يناسبك والوصول في أقرب وقت عمل ممكن وفق المسار والزحمة؛ التوقيت الفعلي قد يختلف قليلاً عن
        التقدير الأولي، ويهدف إلى تسهيل التخطيط وليس إلى ضمان دقيقة بدقيقة.
      </p>
    </section>
  );
}
