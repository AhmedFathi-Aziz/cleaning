import { isAdmin } from "@/lib/admin-auth";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const ok = await isAdmin(request);
  return Response.json({ ok });
}
