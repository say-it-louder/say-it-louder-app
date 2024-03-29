import { Comment } from "@/app/lib/definitions";
import CommentItem from "@/app/ui/comments/commentItem";

export default async function CommentsList({
  comments,
}: {
  comments: Comment[];
}) {
  const areComments = comments.length > 0;
  return (
    <div className="space-y-2 w-full">
      {!areComments && <span>No comments to show.</span>}
      {comments.map((comment) => (
        <CommentItem key={comment.id} comment={comment} />
      ))}
    </div>
  );
}
