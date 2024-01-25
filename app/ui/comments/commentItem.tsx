import { Comment } from "@/app/lib/definitions";
import Image from "next/image";
import Link from "next/link";

export default function CommentItem({ comment }: { comment: Comment }) {
  return (
    <div className="flex gap-1 w-full">
      <div>
        <Link
          href={`/users/${comment.user_id}`}
          className="flex gap-2 w-fit hover:brightness-75"
        >
          <Image
            src={`/avatars/${comment.user_avatar}.png`}
            alt="User Avatar"
            width={24}
            height={24}
            className="bg-logo-500 rounded-full "
          />
        </Link>
      </div>
      <div className="bg-background-400 rounded-md p-1 w-full space-y-3">
        <div className="flex items-center gap-2">
          <span className="font-bold text-sm">
            {comment.user_username
              ? `@${comment.user_username}`
              : `${comment.user_name}`}
          </span>
          <span className="text-xs text-stone-500">{comment.created_at}</span>
        </div>
        <div>
          <p className="text-sm">{comment.content}</p>
        </div>
      </div>
    </div>
  );
}
