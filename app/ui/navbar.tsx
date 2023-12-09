"use client";

import Link from "next/link";
import { useState } from "react";
import { HiMiniBars3, HiMiniMagnifyingGlass } from "react-icons/hi2";
import { khand } from "./fonts";
import Search from "./search";
import Logo from "./logo";

export default function Navbar() {
  const [isSearching, setIsSearching] = useState(false);

  return (
    <nav
      className={`${khand.className} w-full bg-background-500 flex justify-between px-2 pt-4 pb-2 sticky md:px-4 lg:px-44 shadow-lg`}
    >
      <div className="flex items-center gap-2 flex-1 md:gap-4 lg:gap-6">
        <HiMiniBars3 className="md:hidden" />
        <Logo />
        <Search className="hidden md:block" />
      </div>
      <div className="flex items-center gap-2 flex-1 justify-end md:gap-4 lg:gap-6">
        {!isSearching && (
          <>
            <HiMiniMagnifyingGlass
              className="hover:brightness-75 md:hidden"
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
        {isSearching && <Search className="md:hidden" />}
      </div>
    </nav>
  );
}
