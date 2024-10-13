import { NextAuthOptions } from "next-auth";
import GoogleAuthProvider from "next-auth/providers/google";
import prisma from "./prisma";
export const nextAuthOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleAuthProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      let existingUser = await prisma.user.findUnique({
        where: {
          email: user.email as string,
        },
      });

      if (!existingUser)
        existingUser = await prisma.user.create({
          data: {
            username: user.name as string,
            email: user.email as string,
          },
        });
      return true;
    },

    async jwt({ token, user }) {
      if (user) {
        const dbUser = await prisma.user.findUnique({
          where: {
            email: user.email as string,
          },
        });
        if (dbUser) {
          token.id = dbUser.id;
        }
      }

      return {
        ...token,
        name: token.name,
        sub: token.sub,
        email: token.email,
        picture: token.picture,
      };
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.email = token.email;
        session.user.image = token.picture;
        session.user.name = token.name;
        session.user.id = token.id as string;
      }

      return session;
    },
  },
};
