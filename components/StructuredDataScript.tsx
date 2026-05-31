import { serializeJsonLd } from "@/lib/schema-org/serialize";

type Props = { data: unknown; id?: string };

/** Single place for JSON-LD script output — uses safe serialization. */
export function StructuredDataScript({ data, id }: Props) {
  return (
    <script
      id={id}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }}
    />
  );
}
