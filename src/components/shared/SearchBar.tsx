import React, { useState, useRef } from "react";
import { IconType } from "react-icons";
import { FiSearch } from "react-icons/fi";

interface SearchBarProps {
  className?: string;
  barWidth: string;
  placeholder?: string;
  iconSize?: string;
  icon?: IconType;
}

const SearchBar: React.FC<SearchBarProps> = ({ className, barWidth, placeholder, iconSize, icon: Icon }) => {
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClearInput = () => {
    setInputValue("");
  };

  const handleFocusInput = () => {
    inputRef.current?.focus();
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div onClick={handleFocusInput} className={"cursor-pointer px-1 py-1"}>
        <FiSearch className={`text-text-secondary ${iconSize ? iconSize : "text-2xl"}`} />
      </div>
      <input
        ref={inputRef}
        type="text"
        placeholder={placeholder}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className={`bg-dark-bg text-text-primary placeholder-text-tertiary focus:outline-none flex-grow ${barWidth}`}
      />
      {Icon && (
        <button onClick={handleClearInput} className="px-1 py-1">
          <Icon className={`text-text-secondary hover:text-primary-accent cursor-pointer ${iconSize ? iconSize : "text-2xl"}`} />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
