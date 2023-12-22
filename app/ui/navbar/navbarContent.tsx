"use client";
import Link from "next/link";
import { useRef, useState } from "react";
import { HiMiniBars3, HiMiniMagnifyingGlass } from "react-icons/hi2";
import { khand } from "../fonts";
import Search from "./search";
import Logo from "../logo";
import { useOutsideClick } from "@/app/lib/hooks/useOutsideClick";
import NotificationIcon from "./notification";
import { useSession } from "next-auth/react";

export default function NavbarContent({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  console.log(session, status);
  const [isSearching, setIsSearching] = useState(false);
  const targetRef = useRef(null);

  function onOutsideClick(): void {
    if (isSearching) {
      setIsSearching(false);
    }
  }

  useOutsideClick(targetRef, onOutsideClick);

  return (
    <nav
      className={`${khand.className} w-full bg-background-500 flex justify-between px-2 pt-4 pb-2 sticky md:px-4 lg:px-44 shadow-lg`}
    >
      <div className="flex items-center gap-2 flex-1 md:gap-4 lg:gap-6">
        <HiMiniBars3 className="md:hidden" />
        <Logo />
        <Search className="hidden md:block" />
      </div>
      <div className="flex items-center gap-3 flex-1 justify-end md:gap-4 lg:gap-6">
        {status === "loading" && (
          <span className="text-center text-4xl animate-ping">...</span>
        )}

        {!isSearching && status === "unauthenticated" && (
          <>
            <HiMiniMagnifyingGlass
              className="hover:brightness-75 md:hidden text-3xl"
              onClick={() => setIsSearching(true)}
            />
            <Link href="/login" className={`hidden md:block simple-link`}>
              Log in
            </Link>
            <Link href="/signup" className={`primary-link`}>
              Create Account
            </Link>
          </>
        )}
        {!isSearching && status === "authenticated" && (
          <>
            <HiMiniMagnifyingGlass
              className="hover:brightness-75 md:hidden  text-4xl"
              onClick={() => setIsSearching(true)}
            />
            <Link
              href="/posts/create"
              className={`primary-link hidden md:block`}
            >
              Create Post
            </Link>
            <NotificationIcon />
            {children} {/* UserMenu */}
          </>
        )}
        {isSearching && <Search className="md:hidden" refProp={targetRef} />}
      </div>
    </nav>
  );
}
