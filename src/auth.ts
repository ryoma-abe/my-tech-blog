import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import prisma from "./lib/prisma";
import bcryptjs from "bcryptjs";
import type { User } from "next-auth";

// ユーザー取得関数
async function getUser(email: string) {
  return await prisma.user.findUnique({
    where: { email: email },
  });
}
export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      credentials: {
        email: { label: "メール", type: "text" },
        password: { label: "パスワード", type: "password" },
      },
      async authorize(credentials): Promise<User | null> {
        if (!credentials) return null;

        const parsed = z
          .object({
            email: z.string().email(),
            password: z.string().min(6),
          })
          .safeParse(credentials);
        if (!parsed.success) return null;

        const { email, password } = parsed.data;
        const user = await getUser(email);
        if (!user || !user.password) return null;

        const ok = await bcryptjs.compare(password, user.password);
        if (!ok) return null;

        // NextAuth が要求する形で返す（id は文字列に揃える）
        return {
          id: String(user.id),
          name: user.name,
          email: user.email,
        };
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (session.user) {
        session.user.id = (token.id || token.sub || "") as string;
        session.user.name = token.name ?? "";
        session.user.email = token.email ?? "";
      }
      return session;
    },
  },
});
