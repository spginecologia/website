/* * */

import NextAuth from 'next-auth';
import EmailProvider from 'next-auth/providers/email';
import { MongoDBAdapter } from '@auth/mongodb-adapter';
import clientPromise from '@/services/mongodb-adapter';
import MONGOOSE from '@/services/MONGOOSE';
import { UserModel } from '@/schemas/User/model';

/* * */

export const authOptions = {
  debug: false,
  adapter: MongoDBAdapter(clientPromise),
  session: { strategy: 'jwt' },
  providers: [
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
    }),
  ],
  pages: {
    signIn: '/login',
    verifyRequest: '/login/verify',
    error: '/login/error',
  },
  callbacks: {
    async signIn({ user }) {
      try {
        await MONGOOSE.connect();
        const foundUser = await UserModel.exists({ email: user.email });
        if (!foundUser) return false;
        else return true;
      } catch (err) {
        console.log(err);
        return false;
      }
    },
    async session({ session, token }) {
      try {
        if (token.email) {
          await MONGOOSE.connect();
          const foundUser = await UserModel.findOneAndUpdate({ email: token.email }, { last_active: new Date() }, { new: true });
          if (foundUser) session.user = foundUser;
          return session;
        }
        throw new Error('JWT Token did not have the email property.');
      } catch (err) {
        console.log(err);
        return false;
      }
    },
  },
};

/* * */

export default NextAuth(authOptions);
