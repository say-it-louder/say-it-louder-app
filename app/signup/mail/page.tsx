import React from "react";

export default function SignUpMail() {
  return (
    <form className="space-y-4 w-full">
      <div className="container-input">
        <label htmlFor="userName">full name:</label>
        <input id="userName" name="userName" type="text" />
      </div>
      <div className="container-input">
        <label htmlFor="email">email:</label>
        <input id="email" name="email" type="email" />
      </div>
      <div className="container-input">
        <label htmlFor="password1">password:</label>
        <input id="password1" name="password1" type="password" />
      </div>
      <div className="container-input">
        <label htmlFor="password2">repeat password:</label>
        <input id="password2" name="password2" type="password" />
      </div>
    </form>
  );
}
