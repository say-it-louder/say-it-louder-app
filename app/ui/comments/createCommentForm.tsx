"use client";
import { createComment } from "@/app/lib/actions";
import Image from "next/image";
import { useFormState } from "react-dom";
import { useSession } from "next-auth/react";
import SubmitButton from "@/app/ui/submitButton";
import { useRef } from "react";

export default function CreateCommentForm({
  postId,
  currentUserAvatar,
}: {
  postId: string;
  currentUserAvatar: string;
}) {
  const { data: session } = useSession();
  const userId = session?.user?.id || "";
  const commentKeys = { user: userId, post: postId };
  const createCommentWithKeys = createComment.bind(null, commentKeys);
  const [state, dispatch] = useFormState(createCommentWithKeys, null);
  const formRef = useRef<HTMLFormElement | null>(null);

  return (
    <div className="flex w-full gap-1">
      <Image
        src={`/avatars/${currentUserAvatar}.png`}
        width={20}
        height={20}
        alt="user avatar"
        className="w-6 h-6 bg-logo-500 rounded-full"
      />
      <form
        action={async (formData) => {
          await dispatch(formData);
          formRef?.current?.reset();
        }}
        ref={formRef}
        className="w-full"
      >
        <div>
          <textarea
            name="content"
            placeholder="Reply..."
            rows={4}
            className="bg-background-500 border-2 border-logo-500 outline-none rounded-md w-full px-2 py-1 resize-none"
          ></textarea>
          <p className="error-message">{state?.errors?.content}</p>
        </div>
        <div>
          <p className="error-message">{state?.message}</p>
        </div>
        <div className="w-fit">
          <SubmitButton />
        </div>
      </form>
    </div>
  );
}
