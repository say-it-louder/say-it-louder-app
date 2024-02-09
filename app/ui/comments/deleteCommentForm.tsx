"use client";
import { FaTrashAlt } from "react-icons/fa";
import { deleteComment } from "@/app/lib/actions";
import { useState } from "react";
import ConfirmationPopup from "@/app/ui/confirmationPopup";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

export default function DeleteCommentForm({
  commentId,
  redirectPath,
  commentUserId,
}: {
  commentId: string;
  redirectPath?: string;
  commentUserId: string;
}) {
  const { data: session } = useSession();
  const currentUserId = session?.user.id;
  const pathname = usePathname();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  if (currentUserId !== commentUserId) return null;

  async function handleSubmit() {
    setIsDeleting(true);
    if (pathname.includes(commentId)) {
      await deleteComment({ commentId, redirectPath });
    } else {
      await deleteComment({ commentId });
    }
    setIsDeleting(false);
    setIsPopupOpen(false);
  }
  function handleCancel() {
    setIsPopupOpen(false);
  }
  return (
    <div>
      <button
        className="grid place-content-center cursor-pointer"
        onClick={() => setIsPopupOpen(true)}
      >
        <FaTrashAlt className="text-sm hover:brightness-75" />
      </button>
      <ConfirmationPopup
        isOpen={isPopupOpen}
        resourceName="post"
        onConfirm={handleSubmit}
        onCancel={handleCancel}
        isDeleting={isDeleting}
        setIsOpen={setIsPopupOpen}
      />
    </div>
  );
}
