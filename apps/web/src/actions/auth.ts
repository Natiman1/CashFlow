"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function registerAction(data: {
  email: string;
  password: string;
  name: string;
}) {
  try {
    const headerStore = await headers();
    const { name, email, password } = data;
    await auth.api.signUpEmail({
      body: { name, email, password },
      headers: headerStore,
    });

    return { success: true };
  } catch (error) {
    if (error instanceof Error) {
      return { error: error.message };
    }
    return { error: "Signup failed" };
  }
}

export async function loginAction(data: { email: string; password: string }) {
  try {
    const headerStore = await headers();
    const { email, password } = data;
    await auth.api.signInEmail({
      body: { email, password },
      headers: headerStore,
    });

    return { success: true };
  } catch (error) {
    if (error instanceof Error) {
      return { error: error.message };
    }
    return { error: "Invalid credentials" };
  }
}

export async function signOutAction() {
  await auth.api.signOut({
    headers: await headers(),
  });
  redirect("/login");
}
