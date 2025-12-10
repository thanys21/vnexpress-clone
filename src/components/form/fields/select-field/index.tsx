import React from "react";
import Select, { SelectOption } from "../../components/select";

interface Props {
  name: string;
  label?: string;
  options: SelectOption[];
  error?: string;
  required?: boolean;
  placeholder?: string;
  disabled?: boolean;
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onBlur?: () => void;
}

const SelectField = ({
  name,
  label,
  options,
  error,
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
      <Select
        name={name}
        options={options}
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

export default SelectField;
