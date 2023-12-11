import { useEffect } from "react";

export function useOutsideClick(
  targetRef: React.RefObject<HTMLElement>,
  onOutsideClick: () => void
) {
  useEffect(() => {
    const handleClickOutside = (e: globalThis.MouseEvent) => {
      if (!targetRef.current?.contains(e.target as Node)) {
        onOutsideClick();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [targetRef, onOutsideClick]);
}
