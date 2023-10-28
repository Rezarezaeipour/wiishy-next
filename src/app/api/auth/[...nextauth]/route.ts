// import { login } from "@/api/authentication";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import LinkedInProvider, { LinkedInProfile } from "next-auth/providers/linkedin";
import { signIn } from "next-auth/react";

const handler = NextAuth({

  debug: false,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
      LinkedInProvider({
        clientId: process.env.LINKEDIN_CLIENT_ID as string,
        clientSecret: process.env.LINKEDIN_CLIENT_SECRET as string,
        authorization: {
          params: { scope: 'openid profile email' },
        },
        issuer: 'https://www.linkedin.com',
        jwks_endpoint: 'https://www.linkedin.com/oauth/openid/jwks',
        profile(profile, tokens) {
        
          const defaultImage =
            'https://cdn-icons-png.flaticon.com/512/174/174857.png';
          return {
            id: profile.sub,
            name: profile.name,
            email: profile.email,
            image: profile.picture ?? defaultImage,
            given_name: profile.given_name,
            family_name: profile.family_name,
            locale: profile.locale
          };
        },
      } )
  ],
  callbacks: {
    async signIn(params) {
      const { email, given_name, family_name } = params.user as LinkedInProfile
      // @ts-ignore
      params.user.lastName = family_name
      // @ts-ignore
      const { provider } = params.account
      // const response = await login({ provider, firstName: given_name, lastName: family_name, email })
      try {
        // const data = await response?.json()
        // console.log('response: ')
        // console.log(data)
        return true 
      }
      catch (err) {
        return '/error'
      }
    },
    async jwt({ token, account, profile }) {
    
      if(profile){
         // @ts-ignore
        token.family_name = profile.family_name
         // @ts-ignore
        token.given_name = profile.given_name 
         // @ts-ignore
        token.locale = profile.locale 
      }
      if(account?.provider){
        token.provider = account.provider
      }
      return token
    },
    async session({ token, session, user, newSession, trigger }) {
      if (token && session?.user) {
         // @ts-ignore
        session.user.firstName = token.given_name
         // @ts-ignore
        session.user.lastName = token.family_name
         // @ts-ignore
        session.user.locale = token.locale 
         // @ts-ignore
        session.user.provider = token.provider
        }
      return session;
  },
  },
  pages: {
    signIn: '/login',
    signOut: '/signout',
    error: '/auth/error', // Error code passed in query string as ?error=
    verifyRequest: '/auth/verify-request', // (used for check email message)
    newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
  },

})

export { handler as GET, handler as POST };