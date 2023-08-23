import NextAuth, { type NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import prisma from '@lib/prisma'
import { PrismaAdapter } from '@next-auth/prisma-adapter'

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    // CredentialsProvider({
    //   credentials: {
    //     email: { label: 'Email', type: 'email' },
    //     password: { label: 'Password', type: 'password' },
    //   },
    //   async authorize(credentials) {
    //     const { email, password } = credentials ?? {}

    //     if (!email || !password) {
    //       throw new Error('Missing username or password');
    //     }

    //     const user = await prisma.user.findUnique({
    //       where: {
    //         email,
    //       },
    //     });

    //     // if user doesn't exist or password doesn't match
    //     if (!user || !(await compare(password, user.password))) {
    //       throw new Error('Invalid username or password');
    //     }

    //     return user;
    //   },
    // }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    })
  ],
}

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
