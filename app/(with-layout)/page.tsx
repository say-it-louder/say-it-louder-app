import PostList from "../ui/posts/postList";
import { PostListSkeleton } from "../ui/skeletons";
import { Suspense } from "react";
import { getAllPosts } from "@/app/lib/data";

export default async function Home({
  searchParams,
}: {
  searchParams: { query: string };
}) {
  const query = searchParams?.query || "";
  const posts = await getAllPosts(query);
  return (
    <main>
      <h1>Main page</h1>
      <Suspense fallback={<PostListSkeleton />}>
        <PostList posts={posts} />
      </Suspense>
    </main>
  );
}
