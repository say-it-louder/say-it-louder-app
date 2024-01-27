import {
  getCommentsByPost,
  getNumberOfComments,
  getPostById,
} from "@/app/lib/data";
import PostContent from "@/app/ui/posts/postContent";
import CreateCommentForm from "@/app/ui/comments/createCommentForm";
import { getServerSession } from "next-auth";
import { getUserAvatar } from "@/app/lib/data";
import CommentsList from "@/app/ui/comments/commentsList";
import { Suspense } from "react";
import {
  CreateCommentSkeleton,
  NumberCommentsSkeleton,
  PostContentSkeleton,
  PostListSkeleton,
} from "@/app/ui/skeletons";

export default async function PostPage({
  params,
  searchParams,
}: {
  params: { post_id: string };
  searchParams: { query: string };
}) {
  const postId = params.post_id;
  const postInfo = await getPostById(postId);
  const session = await getServerSession();
  const currentUserEmail = session?.user.email || "";
  const currentUserAvatar = await getUserAvatar(currentUserEmail);
  const query = searchParams?.query || "";
  const comments = await getCommentsByPost({ postId, query });
  const numberOfComments = await getNumberOfComments(postId);

  return (
    <div className="p-2 space-y-4">
      <Suspense fallback={<PostContentSkeleton />}>
        <PostContent
          post={postInfo}
          currentUserEmail={currentUserEmail}
          key={postInfo.post_id}
        />
      </Suspense>

      <Suspense fallback={<NumberCommentsSkeleton />}>
        <h1 className="font-bold text-xl capitalize">
          top comments({numberOfComments})
        </h1>
      </Suspense>

      <Suspense fallback={<CreateCommentSkeleton />}>
        <CreateCommentForm
          postId={postId}
          currentUserAvatar={currentUserAvatar}
        />
      </Suspense>

      <div id="commentsList" className="w-96">
        <Suspense fallback={<PostListSkeleton />}>
          <CommentsList comments={comments} />
        </Suspense>
      </div>
    </div>
  );
}
