import React from "react";

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ placeholder, ...props }, ref) => {
    return (
      <input
        className="w-full bg-white border border-gray-400 shadow text-black rounded-md px-4 py-2"
        placeholder={placeholder}
        ref={ref}
        {...props}
      />
    );
  }
);
