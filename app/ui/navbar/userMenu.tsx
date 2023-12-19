import { getUser } from "@/app/lib/data";
import { useSession } from "next-auth/react";

export default async function UserMenu() {
  const { data: session } = useSession();
  if (!session) return;
  if (session?.user?.email) {
    const user = getUser(session.user.email);
    console.log(user);
  }
  return <div>UserIcon</div>;
}
