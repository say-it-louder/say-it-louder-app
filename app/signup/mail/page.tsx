"use client";

import { useFormState } from "react-dom";
import { createUser } from "@/app/lib/actions";

export default function SignUpMail() {
  const initialState = { message: null, errors: {} };
  const [state, dispatch] = useFormState(createUser, initialState);

  return (
    <form action={dispatch} className="space-y-4 w-full">
      {/* User full name */}
      <div className="container-input">
        <label htmlFor="userName">full name:</label>
        <input id="userName" name="userName" type="text" />
      </div>
      {/* User email */}
      <div className="container-input">
        <label htmlFor="email">email:</label>
        <input id="email" name="email" type="email" />
      </div>
      {/* User password */}
      <div className="container-input">
        <label htmlFor="password">password:</label>
        <input id="password" name="password" type="password" />
      </div>
      {/* User confirm password */}
      <div className="container-input">
        <label htmlFor="confirmPassword">repeat password:</label>
        <input id="confirmPassword" name="confirmPassword" type="password" />
      </div>
      <div>
        <button className="primary-link" type="submit">
          submit
        </button>
      </div>
    </form>
  );
}
