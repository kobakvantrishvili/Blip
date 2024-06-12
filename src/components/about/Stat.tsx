import React, { useEffect, useState } from "react";
import { IconType } from "react-icons";

type StatProps = {
  name: string;
  children?: React.ReactNode;
  className?: string;
  icon?: IconType;
};

const Stat: React.FC<StatProps> = ({ name, children, className, icon: Icon }) => {
  const [showFlash, setShowFlash] = useState(false);
  const [isInitialMount, setIsInitialMount] = useState(true);

  useEffect(() => {
    if (!isInitialMount) {
      setShowFlash(true);
      const timer = setTimeout(() => {
        setShowFlash(false);
      }, 500);
      return () => clearTimeout(timer);
    } else {
      setIsInitialMount(false);
    }
  }, [children, isInitialMount]);

  return (
    <div className={`flex flex-col flex-1 justify-center items-end`}>
      <p className={`text-sm text-text-secondary tracking-widest`}>{name}</p>
      <div className={`flex flex-row items-center`}>
        <div className={`text-base tracking-wider ${className} ${showFlash ? "flash" : ""}`}>{children ?? "-"}</div>
        {Icon && <Icon className="text-text-secondary text-xl relative left-1" />}
      </div>
    </div>
  );
};

export default Stat;
