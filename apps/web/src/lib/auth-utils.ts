
import { redirect } from "next/navigation";
import { auth } from "./auth";
import { headers } from "next/headers";

export const authSession = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    return null;
  }
  return session;
};

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
