import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  label?: string;
  inputClassname?: string;
  iconClassName?: string;
  rightIcon?: React.ReactNode;
  leftIcon?: React.ReactNode;
  textarea?: boolean;
  rows?: number;
}

export default function InputBox({
  className,
  iconClassName,
  inputClassname,
  rightIcon,
  leftIcon,
  label,
  type,
  textarea,
  rows,
  ...props
}: InputProps) {
  const _boxClassName = cn("mb-4", "inputBox", className);
  const _inputClassname = cn(
    "relative flex w-full rounded-lg border border-neutral-200 bg-white px-3 py-3 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-neutral-950 placeholder:text-neutral-500 focus-visible:outline-none focus-visible:border-1 focus-visible:border-neutral-950 disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-800 dark:bg-neutral-950 dark:ring-offset-neutral-950 dark:file:text-neutral-50 dark:placeholder:text-neutral-400 dark:focus-visible:ring-neutral-300",
    inputClassname
  );
  return (
    <div className={_boxClassName}>
      {label && (
        <p className="text-sm md:text-base">
          {label}
        </p>
      )}
      <div>
        {textarea ? (
          <textarea
            className={_inputClassname}
            rows={rows}
            style={{ resize: "none", maxHeight: "10em" }}
            {...props}
          />
        ) : (
          <input type={type} className={_inputClassname} {...props} />
        )}
        {rightIcon && (
          <div className={cn("inputBoxRightIcon", iconClassName)}>
            {rightIcon}
          </div>
        )}
        {leftIcon && (
          <div className={cn("inputBoxLeftIcon", iconClassName)}>
            {leftIcon}
          </div>
        )}
      </div>
    </div>
  );
}
