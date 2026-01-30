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
    autoSignInAfterVerification: true,
  },

  emailVerification: {
    sendVerificationEmail: async ({ user, url }) => {
       console.log("VERIFICATION URL:", url)
      await sendEmail({
        email: user.email,
        url,
      });
    },
    sendOnSignUp: true,
    sendOnSignIn: true,
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
