"use client";

import React from "react";
import { InputType } from "../../variables";

interface Props {
  name: string;
  type?: InputType;
  className?: string;
  disabled?: boolean;
  max?: number;
  min?: number;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: () => void;
  error?: boolean;
}

const Input = ({
  name,
  type = "text",
  className,
  disabled = false,
  max,
  min,
  placeholder,
  value,
  onChange,
  onBlur,
  error = false,
}: Props): React.ReactElement => {
  return (
    <input
      name={name}
      type={type}
      className={`border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 transition-colors ${
        error
          ? "border-red-500 focus:ring-red-500"
          : "border-gray-300 focus:ring-blue-500"
      } ${className ?? ""}`}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      disabled={disabled}
      max={max}
      min={min}
      placeholder={placeholder}
    />
  );
};

export default Input;
