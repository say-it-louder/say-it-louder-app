import React from "react";
import { HiMiniMagnifyingGlass } from "react-icons/hi2";
import { khand } from "../fonts";
import { SearchProp } from "@/app/lib/definitions";
import { useOutsideClick } from "@/app/lib/hooks/useOutsideClick";

export default function Search({ className, refProp }: SearchProp) {
  return (
    <div className={`relative ${className} w-full`} ref={refProp}>
      <input
        className={`${khand.className} py-1 px-4 border-2 border-logo-500 bg-background-700 w-full rounded-md text-lg outline-none`}
        type="text"
        placeholder="Search..."
        autoFocus
      />
      <HiMiniMagnifyingGlass className="absolute top-0 right-2 w-8 focus:text-5xl cursor-default" />
    </div>
  );
}
