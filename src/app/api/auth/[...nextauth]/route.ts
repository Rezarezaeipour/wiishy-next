import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import LinkedInProvider from "next-auth/providers/linkedin";

const handler = NextAuth({
  
  debug:true,
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
      })
    
  ],
  pages: {
    signIn: '/login',
    signOut: '/auth/signout',
    error: '/auth/error', // Error code passed in query string as ?error=
    verifyRequest: '/auth/verify-request', // (used for check email message)
    newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
  },
  
})

export { handler as GET, handler as POST };