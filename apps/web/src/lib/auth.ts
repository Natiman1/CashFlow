import { createAuth } from "@repo/auth";
import { db } from "@/lib/db";
// import { sendEmail } from "@/lib/email";
import { headers } from "next/headers";

export const auth = createAuth({
  db,
  // sendEmail,
  googleClientId: process.env.GOOGLE_CLIENT_ID,
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
});

export async function getSession() {
  const result = await auth.api.getSession({ headers: await headers() });
  return result;
}

export async function signOut() {
  const result = await auth.api.signOut({ headers: await headers() });
  return result;
}
