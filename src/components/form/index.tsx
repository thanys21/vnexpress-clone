"use client";

import React from "react";

interface FormProps {
  children: React.ReactNode;
  onSubmit: (e: React.FormEvent) => void | Promise<void>;
  className?: string;
}

const Form = ({
  children,
  onSubmit,
  className,
}: FormProps): React.ReactElement => {
  return (
    <form onSubmit={onSubmit} className={className}>
      {children}
    </form>
  );
};

export default Form;
