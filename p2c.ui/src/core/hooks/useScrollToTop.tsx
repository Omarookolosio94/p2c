import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { scrollWindowToTop } from "../utilities/helpers";

export const UseScrollToTop = () => {
  const location = useLocation();

  const { pathname, search } = location;

  useEffect(() => {
    scrollWindowToTop();
  }, [pathname, search]);

  return null;
};
