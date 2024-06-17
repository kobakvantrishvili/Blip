// components/main/parameters/RadioButton.tsx

import React from "react";

type RadioButtonProps = {
  label: string;
  value: string;
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const RadioButton: React.FC<RadioButtonProps> = ({ label, value, checked, onChange }) => {
  return (
    <div>
      <label className="inline-flex items-center cursor-pointer gap-4">
        <input type="radio" name="status" value={value} checked={checked} onChange={onChange} className="radio-button" />
        <span className="text-sm tracking-widest">{label}</span>
      </label>
    </div>
  );
};

export default RadioButton;
