"use client";
import { signOut } from "next-auth/react";

export default function SignOutButton() {
  return (
    <button
      className="simple-link"
      onClick={() => {
        signOut();
      }}
    >
      <div className="">Sign Out</div>
    </button>
  );
}
