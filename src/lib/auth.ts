import { loginSchema } from "@/schemas/loginSchema";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { compare } from "bcryptjs";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { Resend } from "resend";
import { db } from "./db";

const resend = new Resend(process.env.AUTH_RESEND_KEY);
export const { auth, signIn, signOut, handlers } = NextAuth({
  pages: {
    error: "/login",
    signIn: "/login",
    verifyRequest: "/login?magic-link=true",
  },
  adapter: PrismaAdapter(db),
  session: {
    strategy: "jwt",
  },
  providers: [
    // Resend({
    //   from: "Acme <onboarding@resend.dev>",
    // }),
    {
      id: "magic-link",
      type: "email",
      name: "Magic Link",
      async sendVerificationRequest({ identifier, url }) {
        const from = "Auth <suporte@resend.dev>";

        await resend.emails.send({
          from,
          to: [identifier],
          subject: "Sign in to Next Auth",
          html: `<a href="${url}">Click here</a> to sign in to your account.`,
        });
      },
      maxAge: 24 * 60 * 60,
    },
    Google({
      allowDangerousEmailAccountLinking: true,
    }),
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

        if (!user || !user.password) {
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
  events: {},
  callbacks: {
    jwt({ token }) {
      return token;
    },
    session({ session, token }) {
      if (token.sub) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
});
