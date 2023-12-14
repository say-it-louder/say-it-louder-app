"useClient";
import { useFormStatus } from "react-dom";

export default function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      disabled={pending}
      type="submit"
      className="primary-link w-full py-2 capitalize disabled:bg-slate-500 disabled:cursor-wait disabled:brightness-100 disabled:border-0"
    >
      {pending ? "submitting..." : "submit"}
    </button>
  );
}
