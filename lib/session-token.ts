import { getConfiguredAdminPassword } from "./env-secrets";

const SEP = ".";

function utf8ToBase64Url(str: string): string {
  const bytes = new TextEncoder().encode(str);
  let bin = "";
  for (let i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]!);
  const b64 = btoa(bin);
  return b64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function base64UrlToUtf8(b64url: string): string {
  let b64 = b64url.replace(/-/g, "+").replace(/_/g, "/");
  while (b64.length % 4) b64 += "=";
  const bin = atob(b64);
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return new TextDecoder().decode(out);
}

async function hmacSha256Hex(secret: string, message: string): Promise<string> {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(message));
  const bytes = new Uint8Array(sig);
  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function timingSafeEqualHex(a: string, b: string): boolean {
  const na = a.toLowerCase();
  const nb = b.toLowerCase();
  if (na.length !== nb.length) return false;
  let x = 0;
  for (let i = 0; i < na.length; i++) x |= na.charCodeAt(i) ^ nb.charCodeAt(i);
  return x === 0;
}

/** قيمة كوكي HttpOnly — لا تحتاج KV */
export async function createSignedSessionValue(): Promise<string | null> {
  const secret = await getConfiguredAdminPassword();
  if (!secret) return null;
  const exp = Date.now() + 7 * 24 * 60 * 60 * 1000;
  const payload = JSON.stringify({ exp });
  const b64 = utf8ToBase64Url(payload);
  const sig = await hmacSha256Hex(secret, b64);
  return `${b64}${SEP}${sig}`;
}

export async function verifySignedSessionValue(value: string | undefined): Promise<boolean> {
  if (!value) return false;
  const secret = await getConfiguredAdminPassword();
  if (!secret) return false;
  const last = value.lastIndexOf(SEP);
  if (last < 0) return false;
  const b64 = value.slice(0, last);
  const sig = value.slice(last + 1);
  const expected = await hmacSha256Hex(secret, b64);
  if (!timingSafeEqualHex(sig, expected)) return false;
  try {
    const payload = JSON.parse(base64UrlToUtf8(b64)) as { exp?: number };
    return typeof payload.exp === "number" && payload.exp > Date.now();
  } catch {
    return false;
  }
}
