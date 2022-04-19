import { useEffect } from "react";

export function useOutsideClick(ref: any, callback: any) {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current) {
        if (!ref.current.contains(event.target)) {
          callback();
        }
      }
    }
    // Bind the event listener
    document.addEventListener("click", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
}
