"use client";
import { AuthProviders } from "@/app/lib/definitions";
import { signIn } from "next-auth/react";
import { FaGoogle, FaGithub } from "react-icons/fa";
import { khand } from "@/app/ui/fonts";
import { useState } from "react";

export default function SignInButton({ provider, label }: AuthProviders) {
  const [isSigningIn, setIsSigningIn] = useState(false);

  const handleSignIn = async function () {
    try {
      setIsSigningIn(true);
      await signIn(provider, { callbackUrl: "/dashboard" });
    } catch (error) {
      console.error("Sign in failed, provider: ", provider);
    } finally {
      setIsSigningIn(false);
    }
  };

  return (
    <button
      onClick={handleSignIn}
      disabled={isSigningIn}
      className={`${khand.className} primary-link relative flex items-center justify-center py-3 capitalize tracking-wider font-bold text-base w-full disabled:cursor-wait disabled:bg-slate-500`}
    >
      {provider === "google" && <FaGoogle className="absolute w-6 left-4" />}
      {provider === "github" && <FaGithub className="absolute w-6 left-4" />}
      {label}
    </button>
  );
}
