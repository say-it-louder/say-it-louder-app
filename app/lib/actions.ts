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
    console.log("entering to the try sentence");
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

// Login action
export async function authenticate(prevState: any, formData: FormData) {
  console.log(formData);
}

/* // Login action
export async function authenticate(prevState: any, formData: FormData) {
  try {
    await signIn("credentials", Object.fromEntries(formData));
  } catch (error) {
    if ((error as Error).message.includes("CredentialsSignin")) {
      return "CredentialsSignin";
    }
    throw error;
  }
} */
