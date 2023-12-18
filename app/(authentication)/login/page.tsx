import LoginForm from "@/app/ui/auth/loginForm";
import { khand } from "@/app/ui/fonts";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import SignInButton from "@/app/ui/auth/signInButton";

export default async function LogInPage() {
  const session = await getServerSession();
  if (session) {
    redirect("/");
  }
  return (
    <div className="w-full space-y-2">
      <div className="w-full space-y-2">
        <SignInButton provider="google" label="sign in with google" />
        <SignInButton provider="github" label="sign in with github" />
      </div>
      <div className="flex items-center gap-4">
        <div className="w-full border-[1px] border-stone-400"></div>
        <p className={`${khand.className} uppercase text-base font-bold`}>or</p>
        <div className="w-full border-[1px] border-stone-400"></div>
      </div>
      <LoginForm />
    </div>
  );
}
