import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    role: string;
    prideAccepted: boolean;
  }

  interface Session {
    user: {
      id: string;
      role: string;
      prideAccepted: boolean;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: string;
    prideAccepted: boolean;
  }
}
