"use client";
import { createPost } from "@/app/lib/actions";
import { useSession } from "next-auth/react";
import { useFormState } from "react-dom";
import SubmitButton from "@/app/ui/submitButton";
import { useRef } from "react";

export default function CreatePostForm() {
  const { data: session } = useSession();
  const userId = session?.user?.id || "";
  const createPostWithId = createPost.bind(null, userId);
  const [state, dispatch] = useFormState(createPostWithId, null);
  const formRef = useRef<HTMLFormElement | null>(null);

  return (
    <form
      action={async (formData) => {
        await dispatch(formData);
        formRef?.current?.reset();
      }}
      ref={formRef}
    >
      <div>
        <textarea
          name="content"
          placeholder="Say it louder..."
          required
          rows={6}
          className="bg-background-500 border-2 border-logo-500 outline-none rounded-md w-full px-2 py-1 resize-none"
        />
        <p className="error-message">{state?.errors?.content}</p>
      </div>
      <div>
        <p className="error-message">{state?.message}</p>
      </div>
      <div>
        <SubmitButton />
      </div>
    </form>
  );
}
