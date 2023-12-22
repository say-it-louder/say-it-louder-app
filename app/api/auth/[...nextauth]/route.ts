import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import { z } from "zod";
import bcrypt from "bcrypt";
import { createUserFromProvider } from "@/app/lib/actions";
import { getUser } from "@/app/lib/data";

const handler = NextAuth({
  pages: {
    signIn: "/login",
    signOut: "/",
  },
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials: any) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const user = await getUser(email);
          if (!user) throw new Error("the user does not exist.");
          // If no password in the database the user registered with provider
          if (!user.password) throw new Error("sing in with your provider.");
          const passwordsMatch = await bcrypt.compare(password, user.password);
          //console.log("user from credentials", user);
          if (passwordsMatch) return user;
        }
        return null;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      try {
        if (account?.provider === "credentials") {
          return true;
        }
        if (
          (account?.provider === "google" || account?.provider === "github") &&
          user
        ) {
          const { name, email } = user;
          if (!name || !email) {
            console.error("Invalid user data");
            return false;
          }
          const existingUser = await getUser(email);

          if (!existingUser) {
            console.log("User is not in the database:", name);
            // Insert the user into the database
            await createUserFromProvider({ name, email });
            console.log("User saved in the database");
          }

          return true;
        }
        console.error("Invalid account provider:", account?.provider);
        return false;
      } catch (error) {
        console.error("Error during sign-in:", error);
        return false;
      }
    },
    async jwt({ token, user, account }) {
      if (account?.provider === "google" || account?.provider === "github") {
        if (user && token.email) {
          const newUser = await getUser(token.email);
          if (newUser) {
            return {
              ...token,
              id: newUser.id,
              avatar: newUser.avatar,
              bio: newUser.bio,
              activeSince: newUser.active_since,
            };
          }
        }
      }
      if (account?.provider === "credentials") {
        if (user) {
          return {
            ...token,
            id: user.id,
            activeSince: user.active_since,
          };
        }
      }

      return token;
    },
    async session({ session, token }) {
      //console.log("session callback", { session, token });
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          activeSince: token.activeSince,
        },
      };
    },
  },
});

export { handler as GET, handler as POST };
