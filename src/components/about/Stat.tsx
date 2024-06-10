import React from "react";
import { IconType } from "react-icons";

type StatProps = {
  name: string;
  stat: number | string | null | undefined;
  icon?: IconType;
};

const Stat: React.FC<StatProps> = ({ name, stat, icon: Icon }) => {
  return (
    <div className={`flex flex-col flex-1 justify-center items-end`}>
      <p className={`text-sm text-text-secondary tracking-widest`}>{name}</p>
      <div className={`flex flex-row items-center`}>
        <div className={`text-base text-text-primary pl-10 tracking-wider`}>{stat}</div>
        {Icon && <Icon className="text-text-secondary text-xl relative left-1" />}
      </div>
    </div>
  );
};

export default Stat;
