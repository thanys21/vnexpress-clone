import React from "react";
import Input from "../../components/input";
import { InputType } from "../../variables";

interface Props {
  name: string;
  label?: string;
  error?: string;
  type?: InputType;
  required?: boolean;
  placeholder?: string;
  disabled?: boolean;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: () => void;
}

const InputField = ({
  name,
  label,
  error,
  type,
  required,
  placeholder,
  disabled,
  value,
  onChange,
  onBlur,
}: Props): React.ReactElement => {
  return (
    <div className="mb-4">
      {label && (
        <label htmlFor={name} className="block mb-2 font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <Input
        name={name}
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        error={!!error}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default InputField;
