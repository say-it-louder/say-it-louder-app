import { Post } from "@/app/lib/definitions";
import Image from "next/image";
import Link from "next/link";
import DeletePostForm from "@/app/ui/posts/deletePostForm";
import Reactions from "@/app/ui/reactions/reactionsContainer";

export default async function PostContent({
  post,
  currentUserEmail,
}: {
  post: Post;
  currentUserEmail: string;
}) {
  return (
    <div className="bg-background-500 space-y-4">
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
        <div>
          <div>
            {currentUserEmail === post.user_email && (
              <DeletePostForm postId={post.post_id} />
            )}
          </div>
          <div>
            {currentUserEmail !== post.user_email && (
              <button className="primary-link">Follow</button>
            )}
          </div>
        </div>
      </div>
      <div>
        <Reactions id={post.post_id} />
      </div>
      <div>
        <p className="font-bold text-2xl">{post.content}</p>
      </div>
    </div>
  );
}
