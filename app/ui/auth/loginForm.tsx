"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { LoginInputs, LoginSchema } from "../../lib/definitions";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";

export default function LoginForm() {
  const router = useRouter();
  const {
    setError,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginInputs>({
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit: SubmitHandler<LoginInputs> = async function ({
    email,
    password,
  }) {
    try {
      const response = await signIn("credentials", {
        email,
        password,
        redirect: false,
        callbackUrl: "/dashboard",
      });

      if (response?.error) {
        throw new Error(response.error);
      } else {
        router.push("/dashboard");
        router.refresh();
      }
    } catch (error: any) {
      const errorMessage =
        error.message === "CredentialsSignin"
          ? "Invalid credentials"
          : error.message;

      setError("global", {
        type: "manual",
        message: errorMessage,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-4">
      <div className="container-input">
        <div className="container-error">
          <label htmlFor="email">Email</label>
          {errors.email?.message && (
            <p className="error-message">{errors.email?.message}</p>
          )}
        </div>
        <input type="text" {...register("email")} />
      </div>
      <div className="container-input">
        <div className="container-error">
          <label htmlFor="password">Password</label>
          {errors.password?.message && (
            <p className="error-message">{errors.password?.message}</p>
          )}
        </div>
        <input type="password" {...register("password")} />
      </div>
      <div className="flex justify-between items-center capitalize">
        <div className="flex items-center gap-1">
          <input
            type="checkbox"
            name="check"
            className="accent-logo-700 w-4 h-4"
          />
          <label htmlFor="check" className="font-light text-base">
            remember me
          </label>
        </div>
        <div>
          <Link href="/" className="text-logo-500 hover:brightness-75">
            forgot password?
          </Link>
        </div>
      </div>
      <div>
        {errors.global?.message && (
          <p className="error-message">{errors.global?.message}</p>
        )}
      </div>
      <div>
        <button
          className="primary-link w-full capitalize disabled:border-0 disabled:bg-slate-500 disabled:cursor-wait py-2"
          disabled={isSubmitting}
        >
          {isSubmitting ? "login in..." : "login"}
        </button>
      </div>
    </form>
  );
}
