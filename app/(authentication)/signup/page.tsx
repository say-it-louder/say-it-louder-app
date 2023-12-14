import LinkBtn from "@/app/ui/linkBtn";
import { FaGoogle, FaGithub } from "react-icons/fa";
import { IoMail } from "react-icons/io5";

export default function SignUpPage() {
  return (
    <div className="space-y-4 w-full">
      <LinkBtn label="sing up with google" icon={FaGoogle} href="/" />
      <LinkBtn label="sing up with github" icon={FaGithub} href="/" />
      <LinkBtn label="sing up with mail" icon={IoMail} href="/signup/mail" />
    </div>
  );
}
