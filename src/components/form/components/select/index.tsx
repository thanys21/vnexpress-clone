"use client";

import React from "react";

export interface SelectOption {
  label: string;
  value: string | number;
}

interface Props {
  name: string;
  options: SelectOption[];
  className?: string;
  disabled?: boolean;
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onBlur?: () => void;
  error?: boolean;
}

const Select = ({
  name,
  options,
  className,
  disabled = false,
  value,
  onChange,
  onBlur,
  error = false,
}: Props): React.ReactElement => {
  return (
    <select
      name={name}
      className={`border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 transition-colors ${
        error
          ? "border-red-500 focus:ring-red-500"
          : "border-gray-300 focus:ring-blue-500"
      } ${className ?? ""}`}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      disabled={disabled}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Select;
