/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { createContext, useContext, useState } from "react";
import { ObjectSchema } from "./yupValidation";
import { useYupValidation } from "./useYupValidation";

// Form Context để chia sẻ validation state
interface FormContextValue {
  formData: Record<string, any>;
  errors: Record<string, string>;
  setFieldValue: (name: string, value: any) => void;
  validateField: (name: string, value: any) => void;
}

const FormContext = createContext<FormContextValue | null>(null);

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    // useFormContext must be used within a Form component
    return null;
  }
  return context;
};

interface FormProps {
  children: React.ReactNode;
  schema: ObjectSchema;
  initialValues?: Record<string, any>;
  onSubmit: (values: Record<string, any>) => void | Promise<void>;
  onValidationError?: (errors: Record<string, string>) => void;
  className?: string;
}

const Form = ({
  children,
  schema,
  initialValues = {},
  onSubmit,
  onValidationError,
  className,
}: FormProps): React.ReactElement => {
  const [formData, setFormData] = useState<Record<string, any>>(initialValues);

  const { errors, validateField, validateAll } = useYupValidation(schema);

  const setFieldValue = (name: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // fix: gọi validateField sau khi cập nhật giá trị
    if (validateField) {
      validateField(name, value);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    // ngăn tải lại trang khi submit form
    e.preventDefault();

    if (schema) {
      const isValid = validateAll(formData);

      if (isValid) {
        onSubmit(formData);
      } else {
        if (onValidationError) {
          onValidationError(errors);
        }
      }
    } else {
      onSubmit(formData);
    }
  };

  const contextValue: FormContextValue = {
    formData,
    errors: errors || {},
    setFieldValue,
    validateField: validateField || (() => {}),
  };

  return (
    <FormContext.Provider value={contextValue}>
      <form onSubmit={handleSubmit} className={className}>
        {children}
      </form>
    </FormContext.Provider>
  );
};

export default Form;
