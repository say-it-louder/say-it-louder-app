import { getReactionByUser, getReactionsByEntity } from "@/app/lib/data";
import ReactionItem from "@/app/ui/reactions/reactionItem";

export default async function Reactions({
  postId,
  currentUserEmail,
}: {
  postId: string;
  currentUserEmail: string;
}) {
  const reactions = await getReactionsByEntity(postId);
  const userEmail = currentUserEmail;
  const { reaction_id: currentUserReaction } =
    (await getReactionByUser({ userEmail, entityId: postId })) || "";

  return (
    <div className="flex justify-center items-center gap-4">
      {reactions.map((reaction) => (
        <ReactionItem
          key={reaction.id}
          reaction={reaction}
          postId={postId}
          currentUserReaction={currentUserReaction}
        />
      ))}
    </div>
  );
}
