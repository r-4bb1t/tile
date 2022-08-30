import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";

export default NextAuth({
  providers: [
    // OAuth authentication providers
    GithubProvider({
      clientId: process.env.NEXT_PUBLIC_GITHUB_KEY ?? "",
      clientSecret: process.env.NEXT_PUBLIC_GITHUB_SECRET ?? "",
    }),
  ],
});
