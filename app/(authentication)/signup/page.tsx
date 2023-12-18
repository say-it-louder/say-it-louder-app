import LinkBtn from "@/app/ui/linkBtn";
import { IoMail } from "react-icons/io5";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import SignInButton from "@/app/ui/auth/signInButton";

export default async function SignUpPage() {
  const session = await getServerSession();
  if (session) {
    redirect("/");
  }
  return (
    <div className="space-y-4 w-full">
      <SignInButton provider="google" label="sing up with google" />
      <SignInButton provider="github" label="sign up with github" />
      <LinkBtn label="sing up with mail" icon={IoMail} href="/signup/mail" />
    </div>
  );
}
