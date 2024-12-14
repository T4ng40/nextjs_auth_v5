import { RegisterForm } from "@/components/register-form";
import { signIn } from "@/lib/auth";
import { db } from "@/lib/db";
import { registerSchema } from "@/schemas/authSchema";
import { hash } from "bcryptjs";

export default function Page() {
  async function registerAction(formData: FormData) {
    "use server";
    const { success, data } = registerSchema.safeParse(Object.fromEntries(formData));

    if (!success) {
      return;
    }
    const { email, name, password } = data;

    const hashedPassword = await hash(password, 12);

    await db.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
      },
    });

    await signIn("credentials", {
      email,
      password,
      redirectTo: "/dash",
    });
  }

  return (
    <div className="flex h-screen w-full items-center justify-center px-4">
      <RegisterForm registerAction={registerAction} />
    </div>
  );
}
