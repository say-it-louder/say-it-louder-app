import {
  getCommentById,
  getCommentsByCommentId,
  getPostById,
  getUserAvatar,
} from "@/app/lib/data";
import CreateCommentForm from "@/app/ui/comments/createCommentForm";
import CommentItem from "@/app/ui/comments/commentItem";
import Post from "@/app/ui/posts/postItem";
import CommentsList from "@/app/ui/comments/commentsList";
import { Comment } from "@/app/lib/definitions";
import { Suspense } from "react";
import {
  CreateCommentSkeleton,
  NumberCommentsSkeleton,
  PostContentSkeleton,
  PostListSkeleton,
} from "@/app/ui/skeletons";
import { getServerSession } from "next-auth";
import { getNumberOfComments } from "@/app/lib/data";

export default async function CommentPage({
  params,
  searchParams,
}: {
  params: { post_id: string; comment_id: string };
  searchParams: { query: string };
}) {
  const postId = params.post_id;
  const query = searchParams.query || "";
  const commentId = params.comment_id;
  const post = await getPostById(postId);
  const comment = await getCommentById(commentId);
  const parentCommentId = comment.parent_comment_id;
  let parentComment: Comment = {
    id: "",
    post_id: "",
    parent_comment_id: "",
    user_id: "",
    user_name: "",
    user_username: "",
    user_avatar: "",
    created_at: "",
    content: "",
  };
  if (parentCommentId !== null) {
    parentComment = await getCommentById(parentCommentId);
  }
  const comments = await getCommentsByCommentId({ commentId, query });
  const session = await getServerSession();
  const currentUserEmail = session?.user.email || "";
  const currentUserAvatar = await getUserAvatar(currentUserEmail);
  const numberOfComments = await getNumberOfComments({
    id: comment.id,
    type: "comment",
  });
  return (
    <div className="space-y-2">
      {/* Main post */}
      <Suspense fallback={<PostContentSkeleton />}>
        <Post post={post} />
      </Suspense>

      {/* Parent comment */}
      {parentCommentId && (
        <div>
          <Suspense fallback={<PostContentSkeleton />}>
            <CommentItem comment={parentComment} />
          </Suspense>
        </div>
      )}

      {/* Comment to reply */}
      <div className={parentCommentId ? "ml-20" : ""}>
        <Suspense fallback={<PostContentSkeleton />}>
          <CommentItem comment={comment} />
        </Suspense>
      </div>

      <div className="ml-20 space-y-2">
        {/* Number of comments */}
        <Suspense fallback={<NumberCommentsSkeleton />}>
          <h1 className="font-bold text-xl capitalize">
            top comments({numberOfComments})
          </h1>
        </Suspense>

        {/* Create comment form */}
        <Suspense fallback={<CreateCommentSkeleton />}>
          <CreateCommentForm
            postId={postId}
            currentUserAvatar={currentUserAvatar}
            commentParent={commentId}
          />
        </Suspense>
        <div>
          <Suspense fallback={<PostListSkeleton />}>
            <CommentsList comments={comments} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
