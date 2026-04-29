import { getConfiguredAdminPassword } from "@/lib/admin-auth";
import { createSignedSessionValue } from "@/lib/session-token";
import { SESSION_COOKIE } from "@/lib/post-types";

export const dynamic = "force-dynamic";

const WEEK = 60 * 60 * 24 * 7;

export async function POST(request: Request) {
  const expected = await getConfiguredAdminPassword();
  if (!expected) {
    return Response.json(
      { error: "لم يُضبط ADMIN_PASSWORD (ضعه في .env.local محلياً أو كـ Secret على Cloudflare)" },
      { status: 503 },
    );
  }

  let body: { password?: string };
  try {
    body = (await request.json()) as { password?: string };
  } catch {
    return Response.json({ error: "جسون غير صالح" }, { status: 400 });
  }

  if (body.password !== expected) {
    return Response.json({ error: "كلمة المرور غير صحيحة" }, { status: 401 });
  }

  const token = await createSignedSessionValue();
  if (!token) {
    return Response.json({ error: "تعذر إنشاء الجلسة" }, { status: 503 });
  }

  const secure = request.url.startsWith("https://");
  const cookie = `${SESSION_COOKIE}=${encodeURIComponent(token)}; HttpOnly; Path=/; SameSite=Lax; Max-Age=${WEEK}${secure ? "; Secure" : ""}`;

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Set-Cookie": cookie,
    },
  });
}
