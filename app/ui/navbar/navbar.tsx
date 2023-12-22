import React, { Suspense } from "react";
import NavbarContent from "@/app/ui/navbar/navbarContent";
import UserMenu from "@/app/ui/navbar/userMenu";

export default function Navbar() {
  return (
    <header>
      <NavbarContent>
        <Suspense fallback={<span>Loading...</span>}>
          <UserMenu />
        </Suspense>
      </NavbarContent>
    </header>
  );
}
