import Link from "next/link";
import { khand } from "./fonts";
import { LinkBtnProp } from "../lib/definitions";

export default function LinkBtn({ label, icon: Icon, href }: LinkBtnProp) {
  return (
    <Link
      href={href}
      className={`${khand.className} primary-link relative flex items-center justify-center py-3 capitalize tracking-wider font-bold text-base`}
    >
      <Icon className="absolute w-6 left-4" />
      {label}
    </Link>
  );
}
