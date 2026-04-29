import { SESSION_COOKIE } from "@/lib/post-types";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const secure = request.url.startsWith("https://");
  const clear = `${SESSION_COOKIE}=; HttpOnly; Path=/; SameSite=Lax; Max-Age=0${secure ? "; Secure" : ""}`;

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Set-Cookie": clear,
    },
  });
}
