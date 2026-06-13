import type { Metadata } from "next";

import { SiteTeam } from "@/components/SiteTeam";
import { brandNameAr } from "@/lib/brand";
import { teamMembers } from "@/lib/content/team-members";
import { buildArabicPageMetadata } from "@/lib/seo";
import { siteUrl } from "@/lib/site";

export const metadata: Metadata = buildArabicPageMetadata({
  title: `فريق العمل | ${brandNameAr} — عمالة مدربة في الرياض`,
  description: `تعرّف على فريق ${brandNameAr}: قيادة تقنية، مهندسون وفنيو تنظيف ومكافحة حشرات في الرياض. أسماء ومسميات وظيفية واضحة لرفع الثقة قبل الزيارة.`,
  canonical: "/team",
  keywords: [
    "فريق العمل",
    brandNameAr,
    "عمالة تنظيف مدربة الرياض",
    "مشرف ميداني تنظيف",
    "فني مكافحة حشرات الرياض",
    "فريق تنظيف منازل",
  ],
});

function TeamPageJsonLd() {
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${siteUrl}/team#webpage`,
        url: `${siteUrl}/team`,
        name: `فريق العمل | ${brandNameAr}`,
        inLanguage: "ar-SA",
        isPartOf: { "@id": `${siteUrl}/#website` },
      },
      {
        "@type": "ItemList",
        "@id": `${siteUrl}/team#team-list`,
        name: `فريق ${brandNameAr}`,
        numberOfItems: teamMembers.length,
        itemListElement: teamMembers.map((member, index) => ({
          "@type": "ListItem",
          position: index + 1,
          item: {
            "@type": "Person",
            name: member.honorific ? `${member.honorific} ${member.name}` : member.name,
            jobTitle: member.specialty,
            description: member.highlight,
            worksFor: { "@type": "Organization", name: brandNameAr },
          },
        })),
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}

export default function TeamPage() {
  return (
    <>
      <TeamPageJsonLd />
      <SiteTeam />
    </>
  );
}
