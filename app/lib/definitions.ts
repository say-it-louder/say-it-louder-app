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

export const LoginSchema = z.object({
  email: z
    .string()
    .email({
      message: "enter a valid email",
    })
    .max(150, {
      message: "email must be less than 150 characters long",
    }),
  password: z
    .string()
    .min(6, {
      message: "password must be at least 6 characters long",
    })
    .max(150, {
      message: "email must be less than 150 characters long",
    }),
});

export type LoginInputs = {
  email: string;
  password: string;
  global: string;
};

export const SignUpSchema = LoginSchema.extend({
  fullName: z
    .string()
    .min(3, {
      message: "name must be at least 3 characters long",
    })
    .max(50, {
      message: "name must be less than 50 characters long",
    }),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "passwords must match",
  path: ["confirmPassword"],
});

export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  bio: string;
  avatar: string;
  is_active: boolean;
  active_since: string;
};
