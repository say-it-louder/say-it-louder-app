import { sql } from "@vercel/postgres";
import { unstable_noStore as noStore } from "next/cache";
import { User, PostRaw } from "@/app/lib/definitions";
import { formatDate } from "@/app/lib/utils";

export async function getUser(email: string): Promise<User | undefined> {
  noStore();
  try {
    const user = await sql<User>`SELECT * FROM users WHERE email=${email}`;
    const userResult = user.rows[0];
    //await new Promise((resolve) => setTimeout(resolve, 3000));
    if (!userResult) {
      throw new Error(`No user found with email: ${email}`);
    }
    return userResult;
  } catch (error) {
    console.error("Failed to fetch user:", error);
    throw new Error("Failed to fetch user.");
  }
}

export async function getUserAvatar(email: string) {
  noStore();
  try {
    const userAvatar = await sql`SELECT avatar FROM users WHERE email=${email}`;
    const userAvatarResult = userAvatar.rows[0];
    if (!userAvatarResult) {
      throw new Error(`No user found with email: ${email}`);
    }
    return userAvatarResult.avatar;
  } catch (error: any) {
    console.error(
      `Failed to fetch user avatar for email ${email}: ${error.message}`
    );
    throw new Error(`Failed to fetch user avatar for email ${email}`);
  }
}

export async function getAllPosts() {
  noStore();
  try {
    const data = await sql<PostRaw>`SELECT 
    p.id AS post_id,
    u.id AS user_id,
    u.name AS created_by,
    u.avatar AS created_by_avatar,
    p.created_at,
    p.content
  FROM 
    posts p 
  JOIN 
    users u ON p.user_id = u.id
  ORDER BY
      p.created_at DESC;`;

    const posts = data.rows.map((post) => ({
      ...post,
      created_at: formatDate(post.created_at),
    }));

    return posts;
  } catch (error) {
    console.error("Failed to fetch posts:", error);
    throw new Error("Failed to fetch posts.");
  }
}
