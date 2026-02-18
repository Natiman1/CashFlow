import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import * as schema from "@repo/db";

export type AuthOptions = {
  db: any;
  sendEmail: (data: { email: string; url: string }) => Promise<void>;
  googleClientId?: string;
  googleClientSecret?: string;
};

export const createAuth = ({
  db,
  sendEmail,
  googleClientId,
  googleClientSecret,
}: AuthOptions) => {
  return betterAuth({
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
        clientId: googleClientId as string,
        clientSecret: googleClientSecret as string,
        prompt: "select_account",
      },
    },

    emailVerification: {
      sendVerificationEmail: async ({ user, url }) => {
        await sendEmail({
          email: user.email,
          url,
        });
      },
      sendOnSignUp: true,
      sendOnSignIn: true,
    },

    session: {
      expiresIn: 60 * 60 * 24 * 3, // 3 days
      updateAge: 60 * 60 * 24, // 1 day (every 1 day the session expiration is updated)
      cookieCache: {
        enabled: true,
        maxAge: 5 * 60, // Cache duration in seconds (5 minutes)
      },
    },

    
  });
};
