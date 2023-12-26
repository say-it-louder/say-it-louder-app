import React, { Suspense } from "react";
import NavbarContent from "@/app/ui/navbar/navbarContent";
import UserMenu from "@/app/ui/navbar/userMenu";
import { AvatarSkeleton } from "../skeletons";

export default function Navbar() {
  return (
    <header className="">
      <NavbarContent>
        <Suspense fallback={<AvatarSkeleton />}>
          <UserMenu />
        </Suspense>
      </NavbarContent>
    </header>
  );
}
