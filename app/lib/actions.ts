"use server";
import { z } from "zod";
import { sql } from "@vercel/postgres";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
const bcrypt = require("bcrypt");

const FormSchema = z.object({
  fullName: z
    .string()
    .min(3, {
      message: "Name must be at least 3 characters long",
    })
    .max(50, {
      message: "Name must be less than 50 characters long",
    }),
  email: z.string().email({
    message: "Please enter a valid email",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters long",
  }),
  confirmPassword: z.string().min(6, {
    message: "Password must be at least 6 characters long",
  }),
});

export type State = {
  errors?: {
    fullName?: string[];
    email?: string[];
    password?: string[];
    confirmPassword?: string[];
  };
  message?: string | null;
};

export async function createUser(prevState: any, formData: FormData) {
  //// Validate form fields using Zod

  const validatedFields = FormSchema.safeParse({
    fullName: formData.get("userName"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  });

  // If form validation fails, return errors early. Otherwise, continue.
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create User.",
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
    console.log("user inserted into the database");
  } catch (error) {
    return {
      message: "Database Error: Failed to Create User.",
    };
  }

  redirect(`/login`);
}
