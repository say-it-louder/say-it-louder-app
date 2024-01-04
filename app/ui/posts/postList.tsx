import Post from "@/app/ui/posts/post";
import { Post as PostDef } from "@/app/lib/definitions";

export default async function PostList({ posts }: { posts: PostDef[] }) {
  const arePost = posts.length === 0;
  return (
    <div className="w-ful flex flex-col gap-2">
      {arePost && <span>No results, try another keyword.</span>}
      {posts?.map((post) => (
        <Post post={post} key={post.post_id} />
      ))}
    </div>
  );
}
