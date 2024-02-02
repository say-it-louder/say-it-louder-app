"use client";
import { Reaction } from "@/app/lib/definitions";
import { insertReaction } from "@/app/lib/actions";
import { useSession } from "next-auth/react";
import { useState } from "react";
import Image from "next/image";

export default function ReactionItem({
  reaction,
  postId,
  currentUserReaction,
}: {
  reaction: Reaction;
  postId: string;
  currentUserReaction: string;
}) {
  const reactionId = reaction.id;
  const { data: session } = useSession();
  const userId = session?.user.id || "";
  const [isInserting, setIsInserting] = useState(false);

  async function handleInsertReaction() {
    setIsInserting(true);
    await insertReaction({ reactionId, postId, userId });
    setIsInserting(false);
  }

  return (
    <div className="flex items-center gap-1">
      <button
        className="grid place-content-center cursor-pointer hover:brightness-75 disabled:cursor-wait"
        onClick={handleInsertReaction}
        disabled={isInserting}
      >
        <Image
          src={`/reactions/${reaction.image}`}
          width={40}
          height={40}
          alt="emoji"
          className={
            currentUserReaction === reactionId
              ? "bg-logo-700 rounded-full p-1"
              : ""
          }
        />
      </button>
      <span>{reaction.reaction_count}</span>
    </div>
  );
}
