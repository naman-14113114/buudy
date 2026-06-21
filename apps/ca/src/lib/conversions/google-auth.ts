import { createSign } from "node:crypto";

const tokenUrl = "https://oauth2.googleapis.com/token";
const dataManagerScope = "https://www.googleapis.com/auth/datamanager";

function base64Url(value: string | Buffer) {
  return Buffer.from(value)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");
}

function createServiceAccountAssertion(input: {
  email: string;
  privateKey: string;
  now?: number;
}) {
  const now = Math.floor((input.now ?? Date.now()) / 1000);
  const header = base64Url(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const claims = base64Url(
    JSON.stringify({
      iss: input.email,
      scope: dataManagerScope,
      aud: tokenUrl,
      iat: now,
      exp: now + 3600,
    }),
  );
  const unsigned = `${header}.${claims}`;
  const signer = createSign("RSA-SHA256");
  signer.update(unsigned);
  signer.end();
  return `${unsigned}.${base64Url(signer.sign(input.privateKey))}`;
}

export async function getGoogleDataManagerAccessToken(input: {
  email: string;
  privateKey: string;
}) {
  const response = await fetch(tokenUrl, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: createServiceAccountAssertion(input),
    }),
    cache: "no-store",
  });
  const body = (await response.json().catch(() => ({}))) as {
    access_token?: string;
    error_description?: string;
  };
  if (!response.ok || !body.access_token) {
    throw new Error(
      body.error_description ||
        `Google OAuth token request failed (${response.status}).`,
    );
  }
  return body.access_token;
}
