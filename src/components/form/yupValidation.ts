/* eslint-disable @typescript-eslint/no-explicit-any */

type ValidationTest = {
    test: (value: any) => boolean;
    message: string;
};

class StringSchema {
    private tests: ValidationTest[] = [];
    private isRequiredField = false;

    required(message = "Trường này là bắt buộc") {
        this.isRequiredField = true;
        this.tests.push({
            test: (value: any) => {
                if (typeof value === "string") {
                    return value.trim().length > 0;
                }
                return value !== null && value !== undefined && value !== "";
            },
            message,
        });
        return this;
    }

    min(length: number, message?: string) {
        this.tests.push({
            test: (value: any) => {
                if (!value && !this.isRequiredField) return true;
                return String(value).length >= length;
            },
            message: message || `Tối thiểu ${length} ký tự`,
        });
        return this;
    }

    max(length: number, message?: string) {
        this.tests.push({
            test: (value: any) => {
                if (!value && !this.isRequiredField) return true;
                return String(value).length <= length;
            },
            message: message || `Tối đa ${length} ký tự`,
        });
        return this;
    }

    email(message = "Email không hợp lệ") {
        this.tests.push({
            test: (value: any) => {
                if (!value && !this.isRequiredField) return true;
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return emailRegex.test(String(value));
            },
            message,
        });
        return this;
    }

    matches(pattern: RegExp, message = "Định dạng không hợp lệ") {
        this.tests.push({
            test: (value: any) => {
                if (!value && !this.isRequiredField) return true;
                return pattern.test(String(value));
            },
            message,
        });
        return this;
    }

    validate(value: any): string | null {
        for (const test of this.tests) {
            if (!test.test(value)) {
                return test.message;
            }
        }
        return null;
    }
}

class NumberSchema {
    private tests: ValidationTest[] = [];
    private isRequiredField = false;

    required(message = "Trường này là bắt buộc") {
        this.isRequiredField = true;
        this.tests.push({
            test: (value: any) => {
                return value !== null && value !== undefined && value !== "";
            },
            message,
        });
        return this;
    }

    min(minValue: number, message?: string) {
        this.tests.push({
            test: (value: any) => {
                if (!value && !this.isRequiredField) return true;
                return Number(value) >= minValue;
            },
            message: message || `Giá trị tối thiểu là ${minValue}`,
        });
        return this;
    }

    max(maxValue: number, message?: string) {
        this.tests.push({
            test: (value: any) => {
                if (!value && !this.isRequiredField) return true;
                return Number(value) <= maxValue;
            },
            message: message || `Giá trị tối đa là ${maxValue}`,
        });
        return this;
    }

    positive(message = "Giá trị phải là số dương") {
        this.tests.push({
            test: (value: any) => {
                if (!value && !this.isRequiredField) return true;
                return Number(value) > 0;
            },
            message,
        });
        return this;
    }

    integer(message = "Giá trị phải là số nguyên") {
        this.tests.push({
            test: (value: any) => {
                if (!value && !this.isRequiredField) return true;
                return Number.isInteger(Number(value));
            },
            message,
        });
        return this;
    }

    validate(value: any): string | null {
        for (const test of this.tests) {
            if (!test.test(value)) {
                return test.message;
            }
        }
        return null;
    }
}

export class ObjectSchema {
    constructor(private shape: Record<string, any>) { }

    validate(values: Record<string, any>): Record<string, string> {
        const errors: Record<string, string> = {};

        Object.keys(this.shape).forEach((key) => {
            const schema = this.shape[key];
            const value = values[key];
            const error = schema.validate(value);

            if (error) {
                errors[key] = error;
            }
        });

        return errors;
    }

    validateField(fieldName: string, value: any): string | null {
        const schema = this.shape[fieldName];
        if (!schema) return null;
        return schema.validate(value);
    }
}

class MixedSchema {
    private tests: ValidationTest[] = [];

    required(message = "Trường này là bắt buộc") {
        this.tests.push({
            test: (value: any) => {
                return value !== null && value !== undefined && value !== "";
            },
            message,
        });
        return this;
    }

    oneOf(values: any[], message?: string) {
        this.tests.push({
            test: (value: any) => {
                return values.includes(value);
            },
            message: message || `Giá trị phải là một trong: ${values.join(", ")}`,
        });
        return this;
    }

    validate(value: any): string | null {
        for (const test of this.tests) {
            if (!test.test(value)) {
                return test.message;
            }
        }
        return null;
    }
}

export const yup = {
    string: () => new StringSchema(),
    number: () => new NumberSchema(),
    mixed: () => new MixedSchema(),
    object: (shape: Record<string, any>) => new ObjectSchema(shape),
};
