import React, { useState } from "react";
import RadioButton from "@/components/shared/RadioButton"; // Adjust the import path as per your directory structure

const Status: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<string>("BUY NOW");

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div className="flex flex-col gap-3 px-3">
      <h2 className="text-sm tracking-widest">STATUS</h2>
      <div className="flex flex-col gap-1">
        <RadioButton label="BUY NOW" value="BUY NOW" checked={selectedOption === "BUY NOW"} onChange={handleOptionChange} />
        <RadioButton label="SHOW ALL" value="SHOW ALL" checked={selectedOption === "SHOW ALL"} onChange={handleOptionChange} />
      </div>
    </div>
  );
};

export default Status;
