import { Post } from "@/app/lib/definitions";
import Image from "next/image";
import Link from "next/link";

export default function Post({ post }: { post: Post }) {
  return (
    <div className=" bg-background-600 p-2 space-y-2 ">
      <Link
        href={`/users/${post.user_id}`}
        className="flex gap-2 w-fit hover:brightness-75"
      >
        <Image
          src={`/avatars/${post.created_by_avatar}.png`}
          alt="User Avatar"
          width={37}
          height={37}
          className="bg-logo-500 rounded-full "
        />

        <div className="flex flex-col gap-0 justify-center">
          <span className="text-sm">{post.created_by}</span>
          <span className="text-xs font-extralight capitalize">
            {post.created_at}
          </span>
        </div>
      </Link>
      <Link href={`posts/${post.post_id}`} className="hover:brightness-75">
        <p className="font-bold text-xl">{post.content}</p>
      </Link>
    </div>
  );
}
