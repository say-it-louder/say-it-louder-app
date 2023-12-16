"use client";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";

export default function DashboardPage() {
  const { data: session, status: sessionStatus } = useSession();
  if (session) {
    console.log(session, sessionStatus);
  }
  return (
    <div>
      <h1>Dashboard Page</h1>

      <button
        className="flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3"
        onClick={() => {
          signOut();
        }}
      >
        <div className="hidden md:block">Sign Out</div>
      </button>
    </div>
  );
}
