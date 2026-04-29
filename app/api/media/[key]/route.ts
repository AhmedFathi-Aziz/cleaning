import { getMediaObject } from "@/lib/post-store";

export const dynamic = "force-dynamic";

export async function GET(_request: Request, context: { params: Promise<{ key: string }> }) {
  const { key } = await context.params;
  const decoded = decodeURIComponent(key);
  if (decoded.includes("..") || decoded.includes("/")) {
    return new Response("Not found", { status: 404 });
  }

  const obj = await getMediaObject(decoded);
  if (!obj?.body) {
    return new Response("Not found", { status: 404 });
  }

  return new Response(obj.body, {
    headers: {
      "Content-Type": obj.contentType,
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
