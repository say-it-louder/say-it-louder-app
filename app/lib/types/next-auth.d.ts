import NextAuth, { DefaultUser } from "next-auth";

declare module "next-auth" {
  interface User extends DefaultUser {
    id: string;
    active_since: Date;
  }
  interface Session {
    user: {
      activeSince: string;
      email: string;
      id: string;
      name: string;
    };
  }
}
