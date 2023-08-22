import NextAuth, { type NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google'
import prisma from '@lib/prisma';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { compare } from 'bcrypt';

const authOptions: NextAuthOptions = {
  secret: 'e82644d188b2b8fdbc3d69cd5b1e7a5e',
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const { email, password } = credentials ?? {}

        if (!email || !password) {
          throw new Error('Missing username or password');
        }

        const user = await prisma.user.findUnique({
          where: {
            email,
          },
        });

        // if user doesn't exist or password doesn't match
        if (!user || !(await compare(password, user.password))) {
          throw new Error('Invalid username or password');
        }

        return user;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    })
  ],
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
