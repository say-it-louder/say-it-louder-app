import Statistics from "@/app/ui/dashboard/statistics";
import CreatePostForm from "@/app/ui/posts/createPostForm";
import PostList from "@/app/ui/posts/postList";
import Link from "next/link";
import { IoSettingsOutline } from "react-icons/io5";
import { getPostByUser } from "@/app/lib/data";
import { getServerSession } from "next-auth";
import { Suspense } from "react";
import { PostListSkeleton } from "@/app/ui/skeletons";

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: { query: string };
}) {
  const session = await getServerSession();
  const email = session?.user?.email || "";
  const query = searchParams?.query || "";
  const posts = await getPostByUser({ email, query });
  return (
    <div className="px-2 py-4 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-2xl capitalize">dashboard page</h1>
        <Link href="/dashboard/settings" className="hover:brightness-75">
          <IoSettingsOutline className="text-2xl" />
        </Link>
      </div>
      <div className="flex justify-center">
        <Statistics />
      </div>
      <div className="px-10">
        <CreatePostForm />
      </div>
      <Suspense fallback={<PostListSkeleton />}>
        <PostList posts={posts} />
      </Suspense>
    </div>
  );
}
