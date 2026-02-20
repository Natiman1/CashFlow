import { redirect } from "next/navigation";
import { auth } from "./auth";
import { headers } from "next/headers";
import { cache } from "react";

export const authSession = cache(async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    return null;
  }
  return session;
});

export const authIsRequired = async () => {
  const session = await authSession();
  if (!session) {
    redirect("/login");
  }
  return session;
};

export const authIsNotRequired = async () => {
  const session = await authSession();
  if (session) {
    redirect("/dashboard");
  }
  return session;
};

export const getUser = cache(async () => {
  const session = await authSession();

  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  return session.user;
});

export function isDemoUser(user: { email: string }) {
  return user.email === "demo@cashflow.app";
}
