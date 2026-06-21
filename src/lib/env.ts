import { z } from "zod";

const envSchema = z.object({
  NEXT_PUBLIC_FIREBASE_API_KEY: z.string().min(1),
  NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: z.string().min(1),
  NEXT_PUBLIC_FIREBASE_PROJECT_ID: z.string().min(1),
  NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: z.string().min(1),
  NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: z.string().min(1),
  NEXT_PUBLIC_FIREBASE_APP_ID: z.string().min(1),
  NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID: z.string().optional(),
  NEXT_PUBLIC_SITE_URL: z.string().url().optional(),
  NEXT_PUBLIC_WHATSAPP_NUMBER: z.string().optional(),
});

export type Env = z.infer<typeof envSchema>;

let cachedEnv: Env | null = null;

export function getEnv(): Env | null {
  if (cachedEnv) return cachedEnv;
  const result = envSchema.safeParse({
    NEXT_PUBLIC_FIREBASE_API_KEY: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN:
      process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    NEXT_PUBLIC_FIREBASE_PROJECT_ID: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET:
      process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID:
      process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    NEXT_PUBLIC_FIREBASE_APP_ID: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID:
      process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
    NEXT_PUBLIC_WHATSAPP_NUMBER: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER,
  });
  if (result.success) {
    cachedEnv = result.data;
    return cachedEnv;
  }
  return null;
}

export function isEnvValid(): boolean {
  return getEnv() !== null;
}

export function requireEnv(): Env {
  const env = getEnv();
  if (!env) {
    throw new Error(
      "Missing Firebase environment variables. Copy .env.example to .env.local and fill in all required values."
    );
  }
  return env;
}
