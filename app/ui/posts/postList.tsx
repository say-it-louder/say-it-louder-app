import { getAllPosts } from "@/app/lib/data";
import Post from "@/app/ui/posts/post";

export default async function PostList() {
  const posts = await getAllPosts();
  return (
    <div className="w-ful flex flex-col gap-2">
      {posts?.map((post) => (
        <Post post={post} key={post.post_id} />
      ))}
    </div>
  );
}
