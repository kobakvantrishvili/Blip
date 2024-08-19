import React from "react";

type ListingProps = {
  tokenImageUrl: string;
  tokenName: string;
  isChecked: boolean;
  onToggleCheck: () => void;
};

const ListingTitle: React.FC<ListingProps> = ({ tokenImageUrl, tokenName, isChecked, onToggleCheck }) => {
  return (
    <div className="flex items-center gap-3">
      <input
        type="checkbox"
        checked={isChecked}
        onChange={onToggleCheck}
        className="h-[15px] w-[15px] flex-none appearance-none rounded-sm border border-text-tertiary checked:bg-primary-accent focus:outline-none"
      />
      <img src={tokenImageUrl} alt={tokenName} className="w-12 h-12 rounded-md" />
      <span className="text-white">{`L11 ${tokenName}`}</span>
    </div>
  );
};

export default ListingTitle;
