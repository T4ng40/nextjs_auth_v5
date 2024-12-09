import { LoginForm } from "@/components/login-form";
import { signIn } from "@/lib/auth";
import { loginSchema } from "@/schemas/loginSchema";
import { AuthError, CredentialsSignin } from "next-auth";

export default function Page() {
  async function loginAction(formData: FormData) {
    "use server";
    const { success, data } = loginSchema.safeParse(
      Object.fromEntries(formData)
    );

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
  return (
    <div className="flex h-screen w-full items-center justify-center px-4">
      <LoginForm loginAction={loginAction} />
    </div>
  );
}
