import type { NextApiRequest, NextApiResponse } from "next"
import NextAuth from "next-auth"
import GoogleProvider from 'next-auth/providers/google';
import AtlassianProvider from 'next-auth/providers/atlassian';

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  // Do whatever you want here, before the request is passed down to `NextAuth`
  return await NextAuth(req, res, {
    providers: [
      GoogleProvider({}),
      AtlassianProvider({})
    ]
  })
}
