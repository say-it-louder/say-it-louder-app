"use client";
import SubmitButton from "./submitButton";

export default function LoginForm() {
  return (
    <form action="" className="w-full space-y-4">
      <div className="container-input">
        <div className="container-error">
          <label htmlFor="email">Email</label>
          <p className="error-message"></p>
        </div>
        <input type="text" name="email" />
      </div>
      <div className="container-input">
        <div className="container-error">
          <label htmlFor="password">Password</label>
          <p className="error-message"></p>
        </div>
        <input type="password" name="password" />
      </div>
      <div>
        <SubmitButton />
      </div>
    </form>
  );
}
