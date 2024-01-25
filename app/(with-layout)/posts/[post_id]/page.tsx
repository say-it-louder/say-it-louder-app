import { getPostById } from "@/app/lib/data";
import PostContent from "@/app/ui/posts/postContent";

export default async function PostPage({
  params,
}: {
  params: { post_id: string };
}) {
  const postId = params.post_id;
  const postInfo = await getPostById(postId);
  //console.log(postInfo);
  return (
    <div className="pt-2">
      <PostContent post={postInfo} key={postInfo.post_id} />
    </div>
  );
}
