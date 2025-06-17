import NextAuth from 'next-auth';
import { prisma } from '@/prisma/prisma';
import { PrismaAdapter } from '@auth/prisma-adapter';
import GitHub from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Google,
    GitHub,
    CredentialsProvider({
      name: 'Guest',
      credentials: {},
      async authorize() {
        const guestEmail = 'guest@example.com';
        const user = await prisma.user.findUnique({
          where: { email: guestEmail },
        });

        if (!user) return null; //ゲストユーザーの存在チェック
        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image,
          totalAmount: user.totalAmount ?? 0,
          jpyAmount: user.jpyAmount ?? 0,
          hisFlg: user.hisFlg,
        };
      },
    }),
  ],
  session: {
    strategy: 'jwt', //ゲストログインがdatabaseではサポートされていない為、jwtを選択
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.image = user.image;
        token.totalAmount = user.totalAmount;
        token.jpyAmount = user.jpyAmount;
        token.hisFlg = user.hisFlg;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token.sub) {
        const user = await prisma.user.findUnique({ where: { id: token.sub } });
        if (user) {
          session.user = {
            ...session.user,
            id: user.id,
            name: user.name ?? '',
            email: user.email,
            image: user.image ?? '',
            totalAmount: user.totalAmount ?? 0,
            jpyAmount: user.jpyAmount ?? 0,
            hisFlg: user.hisFlg,
            createdAt: user.createdAt ?? '',
            updatedAt: user.updatedAt ?? '',
          };
        }
      }
      return session;
    },
  },
});
