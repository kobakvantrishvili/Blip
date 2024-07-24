import React from "react";

type TabProps = {
  text: string;
  Icon: React.ElementType;
};

const Tab: React.FC<TabProps> = ({ text, Icon }) => {
  return (
    <div className="flex flex-row gap-2">
      <Icon className="text-2xl text-text-secondary" />
      <p className="text-text-secondary tracking-wider">{text}</p>
    </div>
  );
};

export default Tab;
