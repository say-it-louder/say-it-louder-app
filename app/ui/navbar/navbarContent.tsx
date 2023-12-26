"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  HiMiniBars3,
  HiMiniMagnifyingGlass,
  HiOutlineXMark,
} from "react-icons/hi2";
import { khand } from "../fonts";
import Search from "./search";
import Logo from "../logo";
import { useOutsideClick } from "@/app/lib/hooks/useOutsideClick";
import NotificationIcon from "./notification";
import { useSession } from "next-auth/react";
import { NavBarSkeleton } from "../skeletons";
import FooterSide from "../footerSide";

export default function NavbarContent({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const [isSearching, setIsSearching] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const targetRef = useRef(null);
  useOutsideClick(targetRef, () => setIsSearching(false));

  useEffect(() => {
    function handleResize() {
      const windowWidth = window.innerWidth;

      if (windowWidth >= 768) {
        setIsMenuOpen(false);
        setIsSearching(false);
      }
    }
    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, [isMenuOpen, isSearching]);

  return (
    <>
      <nav
        className={`${khand.className} w-full bg-background-500 flex justify-between px-2 pt-4 pb-2 sticky md:px-4 lg:px-44 shadow-lg`}
      >
        <div className="flex items-center gap-2 flex-1 md:gap-4 lg:gap-6">
          {!isMenuOpen && (
            <HiMiniBars3
              className="md:hidden hover:brightness-75"
              onClick={() => setIsMenuOpen(true)}
            />
          )}

          <Logo />
          <Search className="hidden md:block" />
        </div>

        <div className="flex items-center gap-3 flex-1 justify-end md:gap-4 lg:gap-6">
          {status === "loading" && !session && (
            <>
              <NavBarSkeleton />{" "}
            </>
          )}

          {!isSearching && status === "unauthenticated" && !isMenuOpen && (
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
          {!isSearching && status === "authenticated" && !isMenuOpen && (
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
          {isMenuOpen && (
            <HiOutlineXMark
              className="md:hidden hover:brightness-75"
              onClick={() => setIsMenuOpen(false)}
            />
          )}
        </div>
      </nav>
      {isMenuOpen && <FooterSide />}
    </>
  );
}
