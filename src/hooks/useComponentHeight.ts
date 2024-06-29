import { useState, useEffect } from "react";

const useComponentHeight = (ref: React.RefObject<HTMLElement>) => {
  const [height, setHeight] = useState<number>(0);

  useEffect(() => {
    const updateHeight = () => {
      if (ref.current) {
        setHeight(ref.current.offsetHeight);
      }
    };

    updateHeight();

    window.addEventListener("resize", updateHeight);

    return () => {
      window.removeEventListener("resize", updateHeight);
    };
  }, [ref]);

  return height;
};

export default useComponentHeight;
