import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";

import { authConfig } from "./auth.config";
import { db } from "./db";

import { Resend } from "resend";

const resend = new Resend(process.env.AUTH_RESEND_KEY);

export const { auth, signIn, signOut, handlers } = NextAuth({
  providers: [
    ...authConfig.providers,
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
  ],
  pages: {
    error: "/login",
    signIn: "/login",
    verifyRequest: "/login?magic-link=true",
  },
  adapter: PrismaAdapter(db),
  session: {
    strategy: "jwt",
  },

  events: {},
  callbacks: {
    jwt({ token, user }) {
      if (user?.role) {
        token.role = user.role;
      }
      return token;
    },
    session({ session, token }) {
      if (token.sub) {
        session.user.id = token.sub;
      }

      if (token.role) {
        session.user.role = token.role;
      }
      return session;
    },
  },
});
