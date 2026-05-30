/**
 * Minimal HMAC-SHA256 JWT signing/verification using the Web Crypto API.
 * Works in both Edge (middleware) and Node (server components, route handlers).
 * No external dependency — just the platform crypto global.
 */

const enc = new TextEncoder();
const dec = new TextDecoder();

function toBase64url(bytes: Uint8Array): string {
  let binary = "";
  for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function fromBase64url(str: string): Uint8Array<ArrayBuffer> {
  const b64 = str.replace(/-/g, "+").replace(/_/g, "/");
  const binary = atob(b64);
  // Explicit ArrayBuffer so TS knows the buffer type is not SharedArrayBuffer.
  const bytes = new Uint8Array(new ArrayBuffer(binary.length));
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

async function getKey(secret: string, usage: "sign" | "verify"): Promise<CryptoKey> {
  return crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    [usage]
  );
}

const HEADER = toBase64url(enc.encode(JSON.stringify({ alg: "HS256", typ: "JWT" })));

export async function signToken(payload: Record<string, unknown>): Promise<string> {
  const body = toBase64url(enc.encode(JSON.stringify(payload)));
  const key = await getKey(process.env.AUTH_SECRET!, "sign");
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(`${HEADER}.${body}`));
  return `${HEADER}.${body}.${toBase64url(new Uint8Array(sig))}`;
}

export async function verifyToken(
  token: string
): Promise<Record<string, unknown> | null> {
  const parts = token.split(".");
  if (parts.length !== 3) return null;
  const [header, body, sig] = parts;
  try {
    const key = await getKey(process.env.AUTH_SECRET!, "verify");
    const valid = await crypto.subtle.verify(
      "HMAC",
      key,
      fromBase64url(sig),
      enc.encode(`${header}.${body}`)
    );
    if (!valid) return null;
    return JSON.parse(dec.decode(fromBase64url(body))) as Record<string, unknown>;
  } catch {
    return null;
  }
}
