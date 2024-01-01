"use client";
import Link from "next/link";
import { GoCodeOfConduct } from "react-icons/go";
import { MdOutlinePrivacyTip } from "react-icons/md";
import { IoDocumentOutline } from "react-icons/io5";
import { SiLinkedin, SiGithub } from "react-icons/si";
import { FaGlobe } from "react-icons/fa";
import { useSession } from "next-auth/react";
import { audiowide } from "./fonts";
import SignOutButton from "./auth/signOutButton";

export default function FooterSide() {
  const { status } = useSession();

  return (
    <section className="p-2 flex h-[calc(100vh-65.36px)] flex-col justify-between top-[64.36px] sticky z-10 bg-background-700">
      <div className="">
        {status === "authenticated" && (
          <div>
            <SignOutButton />
          </div>
        )}
        {status === "unauthenticated" && (
          <div className="flex flex-col items-center justify-center text-center gap-2 bg-background-500 rounded-md p-2">
            <p className="font-bold text-lg max-w-[290px] ">
              <span className={`${audiowide.className} uppercase`}>
                Say it louder{" "}
              </span>
              is a community of 5,236900 amazing people.
            </p>
            <p className="text-base font-light max-w-xs text-stone-500">
              The platform offers users the ability to create, interact and
              express themselves freely.
            </p>
            <Link href="/signup" className="primary-link capitalize">
              create account
            </Link>
            <Link href="/login" className="simple-link capitalize">
              login
            </Link>
          </div>
        )}
      </div>
      <footer className="capitalize space-y-2 border-t-2 border-stone-400/30 pt-8">
        <span>other</span>
        <div className="space-y-0 text-base ">
          <Link
            href="/code-of-conduct"
            className="flex items-center gap-1 hover:brightness-75"
          >
            <GoCodeOfConduct className="text-lg" />
            <span>code of conduct</span>
          </Link>
          <Link
            href="/code-of-conduct"
            className="flex items-center gap-1 hover:brightness-75"
          >
            <MdOutlinePrivacyTip className="text-lg" />
            <span>privacy policy</span>
          </Link>
          <Link
            href="/code-of-conduct"
            className="flex items-center gap-1 hover:brightness-75"
          >
            <IoDocumentOutline className="text-lg" />
            <span>terms of use</span>
          </Link>
        </div>
        <div className="flex items-center gap-2 ">
          <a href="https://github.com/jeisonverjan" target="_blank">
            <SiGithub className="text-4xl hover:brightness-75" />
          </a>
          <a href="https://www.linkedin.com/in/jeison-verjan/" target="_blank">
            <SiLinkedin className="text-4xl hover:brightness-75" />
          </a>
          <a href="https://jeison-verjan-portfolio.vercel.app/" target="_blank">
            <FaGlobe className="text-4xl hover:brightness-75" />
          </a>
          <span className="text-xs font-normal">©copyright 2023</span>
        </div>
      </footer>
    </section>
  );
}
