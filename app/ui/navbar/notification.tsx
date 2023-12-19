"use client";
import Link from "next/link";
import { FaBell } from "react-icons/fa";
import { useSession } from "next-auth/react";

export default function NotificationIcon() {
  const { data: session } = useSession();
  const unreadNotifications = 2;
  if (!session) return;
  return (
    <div>
      <Link href={"/notifications"} className="relative">
        <FaBell className="text-3xl hover:brightness-75" />
        {unreadNotifications > 0 && (
          <span className="absolute -top-3 -right-1 bg-red-700 px-1 rounded-md">
            {unreadNotifications}
          </span>
        )}
      </Link>
    </div>
  );
}
