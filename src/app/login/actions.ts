"use server";

import { signIn } from "@/lib/auth";
import { loginSchema } from "@/schemas/loginSchema";
import { magicLinkSchema } from "@/schemas/magicLinkSchema";
import { AuthError, CredentialsSignin } from "next-auth";

export async function loginAction(formData: FormData) {
  "use server";
  const { success, data } = loginSchema.safeParse(Object.fromEntries(formData));

  if (!success) {
    return;
  }

  const { email, password } = data;

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: "/dash",
    });
  } catch (error) {
    if (error instanceof CredentialsSignin) {
      return { error: "Invalid credentials" };
    }

    if (error instanceof AuthError) {
      return { error: "Something went wrong. Try again" };
    }

    throw error;
  }
}

export async function magicLinkAction(formData: FormData) {
  "use server";
  const { success, data } = magicLinkSchema.safeParse(
    Object.fromEntries(formData)
  );

  if (!success) {
    return;
  }

  const { email } = data;

  await signIn("magic-link", {
    email,
    redirectTo: "/dash",
  });
}
