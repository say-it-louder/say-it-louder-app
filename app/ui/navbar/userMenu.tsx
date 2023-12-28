import { getUserAvatar } from "@/app/lib/data";
import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";

export default async function UserMenu() {
  const session = await getServerSession();
  if (!session?.user?.email) {
    return null;
  }
  const userAvatar = await getUserAvatar(session?.user?.email);

  return (
    <Link href={"/dashboard"} className="hover:brightness-75">
      <Image
        src={`/avatars/${userAvatar}.png`}
        alt="avatar"
        width={35}
        height={35}
        objectFit="cover"
        className="bg-logo-500 rounded-full"
      ></Image>
    </Link>
  );
}
