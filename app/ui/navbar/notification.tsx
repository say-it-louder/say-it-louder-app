"use client";
import Link from "next/link";
import { FaBell } from "react-icons/fa";
import { useSession } from "next-auth/react";

export default function NotificationIcon() {
  const unreadNotifications = 2;

  return (
    <div>
      <Link
        href={"/notifications"}
        className="relative bg-yellow-200 hover:brightness-75"
      >
        <FaBell className="text-3xl" />
        {unreadNotifications > 0 && (
          <span className="absolute -top-3 -right-1 bg-red-700 px-1 rounded-md">
            {unreadNotifications}
          </span>
        )}
      </Link>
    </div>
  );
}
