import PostList from "../ui/posts/postList";
import { PostListSkeleton } from "../ui/skeletons";
import { Suspense } from "react";

export default function Home({
  searchParams,
}: {
  searchParams: { query: string };
}) {
  const query = searchParams?.query || "";
  return (
    <main>
      <h1>Main page</h1>
      <Suspense fallback={<PostListSkeleton />}>
        <PostList query={query} />
      </Suspense>
    </main>
  );
}
