"use client";
import { FaTrashAlt } from "react-icons/fa";
import { deletePost } from "@/app/lib/actions";
import { useState } from "react";
import ConfirmationPopup from "@/app/ui/confirmationPopup";

export default function DeletePostForm({ postId }: { postId: string }) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleSubmit() {
    setIsDeleting(true);
    await deletePost(postId);
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
