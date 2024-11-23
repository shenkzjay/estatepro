import { useState, useEffect } from "react";

type matchmediaquery = string;

export const useMatchMedia = (matchmediaquery: matchmediaquery) => {
  const [mobileView, setMobileView] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const isMobileView = window.matchMedia(matchmediaquery);
      setMobileView(isMobileView.matches);

      const handleMediaChange = () => setMobileView(isMobileView.matches);

      isMobileView.addEventListener("change", handleMediaChange);

      return () => {
        isMobileView.removeEventListener("change", handleMediaChange);
      };
    }
  }, [mobileView]);

  return mobileView;
};
