import React from "react";
import type { InputHTMLAttributes } from "react";

type RadioOption = string | number | Record<string, string | number>;

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string | null;
  fullWidth?: boolean;
  className?: string;
  optionNameKey?: string;
  optionValueKey?: string;
  selectedValue?: RadioOption;
  options?: RadioOption[];
}

const RadioGroup: React.FC<InputProps> = ({
  label = "",
  error = null,
  fullWidth = true,
  className = "",
  optionNameKey = "text",
  optionValueKey = "value",
  selectedValue = "",
  options = [],
  ...rest
}) => {
  const base =
    "px-4 py-2 rounded-lg text-sm placeholder-gray-400 bg-white text-gray-900 disabled:opacity-60 disabled:cursor-not-allowed flex gap-4 h-[38px]";
  const focus =
    "focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500";
  const errorStyle = error
    ? "border-red-500 focus:ring-red-500"
    : "border-gray-200";

  const isOptionObject = (
    option: unknown
  ): option is Record<string, RadioOption> => {
    return typeof option === "object" && option !== null;
  };

  return (
    <div className={`${fullWidth ? "w-full" : "inline-block"} ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}

      <div
        className={`${base} ${focus} ${errorStyle} ${
          fullWidth ? "w-full" : "min-w-[200px]"
        }`}
      >
        {options.map((option) => (
          <label
            key={isOptionObject(option) ? option[optionValueKey] : option}
            className="flex items-center gap-1"
          >
            <input
              type="radio"
              {...rest}
              checked={
                isOptionObject(option)
                  ? option[optionValueKey] === selectedValue
                  : option === selectedValue
              }
              value={isOptionObject(option) ? option[optionValueKey] : option}
              className="accent-blue-600"
              required
            />
            {isOptionObject(option) ? option[optionNameKey] : option}
          </label>
        ))}
      </div>
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
};

export default RadioGroup;
