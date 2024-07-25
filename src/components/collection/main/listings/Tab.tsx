import React from "react";
import Button from "@/components/shared/Button";

type TabProps = {
  text: string;
  isSelected: boolean;
  onClick: () => void;
  Icon: React.ElementType;
};

const Tab: React.FC<TabProps> = ({ text, isSelected, onClick, Icon }) => {
  return (
    <Button
      className={`flex flex-row gap-2 pb-5 items-center ${
        isSelected ? "text-primary-accent border-b border-primary-accent shadow-custom" : "text-text-secondary hover:text-text-primary"
      }`}
      onClick={onClick}
    >
      <Icon className="text-xl" />
      <p className="tracking-wider text-base">{text}</p>
    </Button>
  );
};

export default Tab;
