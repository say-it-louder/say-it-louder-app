import { sql } from "@vercel/postgres";
import { unstable_noStore as noStore } from "next/cache";
import {
  User,
  PostRaw,
  UpdatableUserInfo,
  CommentRaw,
  Reaction,
} from "@/app/lib/definitions";
import { formatDate } from "@/app/lib/utils";

export async function getUser(email: string): Promise<User | undefined> {
  noStore();
  try {
    const user = await sql<User>`SELECT * FROM users WHERE email=${email}`;
    const userResult = user.rows[0];
    //await new Promise((resolve) => setTimeout(resolve, 3000));
    return userResult;
  } catch (error) {
    console.error("Failed to fetch user:", error);
    throw new Error("Failed to fetch user.");
  }
}

export async function getUserById(id: string): Promise<User | undefined> {
  noStore();
  try {
    const user = await sql<User>`SELECT * FROM users WHERE id=${id}`;
    const userResult = user.rows[0];
    //await new Promise((resolve) => setTimeout(resolve, 3000));
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

export async function getUpdatableUserInfo(email: string) {
  noStore();
  try {
    const updatableUserInfo =
      await sql<UpdatableUserInfo>`SELECT id, name, bio, avatar, username FROM users WHERE email=${email}`;
    return updatableUserInfo.rows[0];
  } catch (error) {
    console.error("Failed to fetch user:", error);
    throw new Error("Failed to fetch user.");
  }
}

export async function getAllPosts(query: string) {
  noStore();
  try {
    const data = await sql<PostRaw>`
    SELECT 
      p.id AS post_id,
      u.id AS user_id,
      u.name AS created_by,
      u.avatar AS created_by_avatar,
      u.username AS user_username,
      u.email AS user_email, 
      p.created_at,
      p.content
    FROM 
      posts p 
    JOIN 
      users u ON p.user_id = u.id
    WHERE
      u.name ILIKE ${`%${query}%`} OR
      u.username ILIKE ${`%${query}%`} OR
      p.content ILIKE ${`%${query}%`}
    ORDER BY
      p.created_at DESC;`;

    const posts = data.rows.map((post) => ({
      ...post,
      created_at: formatDate(post.created_at),
    }));
    //await new Promise((resolve) => setTimeout(resolve, 5000));
    return posts;
  } catch (error) {
    console.error("Failed to fetch posts:", error);
    throw new Error("Failed to fetch posts.");
  }
}

export async function getPostByUser({
  email,
  query,
}: {
  email: string;
  query: string;
}) {
  noStore();
  try {
    const data = await sql<PostRaw>`
    SELECT 
      p.id AS post_id,
      u.id AS user_id,
      u.name AS created_by,
      u.avatar AS created_by_avatar,
      u.username AS user_username, 
      u.email AS user_email,
      p.created_at,
      p.content
    FROM 
      posts p 
    JOIN 
      users u ON p.user_id = u.id
    WHERE
      u.email = ${`${email}`} AND
      p.content ILIKE ${`%${query}%`} 
    ORDER BY
      p.created_at DESC`;

    const posts = data.rows.map((post) => ({
      ...post,
      created_at: formatDate(post.created_at),
    }));
    //await new Promise((resolve) => setTimeout(resolve, 3000));
    return posts;
  } catch (error) {
    console.error("Failed to fetch posts:", error);
    throw new Error("Failed to fetch posts.");
  }
}

export async function getPostById(id: string) {
  noStore();
  try {
    const data = await sql<PostRaw>`
    SELECT 
      p.id AS post_id,
      u.id AS user_id,
      u.name AS created_by,
      u.avatar AS created_by_avatar,
      u.username AS user_username, 
      u.email AS user_email,
      p.created_at,
      p.content
    FROM 
      posts p 
    JOIN 
      users u ON p.user_id = u.id
    WHERE
      p.id = ${`${id}`}      
    ORDER BY
      p.created_at DESC`;

    const postInfo = {
      ...data.rows[0],
      created_at: formatDate(data.rows[0].created_at),
    };
    //await new Promise((resolve) => setTimeout(resolve, 5000));
    return postInfo;
  } catch (error) {
    console.error("Failed to fetch post:", error);
    throw new Error("Failed to fetch post.");
  }
}

export async function getCommentsByPost({
  postId,
  query,
}: {
  postId: string;
  query: string;
}) {
  noStore();
  try {
    const data = await sql<CommentRaw>`
    SELECT
      c.id, c.post_id, u.id AS user_id, u.name AS user_name, u.username AS user_username, u.avatar AS user_avatar, c.created_at, c.content
    FROM
      users u
    JOIN 
      comments c on u.id = c.user_id
    WHERE 
      c.post_id = ${`${postId}`} 
      AND
      c.parent_comment_id is null
      AND
        (u.name ILIKE ${`%${query}%`}
        OR
        u.username ILIKE ${`%${query}%`} 
        OR
        c.content ILIKE ${`%${query}%`})
    ORDER BY
      c.created_at DESC;   
    `;
    const comments = data.rows.map((comment) => ({
      ...comment,
      created_at: formatDate(comment.created_at),
    }));
    //await new Promise((resolve) => setTimeout(resolve, 3000));
    return comments;
  } catch (error) {
    console.error("Failed to fetch comment:", error);
    throw new Error("Failed to fetch comment.");
  }
}

export async function getCommentById(commentId: string) {
  noStore();
  try {
    const data = await sql<CommentRaw>`
    SELECT
      c.id, c.post_id, c.parent_comment_id, u.id AS user_id, u.name AS user_name, u.username AS user_username, u.avatar AS user_avatar, c.created_at, c.content
    FROM
      users u
    JOIN 
      comments c on u.id = c.user_id
    WHERE 
      c.id = ${`${commentId}`}
    `;
    const commentInfo = {
      ...data.rows[0],
      created_at: formatDate(data.rows[0].created_at),
    };
    //await new Promise((resolve) => setTimeout(resolve, 5000));
    return commentInfo;
  } catch (error) {
    console.error("Failed to fetch comment:", error);
    throw new Error("Failed to fetch comment.");
  }
}

export async function getCommentsByCommentId({
  commentId,
  query,
}: {
  commentId: string;
  query: string;
}) {
  noStore();
  try {
    const data = await sql<CommentRaw>`
    SELECT
      c.id, c.post_id, u.id AS user_id, u.name AS user_name, u.username AS user_username, u.avatar AS user_avatar, c.created_at, c.content
    FROM
      users u
    JOIN 
      comments c on u.id = c.user_id
    WHERE 
      c.parent_comment_id = ${`${commentId}`}
      AND
      (u.name ILIKE ${`%${query}%`}
      OR
      u.username ILIKE ${`%${query}%`} 
      OR
      c.content ILIKE ${`%${query}%`}) 
    ORDER BY
      c.created_at DESC;   
    `;
    const comments = data.rows.map((comment) => ({
      ...comment,
      created_at: formatDate(comment.created_at),
    }));
    //await new Promise((resolve) => setTimeout(resolve, 3000));
    return comments;
  } catch (error) {
    console.error("Failed to fetch comment:", error);
    throw new Error("Failed to fetch comment.");
  }
}

export async function getNumberOfComments({
  id,
  type,
}: {
  id: string;
  type: string;
}) {
  noStore();
  try {
    const query =
      type === "post"
        ? sql`SELECT COUNT(*) FROM comments WHERE post_id = ${id} AND parent_comment_id IS NULL`
        : sql`SELECT COUNT(*) FROM comments WHERE parent_comment_id = ${id}`;

    const data = await query;
    const numberOfComments = data.rows[0]?.count || 0;

    return numberOfComments;
  } catch (error) {
    console.error("Failed to fetch number of comments:", error);
    throw new Error("Failed to fetch number of comments.");
  }
}

export async function getReactionsByPost(postId: string) {
  noStore();
  try {
    const data = await sql<Reaction>`
    SELECT 
      r.id, r.label, r.image, COUNT(rp.reaction_id) AS reaction_count
    FROM 
      reactions r
    LEFT JOIN 
      reactions_posts rp 
      ON r.id = rp.reaction_id 
      AND rp.post_id = ${`${postId}`}
    GROUP BY r.id, r.label, r.image
    ORDER BY r.label DESC;
    `;
    return data.rows;
  } catch (error) {
    console.error("Failed to fetch reactions");
    throw new Error("Failed to fetch reactions");
  }
}

export async function getReactionByUser({
  userEmail,
  postId,
}: {
  userEmail: string;
  postId: string;
}) {
  noStore();
  try {
    const data = await sql`
    SELECT reaction_id
    FROM reactions_posts
    WHERE post_id = ${`${postId}`} 
      AND user_id = (SELECT id from users WHERE email = ${`${userEmail}`})`;
    return data.rows[0];
  } catch (error) {
    console.error("Failed to fetch reaction");
    throw new Error("Failed to fetch reaction");
  }
}
