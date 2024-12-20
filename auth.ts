// import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./utils/prisma";

import Credentials from "next-auth/providers/credentials";
import NextAuth from "next-auth";

import { compare } from "bcryptjs";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: "Credentials",

      async authorize(credentials) {
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email as string,
          },
        });

        if (!user) {
          throw new Error("Invalid credentials");
        }

        if (!user.password) {
          throw new Error("Please set your password");
        }

        const passwordMatch = await compare(credentials.password as string, user.password);
        if (!passwordMatch) {
          throw new Error("Invalid credentials");
        }

        return {
          id: user?.id,
          email: user?.email,
          name: user?.name,
          role: user?.role,
        } as any;
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      // session.user.id = token.sub;
      if (token.role) {
        session.user.role = token.role; // Add role to the session
      }

      return session;
    },

    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
        token.role = user.role;
      }
      return token;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/auth/signin",
  },
});
