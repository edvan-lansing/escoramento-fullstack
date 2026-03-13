import { forwardRef, type InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
  wrapperClassName?: string;
};

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, wrapperClassName, id, ...props }, ref) => {
    const inputId = id ?? props.name;
    const classes = [
      "w-full rounded-xl border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 shadow-sm outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200",
      error ? "border-rose-300 focus:border-rose-400 focus:ring-rose-100" : "",
      className ?? "",
    ]
      .join(" ")
      .trim();

    return (
      <div className={wrapperClassName}>
        {label ? (
          <label htmlFor={inputId} className="mb-1 block text-sm font-medium text-slate-700">
            {label}
          </label>
        ) : null}
        <input id={inputId} ref={ref} className={classes} {...props} />
        {error ? <p className="mt-1 text-xs text-rose-600">{error}</p> : null}
      </div>
    );
  },
);

Input.displayName = "Input";

export default Input;
