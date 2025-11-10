import React from "react";
import type { InputHTMLAttributes } from "react";

type SelectOption = string | number | Record<string, string | number>;

interface InputProps extends InputHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string | null;
  fullWidth?: boolean;
  className?: string;
  optionNameKey?: string;
  optionValueKey?: string;
  options?: SelectOption[];
}

const Select: React.FC<InputProps> = ({
  label = "",
  error = null,
  fullWidth = true,
  className = "",
  optionNameKey = "text",
  optionValueKey = "value",
  options = [],
  ...rest
}) => {
  const base =
    "px-4 py-2 rounded-lg border text-sm placeholder-gray-400 bg-white text-gray-900 disabled:opacity-60 disabled:cursor-not-allowed h-[38px]";
  const focus =
    "focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500";
  const errorStyle = error
    ? "border-red-500 focus:ring-red-500"
    : "border-gray-200";

  const isOptionObject = (
    option: unknown
  ): option is Record<string, unknown> => {
    return typeof option === "object" && option !== null;
  };

  return (
    <div className={`${fullWidth ? "w-full" : "inline-block"} ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}

      <select
        {...rest}
        className={`${base} ${focus} ${errorStyle} ${
          fullWidth ? "w-full" : "min-w-[200px]"
        }`}
      >
        {Object.values(options).map((option) => (
          <option
            key={isOptionObject(option) ? option[optionValueKey] : option}
            value={isOptionObject(option) ? option[optionValueKey] : option}
          >
            {isOptionObject(option) ? option[optionNameKey] : option}
          </option>
        ))}
      </select>
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
};

export default Select;
