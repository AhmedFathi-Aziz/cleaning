import { isAdmin } from "@/lib/admin-auth";
import { putMediaObject } from "@/lib/post-store";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  if (!(await isAdmin(request))) {
    return Response.json({ error: "غير مصرّح" }, { status: 401 });
  }

  const form = await request.formData();
  const file = form.get("file");
  if (!file || !(file instanceof File)) {
    return Response.json({ error: "ملف مفقود" }, { status: 400 });
  }

  const buf = await file.arrayBuffer();
  if (buf.byteLength > 5 * 1024 * 1024) {
    return Response.json({ error: "الحد الأقصى 5 ميجابايت" }, { status: 400 });
  }

  const ext = file.name.split(".").pop()?.toLowerCase() || "bin";
  const safeExt = /^[a-z0-9]+$/.test(ext) ? ext : "bin";
  const key = `${crypto.randomUUID()}.${safeExt}`;
  const contentType = file.type || "application/octet-stream";

  await putMediaObject(key, buf, contentType);

  const url = new URL(request.url);
  const base = `${url.protocol}//${url.host}`;
  return Response.json({ ok: true, key, url: `${base}/api/media/${key}` });
}
