"use client";

import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary" | "danger";
  disabled?: boolean;
  className?: string;
  onClick?: () => void;
  minimal?: boolean;
}

const Button = ({
  children,
  type = "button",
  variant = "primary",
  disabled = false,
  className,
  onClick,
  minimal = false,
}: ButtonProps): React.ReactElement => {
  const variantClasses = {
    primary: `${
      minimal
        ? "bg-white hover:bg-blue-100 text-blue-600"
        : "bg-blue-600 hover:bg-blue-700 text-white"
    }`,
    secondary: `${
      minimal
        ? "bg-white hover:bg-gray-100 text-gray-600"
        : "bg-gray-600 hover:bg-gray-700 text-white"
    }`,
    danger: `${
      minimal
        ? "bg-white hover:bg-red-100 text-red-600"
        : "bg-red-600 hover:bg-red-700 text-white"
    }`,
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`px-4 py-2 rounded font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed ${
        variantClasses[variant]
      } ${className ?? ""}`}
    >
      {children}
    </button>
  );
};

export default Button;
