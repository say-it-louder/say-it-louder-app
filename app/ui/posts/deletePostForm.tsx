import { FaTrashAlt } from "react-icons/fa";
import { deletePost } from "@/app/lib/actions";

export default function DeletePostForm({ postId }: { postId: string }) {
  const deletePostWithId = deletePost.bind(null, postId);
  return (
    <form action={deletePostWithId}>
      <button className="grid place-content-center cursor-pointer">
        <FaTrashAlt className="text-sm hover:brightness-75" />
      </button>
    </form>
  );
}
