import { useEffect } from "react";

// ios browser 에서 height : 100vh property가 적용되지 않아(주소창의 height 까지 포함됨) 사용.

export function useCustomHeight() {
  const handleResize = () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);
}
