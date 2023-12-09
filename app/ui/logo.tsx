import Link from "next/link";
import Image from "next/image";

export default function Logo() {
  return (
    <Link href="/">
      <Image src="/logo.svg" alt="Logo" height={40} width={89.17} />
    </Link>
  );
}
