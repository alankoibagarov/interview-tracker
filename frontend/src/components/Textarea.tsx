import { forwardRef } from "react";
import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string | null;
  fullWidth?: boolean;
  className?: string;
  rows?: number | string;
}

const Textarea = forwardRef<HTMLTextAreaElement, InputProps>(
  (
    {
      label,
      error = null,
      fullWidth = true,
      className = "",
      rows = 3,
      ...rest
    },
    ref
  ) => {
    const base =
      "px-4 py-2 rounded-lg border text-sm placeholder-gray-400 bg-white text-gray-900 disabled:opacity-60 disabled:cursor-not-allowed resize-none";
    const focus =
      "focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500";
    const errorStyle = error
      ? "border-red-500 focus:ring-red-500"
      : "border-gray-200";

    return (
      <div className={`${fullWidth ? "w-full" : "inline-block"} ${className}`}>
        {label && (
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {label}
          </label>
        )}

        <textarea
          rows={Number(rows)}
          ref={ref}
          {...rest}
          className={`${base} ${focus} ${errorStyle} ${
            fullWidth ? "w-full" : "min-w-[200px]"
          }`}
        />

        {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
      </div>
    );
  }
);

export default Textarea;
