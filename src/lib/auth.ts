import { loginSchema } from "@/schemas/loginSchema";
import { compare } from "bcryptjs";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import { db } from "./db";

const schema = z.object({
  email: z.string().min(1).email(),
  password: z.string().min(8),
});

export const { auth, signIn, signOut, handlers } = NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
    Credentials({
      authorize: async (credentials) => {
        const { success, data } = loginSchema.safeParse(credentials);

        if (!success) {
          return null;
        }
        const { email, password } = data;

        const user = await db.user.findUnique({
          where: {
            email,
          },
        });

        if (!user) {
          return null;
        }

        const isPasswordValid = await compare(password, user.password);

        if (!isPasswordValid) {
          return null;
        }

        return {
          email: user.email,
          id: user.id,
          name: user.name,
        };
      },
    }),
  ],
});
