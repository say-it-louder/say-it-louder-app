import { getPostByUser, getUserById } from "@/app/lib/data";
import { formatDate } from "@/app/lib/utils";
import Statistics from "@/app/ui/dashboard/statistics";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import PostList from "@/app/ui/posts/postList";

export default async function UserPage({
  params,
  searchParams,
}: {
  params: { user_id: string };
  searchParams: { query: string };
}) {
  const session = await getServerSession();
  const userId = params.user_id;
  const user = await getUserById(userId);
  if (user?.email === session?.user.email) {
    redirect("/dashboard");
  }
  const date = new Date();
  const activeSince = user?.active_since || date;
  const email = user?.email || "";
  const query = searchParams?.query || "";
  const posts = await getPostByUser({ email, query });

  return (
    <div className="px-2 py-4 space-y-4">
      <div>
        <h1 className="font-bold text-2xl capitalize">{user?.name}</h1>
        <p className="font-extralight">{user?.bio}</p>
        <p className="font-extralight">
          <span className="font-light">Active since: </span>
          {formatDate(activeSince)}
        </p>
      </div>
      <div className="flex items-center justify-center gap-4">
        <Statistics />
        <div className="h-fit">
          <button className="primary-link">Follow</button>
        </div>
      </div>
      <div>
        <PostList posts={posts} />
      </div>
    </div>
  );
}
