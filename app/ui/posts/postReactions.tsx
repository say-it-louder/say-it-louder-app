import { getNumberOfComments } from "@/app/lib/data";
import Link from "next/link";
import { FaRegComment } from "react-icons/fa";

export default async function PostReactions({ postId }: { postId: string }) {
  const numberOfComments = await getNumberOfComments(postId);
  return (
    <div>
      <div>
        <Link
          href={`/posts/${postId}/#commentsList`}
          className="flex items-center gap-2 hover:brightness-75"
        >
          <FaRegComment className="text-4xl" />
          <span>{numberOfComments}</span>
        </Link>
      </div>
    </div>
  );
}
