import React from "react";

type RarityProps = {
  rank: number | undefined;
  distinctNftCount: number | undefined;
};

const Rarity: React.FC<RarityProps> = ({ rank, distinctNftCount }) => {
  if (rank === undefined || distinctNftCount == undefined) {
    return <span className="text-text-secondary">—</span>;
  }

  const rankPercentage = (rank / distinctNftCount) * 100;
  let color = "text-text-primary"; // Default to white for top 50%

  if (rankPercentage > 50) {
    color = "text-text-secondary"; // Bottom 50%
  } else if (rankPercentage <= 10) {
    color = "text-primary-accent text-shadow-custom"; // Top 10%
  }

  return <span className={color}>{rank?.toLocaleString()}</span>;
};

export default Rarity;
