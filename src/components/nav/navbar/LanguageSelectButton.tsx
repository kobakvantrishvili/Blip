import React from "react";
import { FiGlobe } from "react-icons/fi";

type LanguageSelectButtonProps = {
  isAboveMediumScreens: boolean;
  onClick?: () => void;
};

const LanguageSelectButton: React.FC<LanguageSelectButtonProps> = ({ isAboveMediumScreens, onClick }) => {
  return (
    <button
      className={`group flex justify-center w-14 py-1 relative shadow-custom border border-dark-border hover:bg-dark-hover rounded-l ${
        !isAboveMediumScreens && "rounded"
      }`}
      onClick={onClick}
    >
      <FiGlobe className={`text-text-secondary group-hover:text-primary-accent text-2xl`} />
      <div
        className={`absolute inset-x-0 bottom-[-1px] h-[1px] bg-gradient-to-r from-secondary-accent via-primary-accent to-secondary-accent shadow-glow`}
      ></div>
    </button>
  );
};

export default LanguageSelectButton;
