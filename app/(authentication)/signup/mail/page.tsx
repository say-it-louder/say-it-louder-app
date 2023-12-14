"use client";

import { useFormState } from "react-dom";
import { createUser } from "@/app/lib/actions";
import SubmitButton from "@/app/ui/submitButton";

export default function SignUpMailPage() {
  const [state, dispatch] = useFormState(createUser, null);

  return (
    <form action={dispatch} className="space-y-4 w-full">
      {/* User full name */}
      <div className="container-input">
        <div className="container-error">
          <label htmlFor="fullName">full name:</label>
          <p className="error-message">{state?.errors?.fullName}</p>
        </div>
        <input name="fullName" type="text" />
      </div>
      {/* User email */}
      <div className="container-input">
        <div className="container-error">
          <label htmlFor="email">email:</label>
          <p className="error-message">{state?.errors?.email}</p>
        </div>
        <input name="email" type="email" />
      </div>
      {/* User password */}
      <div className="container-input">
        <div className="container-error">
          <label htmlFor="password">password:</label>
          <p className="error-message">{state?.errors?.password}</p>
        </div>
        <input name="password" type="password" />
      </div>
      {/* User confirm password */}
      <div className="container-input">
        <div className="container-error">
          <label htmlFor="confirmPassword">repeat password:</label>
          <p className="error-message">{state?.errors?.confirmPassword}</p>
        </div>
        <input name="confirmPassword" type="password" />
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
