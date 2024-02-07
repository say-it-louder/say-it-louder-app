"use server";
import { unstable_noStore as noStore, revalidatePath } from "next/cache";
import { sql } from "@vercel/postgres";
import { redirect } from "next/navigation";
import {
  SignUpSchema,
  PostSchema,
  UpdateUserInfoSchema,
} from "@/app/lib/definitions";
import bcrypt from "bcrypt";
import { isUsernameAvailable } from "@/app/lib/utils";

export async function createUser(prevState: any, formData: FormData) {
  // Validate form fields using Zod
  const validatedFields = SignUpSchema.safeParse({
    fullName: formData.get("fullName"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "missing fields; failed to create user.",
    };
  }

  // Prepare data for insertion into the database
  const { fullName, email, password } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);
  const lowerCaseEmail = email.toLocaleLowerCase();
  // Insert data into the database
  try {
    await sql`INSERT INTO users (name, email, password)
  VALUES (${fullName}, ${lowerCaseEmail}, ${hashedPassword})`;
  } catch (error: any) {
    if (error.code === "23505") {
      return {
        message: "the e-mail address is already registered.",
      };
    }
    return {
      message: `database error: failed to create user, error code: ${error.code}`,
    };
  }

  // Redirect to the login page
  redirect(`/login`);
}

// Create user from provider
export async function createUserFromProvider({
  name,
  email,
}: {
  name: string;
  email: string;
}) {
  try {
    await sql`INSERT INTO users (name, email)
  VALUES (${name}, ${email})`;
  } catch (error) {
    console.error("Failed to fetch user:", error);
    throw new Error("Failed to create the user.");
  }
}
// create post
export async function createPost(
  userId: string,
  prevState: any,
  formData: FormData
) {
  noStore();
  const validatedFields = PostSchema.safeParse({
    content: formData.get("content"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "missing fields; failed to create post.",
    };
  }
  const { content: postContent } = validatedFields.data;

  try {
    await sql`INSERT INTO POSTS (user_id, content) VALUES (${userId}, ${postContent})
    `;
  } catch (error: any) {
    return {
      message: `database error: failed to create post, error code: ${error.code}`,
    };
  }
  redirect(`/dashboard`);
}

// Update user information
export async function updateUserInfo(
  userId: string,
  prevState: any,
  formData: FormData
) {
  noStore();
  const validatedFields = UpdateUserInfoSchema.safeParse({
    avatarSelection: formData.get("avatarSelection"),
    userFullName: formData.get("userFullName"),
    userBio: formData.get("userBio"),
    username: formData.get("username"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "missing fields; failed to update user info.",
    };
  }
  const { avatarSelection, userFullName, userBio, username } =
    validatedFields.data;

  const lowerUsername = username.toLowerCase().trim();

  const isAvailableUsername = await isUsernameAvailable(userId, lowerUsername);

  if (!isAvailableUsername)
    return {
      errors: { username: ["username already exists."] },
      message: "failed to update user. try with another username",
    };
  try {
    await sql`UPDATE users SET avatar= ${avatarSelection}, name = ${userFullName},      bio = ${userBio}, username=${lowerUsername} WHERE id = ${userId}`;
  } catch (error: any) {
    return {
      message: `database error: failed to update user, ${error}, error code: ${error.code}`,
    };
  }
  redirect("/dashboard");
}

// Delete post
export async function deletePost(postId: string) {
  try {
    await sql`DELETE FROM comments WHERE post_id = ${postId}`;
    await sql`DELETE FROM reactions_posts WHERE post_id = ${postId}`;
    await sql`DELETE FROM posts WHERE id = ${postId}`;
    //await new Promise((resolve) => setTimeout(resolve, 5000));
  } catch (error) {
    return { message: "Database Error: Failed to Delete Invoice." };
  }
  revalidatePath("/");
}

//Create comment
export async function createComment(
  commentKeys: { user: string; post: string; commentParent?: string },
  prevState: any,
  formData: FormData
) {
  noStore();
  const validatedFields = PostSchema.safeParse({
    content: formData.get("content"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "missing fields; failed to create comment.",
    };
  }
  const { user, post, commentParent } = commentKeys;
  const { content: commentContent } = validatedFields.data;

  try {
    await sql`INSERT INTO comments (user_id, post_id, parent_comment_id, content) VALUES (${user}, ${post}, ${commentParent}, ${commentContent})
    `;
  } catch (error: any) {
    return {
      message: `database error: failed to create comment, error code: ${error.code}`,
    };
  }
  revalidatePath("/");
}

//Insert reaction
export async function insertReaction({
  reactionId,
  postId,
  userId,
}: {
  reactionId: string;
  postId: string;
  userId: string;
}) {
  noStore();
  try {
    //check if user has reacted to the current post
    const hasUserReactedData = await sql`
    SELECT
    EXISTS (
      SELECT 1
      FROM reactions_posts
      WHERE user_id = ${userId} AND post_id = ${postId}
    ) AS has_reacted;`;

    const isTheSameReactionData = await sql`
    SELECT
    EXISTS (
      SELECT 1
      FROM reactions_posts
      WHERE user_id = ${userId} AND post_id = ${postId} AND reaction_id = ${reactionId}
    ) AS is_same_reaction;`;

    const { has_reacted: hasUserReacted } = hasUserReactedData.rows[0];
    const { is_same_reaction: isSameReaction } = isTheSameReactionData.rows[0];

    if (hasUserReacted) {
      await sql`
      DELETE FROM reactions_posts
      WHERE user_id = ${userId} AND post_id = ${postId}`;
    }

    if (!isSameReaction || !hasUserReacted) {
      await sql`INSERT INTO reactions_posts (reaction_id, post_id, user_id)
    VALUES (${reactionId}, ${postId}, ${userId});`;
    }
  } catch (error: any) {
    console.error("Failed to insert reaction", error.message);
  }
  revalidatePath("/");
}
