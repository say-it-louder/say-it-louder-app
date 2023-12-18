"use server";
import { sql } from "@vercel/postgres";
import { redirect } from "next/navigation";
import { SignUpSchema } from "./definitions";
import bcrypt from "bcrypt";

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
  const currentDate = new Date().toISOString();

  // Insert data into the database
  try {
    await sql`INSERT INTO users (name, email, password, active_since)
  VALUES (${fullName}, ${email}, ${hashedPassword}, ${currentDate})`;
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
    const currentDate = new Date().toISOString();
    await sql`INSERT INTO users (name, email, active_since)
  VALUES (${name}, ${email}, ${currentDate})`;
  } catch (error) {
    console.error("Failed to fetch user:", error);
    throw new Error("Failed to create the user.");
  }
}