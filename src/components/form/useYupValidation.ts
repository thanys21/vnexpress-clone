/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { ObjectSchema } from "./yupValidation";

export interface Props {
    errors: Record<string, string>;
    validateField: (name: string, value: any) => void;
    validateAll: (formData: Record<string, any>) => boolean;
    clearError: (name: string) => void;
    setError: (name: string, error: string) => void;
}

export const useYupValidation = (
    schema: ObjectSchema
): Props => {
    const [errors, setErrors] = useState<Record<string, string>>({});

    const validateField = (name: string, value: any) => {
        const error = schema.validateField(name, value);

        setErrors((prev) => {
            const newErrors = { ...prev };
            if (error) {
                newErrors[name] = error;
            } else {
                delete newErrors[name];
            }
            return newErrors;
        });
    };

    const validateAll = (formData: Record<string, any>): boolean => {
        const validationErrors = schema.validate(formData);
        setErrors(validationErrors);
        return Object.keys(validationErrors).length === 0;
    };

    const clearError = (name: string) => {
        setErrors((prev) => {
            const newErrors = { ...prev };
            delete newErrors[name];
            return newErrors;
        });
    };

    const setError = (name: string, error: string) => {
        setErrors((prev) => ({
            ...prev,
            [name]: error,
        }));
    };

    return {
        errors,
        validateField,
        validateAll,
        clearError,
        setError,
    };
};
