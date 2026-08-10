import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { GoogleAuth } from "google-auth-library";

const DEFAULT_KEY_PATH = resolve(process.cwd(), "service-account-key.json");

function loadCredentials(): Record<string, unknown> {
  const inlineKey = process.env.GOOGLE_SERVICE_ACCOUNT_KEY;
  if (inlineKey) {
    return JSON.parse(inlineKey);
  }

  const keyPath =
    process.env.GOOGLE_SERVICE_ACCOUNT_KEY_PATH ?? DEFAULT_KEY_PATH;
  return JSON.parse(readFileSync(keyPath, "utf8"));
}

export async function getAccessToken(): Promise<string> {
  const auth = new GoogleAuth({
    credentials: loadCredentials(),
    scopes: ["https://www.googleapis.com/auth/drive.readonly"],
  });

  const client = await auth.getClient();
  const token = await client.getAccessToken();

  if (!token.token) {
    throw new Error("Failed to obtain a Google Drive access token");
  }

  return token.token;
}
