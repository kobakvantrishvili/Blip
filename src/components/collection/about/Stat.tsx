import React, { useEffect, useRef, useState } from "react";
import { IconType } from "react-icons";

type StatProps = {
  name: string;
  value?: string | undefined;
  suffix?: string;
  className?: string;
  icon?: IconType;
};

const Stat: React.FC<StatProps> = ({ name, value, suffix, className, icon: Icon }) => {
  const [showFlash, setShowFlash] = useState(false);
  const previousChildrenRef = useRef<React.ReactNode>(undefined);

  useEffect(() => {
    if (previousChildrenRef.current !== undefined && previousChildrenRef.current !== value) {
      setShowFlash(true);
      const timer = setTimeout(() => {
        setShowFlash(false);
      }, 500);
      return () => clearTimeout(timer);
    }
    previousChildrenRef.current = value;
  }, [value]);

  return (
    <div className="flex flex-col flex-1 justify-center items-end">
      <p className="text-text-secondary tracking-widest whitespace-nowrap text-sm">{name}</p>
      <div className="flex flex-row items-center">
        <div className={`text-base tracking-wider ${className} ${showFlash ? "flash" : ""}`}>
          {value ?? "-"}
          {suffix}
        </div>
        {Icon && <Icon className="text-text-secondary text-xl relative left-1" />}
      </div>
    </div>
  );
};

export default Stat;
