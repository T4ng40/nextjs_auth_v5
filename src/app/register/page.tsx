import { RegisterForm } from "@/components/register-form";
import { db } from "@/lib/db";
import { hash } from "bcryptjs";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().min(1).email(),
  password: z.string().min(8),
});

export default function Page() {
  async function registerAction(formData: FormData) {
    "use server";
    const { success, data } = schema.safeParse(Object.fromEntries(formData));

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
  }

  return (
    <div className="flex h-screen w-full items-center justify-center px-4">
      <RegisterForm registerAction={registerAction} />
    </div>
  );
}
