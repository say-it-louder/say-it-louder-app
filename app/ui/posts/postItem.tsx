import { Post } from "@/app/lib/definitions";
import Image from "next/image";
import Link from "next/link";
import DeletePostForm from "./deletePostForm";
import { getServerSession } from "next-auth";
import PostReactions from "./postReactions";

export default async function Post({ post }: { post: Post }) {
  const session = await getServerSession();
  const currentUserEmail = session?.user.email;

  return (
    <div className=" bg-background-600 p-2 space-y-4 ">
      <div className="flex items-center justify-between">
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
            <span className="text-sm">
              {post.user_username ? `@${post.user_username}` : post.created_by}
            </span>
            <span className="text-xs font-extralight capitalize">
              {post.created_at}
            </span>
          </div>
        </Link>
        {currentUserEmail === post.user_email && (
          <DeletePostForm postId={post.post_id} />
        )}
      </div>
      <Link href={`/posts/${post.post_id}`} className="hover:brightness-75">
        <p className="font-bold text-xl">{post.content}</p>
      </Link>
      <div>
        <PostReactions postId={post.post_id} />
      </div>
    </div>
  );
}
