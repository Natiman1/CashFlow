import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/lib/db";
import * as schema from "@/db/schema/auth";
import { headers } from "next/headers";
import { sendEmail } from "@/lib/email";
export const auth = betterAuth({
  database: drizzleAdapter(db, {
    schema,
    provider: "pg",
  }),

  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    autoSignIn: false,
  },

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      prompt: "select_account",
    },
  },

  emailVerification: {
    sendVerificationEmail: async ({ user, url }) => {
      console.log("VERIFICATION URL:", url);
      await sendEmail({
        email: user.email,
        url,
      });
    },
    sendOnSignUp: true,
    sendOnSignIn: true,
  },
  advanced: {
    // @ts-expect-error - generateId is required for UUIDs despite type definition
    generateId: "uuid",
  },
});

export async function getSession() {
  const result = await auth.api.getSession({ headers: await headers() });

  return result;
}

export async function signOut() {
  const result = await auth.api.signOut({ headers: await headers() });

  return result;
}
