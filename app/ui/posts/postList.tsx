import { getAllPosts } from "@/app/lib/data";
import Post from "@/app/ui/posts/post";

export default async function PostList({ query }: { query: string }) {
  const posts = await getAllPosts(query);
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
