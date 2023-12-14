import LoginForm from "@/app/ui/loginForm";
import LinkBtn from "../../ui/linkBtn";
import { FaGoogle, FaGithub } from "react-icons/fa";
import { khand } from "@/app/ui/fonts";

export default function LogInPage() {
  return (
    <div className="w-full space-y-2">
      <div className="w-full space-y-2">
        <LinkBtn label="log in with google" icon={FaGoogle} href="/" />
        <LinkBtn label="log in with github" icon={FaGithub} href="/" />
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
