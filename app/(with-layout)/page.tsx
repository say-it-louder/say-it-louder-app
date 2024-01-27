import PostList from "../ui/posts/postList";
import { PostListSkeleton } from "@/app/ui/skeletons";
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
      <Suspense fallback={<PostListSkeleton />}>
        <PostList posts={posts} />
      </Suspense>
    </main>
  );
}
