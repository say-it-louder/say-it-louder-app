import Statistics from "@/app/ui/dashboard/statistics";
import CreatePostForm from "@/app/ui/posts/createPostForm";
import PostList from "@/app/ui/posts/postList";
import { IoSettingsOutline } from "react-icons/io5";

export default function DashboardPage() {
  return (
    <div className="px-2 py-4 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-2xl">Dashboard Page</h1>
        <IoSettingsOutline className="text-2xl" />
      </div>
      <Statistics />
      <div className="px-10">
        <CreatePostForm />
      </div>
      <PostList query="" />
    </div>
  );
}
