import SignUpForm from "@/app/ui/auth/signUpForm";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function SignUpMailPage() {
  const session = await getServerSession();
  if (session) {
    redirect("/");
  }
  return <SignUpForm />;
}
