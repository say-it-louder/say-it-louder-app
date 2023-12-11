import Link from "next/link";
import Image from "next/image";

export default function Logo() {
  return (
    <Link href="/" className="max-w-[90px]">
      <Image
        src="/logo.svg"
        priority={true}
        alt="Logo"
        width={90}
        height={40}
        style={{ width: "auto" }}
      />
    </Link>
  );
}
