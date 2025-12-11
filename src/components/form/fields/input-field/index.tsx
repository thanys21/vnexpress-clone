import React from "react";
import Input from "../../components/input";
import { InputType } from "../../variables";
import { useFormContext } from "../..";

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
  error: tempError,
  type,
  required,
  placeholder,
  disabled,
  value: tempValue,
  onChange: tempOnChange,
  onBlur,
}: Props): React.ReactElement => {
  const formContext = useFormContext();

  const value =
    tempValue !== undefined ? tempValue : formContext?.formData[name] || "";

  const error = tempError || formContext?.errors[name];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (tempOnChange) {
      tempOnChange(e);
    } else if (formContext) {
      formContext.setFieldValue(name, e.target.value);
    }
  };

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
        onChange={handleChange}
        onBlur={onBlur}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default InputField;
