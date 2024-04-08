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

export type AuthProviders = {
  provider: "google" | "github";
  label: string;
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

export const PostSchema = z.object({
  content: z
    .string()
    .min(3, { message: "type at least 3 characters" })
    .max(250, { message: "type a maximum of 250 characters" }),
});

export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  bio: string;
  avatar: string;
  is_active: boolean;
  active_since: Date;
  username: string;
};

export type UpdatableUserInfo = {
  id: string;
  name: string;
  bio: string;
  avatar: string;
  username: string;
};

export type Post = {
  post_id: string;
  user_id: string;
  created_by: string;
  created_by_avatar: string;
  user_username: string;
  user_email: string;
  created_at: string;
  content: string;
};

export type PostRaw = Omit<Post, "created_at"> & {
  created_at: Date;
};

export type Comment = {
  id: string;
  post_id: string;
  parent_comment_id: string;
  user_id: string;
  user_name: string;
  user_username: string;
  user_avatar: string;
  created_at: string;
  content: string;
};

export type CommentRaw = Omit<Comment, "created_at"> & {
  created_at: Date;
};

export type Reaction = {
  id: string;
  label: string;
  image: string;
  type: string;
  reaction_count: string;
};

export const AVATARS = [
  "avatar1",
  "avatar2",
  "avatar3",
  "avatar4",
  "avatar5",
  "avatar6",
  "avatar7",
  "avatar8",
  "avatar9",
  "avatar10",
] as const;

export const UpdateUserInfoSchema = z.object({
  avatarSelection: z.enum(AVATARS, {
    invalid_type_error: "Wrong avatar selection",
  }),
  userFullName: z
    .string()
    .min(3, {
      message: "name must be at least 3 characters long",
    })
    .max(50, {
      message: "name must be less than 50 characters long",
    }),
  userBio: z
    .string()
    .min(3, {
      message: "bio must be at least 3 characters long",
    })
    .max(50, {
      message: "bio must be less than 50 characters long",
    }),
  username: z
    .string()
    .min(3, {
      message: "username must be at least 3 characters long",
    })
    .max(50, {
      message: "username must be less than 50 characters long",
    }),
});
