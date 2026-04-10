"use client";

import { cn } from "@/lib/utils";

interface FormFieldProps {
  label: string;
  name: string;
  error?: string;
  children: React.ReactNode;
  className?: string;
}

export function FormField({
  label,
  name,
  error,
  children,
  className,
}: FormFieldProps) {
  return (
    <div className={cn("space-y-1.5", className)}>
      <label
        htmlFor={name}
        className="block text-sm font-bold text-gray-700"
      >
        {label}
      </label>
      {children}
      {error && (
        <p className="text-sm text-red-500 mt-1" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  hasError?: boolean;
}

export function Input({ hasError, className, ...props }: InputProps) {
  return (
    <input
      className={cn(
        "w-full neo-border-sm bg-white px-4 py-3 text-dark placeholder:text-gray-400",
        "outline-none transition-all duration-200",
        "focus:border-primary",
        hasError
          ? "border-red-300 focus:border-red-500 focus:ring-red-200"
          : "border-gray-200",
        className
      )}
      {...props}
    />
  );
}

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  hasError?: boolean;
}

export function Textarea({ hasError, className, ...props }: TextareaProps) {
  return (
    <textarea
      className={cn(
        "w-full neo-border-sm bg-white px-4 py-3 text-dark placeholder:text-gray-400",
        "outline-none transition-all duration-200 resize-none",
        "focus:border-primary",
        hasError && "border-red-400",
        className
      )}
      rows={4}
      {...props}
    />
  );
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  hasError?: boolean;
  options: { value: string; label: string }[];
  placeholder?: string;
}

export function Select({
  hasError,
  options,
  placeholder,
  className,
  ...props
}: SelectProps) {
  return (
    <select
      className={cn(
        "w-full neo-border-sm bg-white px-4 py-3 text-dark",
        "outline-none transition-all duration-200 appearance-none",
        "focus:border-primary",
        hasError && "border-red-400",
        className
      )}
      {...props}
    >
      {placeholder && (
        <option value="" disabled>
          {placeholder}
        </option>
      )}
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}

interface RadioGroupProps {
  name: string;
  options: { value: string; label: string }[];
  value: string;
  onChange: (value: string) => void;
  hasError?: boolean;
}

export function RadioGroup({
  name,
  options,
  value,
  onChange,
  hasError,
}: RadioGroupProps) {
  return (
    <div className="flex flex-wrap gap-3">
      {options.map((opt) => (
        <label
          key={opt.value}
          className={cn(
            "flex items-center gap-2 neo-border-sm px-4 py-2.5 cursor-pointer",
            "transition-all duration-200 text-sm",
            value === opt.value
              ? "bg-primary/5 text-primary font-bold neo-shadow-sm"
              : "bg-white text-gray-600 hover:text-primary",
            hasError && !value && "border-red-400"
          )}
        >
          <input
            type="radio"
            name={name}
            value={opt.value}
            checked={value === opt.value}
            onChange={() => onChange(opt.value)}
            className="sr-only"
          />
          <span
            className={cn(
              "w-4 h-4 rounded-full border-2 flex items-center justify-center",
              value === opt.value ? "border-primary" : "border-gray-300"
            )}
          >
            {value === opt.value && (
              <span className="w-2 h-2 rounded-full bg-primary" />
            )}
          </span>
          {opt.label}
        </label>
      ))}
    </div>
  );
}
