import { SESSION_COOKIE } from "./post-types";
import { verifySignedSessionValue } from "./session-token";

export { getConfiguredAdminPassword } from "./env-secrets";

export function parseSessionToken(request: Request): string | undefined {
  const raw = request.headers.get("cookie");
  if (!raw) return undefined;
  for (const part of raw.split(";")) {
    const [k, ...rest] = part.trim().split("=");
    if (k === SESSION_COOKIE) return decodeURIComponent(rest.join("="));
  }
  return undefined;
}

export async function isAdmin(request: Request): Promise<boolean> {
  return verifySignedSessionValue(parseSessionToken(request));
}
