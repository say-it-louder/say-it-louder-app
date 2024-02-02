import { getNumberOfComments, getReactionsByPost } from "@/app/lib/data";
import Image from "next/image";
import Link from "next/link";
import { FaRegComment } from "react-icons/fa";
import { BsReplyAll } from "react-icons/bs";

export default async function PostReactions({ postId }: { postId: string }) {
  const numberOfComments = await getNumberOfComments(postId);
  const reactions = await getReactionsByPost(postId);
  const numberOfReactions = reactions.reduce(
    (prev, curr) => Number(curr.reaction_count) + prev,
    0
  );

  return (
    <div className="flex justify-between">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-1">
          <Link
            href={`/posts/${postId}`}
            className="flex items-center -space-x-3 hover:brightness-75"
          >
            {reactions.map((reaction) => (
              <Image
                src={`/reactions/${reaction.image}`}
                key={reaction.id}
                alt="emoji"
                width={30}
                height={30}
                className="brightness-75"
              />
            ))}
          </Link>
          <span className="font-semibold text-xs">{numberOfReactions}</span>
        </div>
        <div>
          <Link
            href={`/posts/${postId}`}
            className="flex items-center gap-1 hover:brightness-75"
          >
            <FaRegComment className="text-2xl" />
            <span className="font-semibold text-xs">{numberOfComments}</span>
          </Link>
        </div>
      </div>
      <div className="flex items-center gap-1">
        <BsReplyAll className="text-2xl" />
        <span className="font-semibold text-xs">5</span>
      </div>
    </div>
  );
}
