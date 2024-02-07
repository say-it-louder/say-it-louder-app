import { getNumberOfComments } from "@/app/lib/data";
import { Comment } from "@/app/lib/definitions";
import Image from "next/image";
import Link from "next/link";
import { FaRegComment } from "react-icons/fa";
import DeleteCommentForm from "./deleteCommentForm";

export default async function CommentItem({ comment }: { comment: Comment }) {
  const numberOfComments = await getNumberOfComments({
    id: comment.id,
    type: "comment",
  });

  return (
    <div className="flex gap-1 w-full p-2">
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
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-bold text-sm">
              {comment.user_username
                ? `@${comment.user_username}`
                : `${comment.user_name}`}
            </span>
            <span className="text-xs text-stone-500">{comment.created_at}</span>
          </div>
          <div>
            <DeleteCommentForm
              commentId={comment.id}
              redirectPath={`posts/${comment.post_id}`}
              commentUserId={comment.user_id}
            />
          </div>
        </div>
        <div>
          <Link href={`/posts/${comment.post_id}/comments/${comment.id}`}>
            <p className="text-sm hover:brightness-75">{comment.content}</p>
          </Link>
        </div>
        <div className="flex items-center gap-1">
          <Link href={`/posts/${comment.post_id}/comments/${comment.id}`}>
            <FaRegComment className="text-xl hover:brightness-75" />
          </Link>
          <span className="text-sm font-semibold">{numberOfComments}</span>
        </div>
      </div>
    </div>
  );
}
