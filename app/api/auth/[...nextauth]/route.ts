import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { z } from "zod";
import { User } from "@/app/lib/definitions";
import { sql } from "@vercel/postgres";
import bcrypt from "bcrypt";
import { createUserFromProvider } from "@/app/lib/actions";

async function getUser(email: string): Promise<User | undefined> {
  try {
    const user = await sql<User>`SELECT * FROM users WHERE email=${email}`;
    return user.rows[0];
  } catch (error) {
    console.error("Failed to fetch user:", error);
    throw new Error("Failed to fetch user.");
  }
}

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
          if (!user) return null;
          const passwordsMatch = await bcrypt.compare(password, user.password);
          console.log(user);
          if (passwordsMatch) return user;
        }
        return null;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      try {
        if (account?.provider === "credentials") {
          return true;
        }

        if (account?.provider === "google" && user) {
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
  },
});

export { handler as GET, handler as POST };
