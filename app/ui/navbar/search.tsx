import { HiMiniMagnifyingGlass } from "react-icons/hi2";
import { khand } from "../fonts";
import { useEffect, useRef } from "react";
import { SearchProp } from "@/app/lib/definitions";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export default function Search({ className, refProp }: SearchProp) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Clean input value once route change
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }, [pathname]);

  const handleSearch = useDebouncedCallback((term) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    router.replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <div className={`relative ${className} w-full`} ref={refProp}>
      <input
        ref={inputRef}
        className={`${khand.className} py-1 px-4 border-2 border-logo-500 bg-background-700 w-full rounded-md text-lg outline-none`}
        type="text"
        placeholder="Search..."
        onChange={(e) => handleSearch(e.target.value)}
        defaultValue={searchParams.get("query")?.toString()}
      />
      <HiMiniMagnifyingGlass className="absolute top-0 right-2 w-8 focus:text-5xl cursor-default" />
    </div>
  );
}
