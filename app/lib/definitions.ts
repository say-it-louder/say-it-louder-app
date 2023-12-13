import { IconType } from "react-icons";
import { z } from "zod";

export type SearchProp = {
  className?: string;
  refProp?: React.MutableRefObject<null>;
};

export type LinkBtnProp = {
  label: string;
  icon: IconType;
  href: string;
};

export const signUpSchema = z
  .object({
    fullName: z
      .string()
      .min(3, {
        message: "name must be at least 3 characters long",
      })
      .max(50, {
        message: "name must be less than 50 characters long",
      }),
    email: z.string().email({
      message: "enter a valid email",
    }),
    password: z.string().min(6, {
      message: "password must be at least 6 characters long",
    }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "passwords must match",
    path: ["confirmPassword"],
  });
