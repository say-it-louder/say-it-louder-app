import { sql } from "@vercel/postgres";
import { User } from "./definitions";
import { unstable_noStore as noStore } from "next/cache";

export async function getUser(email: string): Promise<User | undefined> {
  noStore();
  try {
    const user = await sql<User>`SELECT * FROM users WHERE email=${email}`;
    //await new Promise((resolve) => setTimeout(resolve, 3000));
    return user.rows[0];
  } catch (error) {
    console.error("Failed to fetch user:", error);
    throw new Error("Failed to fetch user.");
  }
}

export async function getUserAvatar(email: string) {
  noStore();
  try {
    const userAvatar = await sql`SELECT avatar FROM users WHERE email=${email}`;
    await new Promise((resolve) => setTimeout(resolve, 3000));
    return userAvatar.rows[0].avatar;
  } catch (error) {
    console.error("Failed to fetch user:", error);
    throw new Error("Failed to fetch user.");
  }
}
