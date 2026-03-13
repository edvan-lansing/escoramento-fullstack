import { forwardRef, type ButtonHTMLAttributes } from "react";

type ButtonVariant = "primary" | "outline" | "ghost" | "danger";
type ButtonSize = "sm" | "md" | "lg";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
};

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-slate-900 text-white hover:bg-slate-800",
  outline: "border border-slate-300 bg-white text-slate-700 hover:bg-slate-100",
  ghost: "bg-transparent text-slate-600 hover:bg-slate-100",
  danger: "border border-rose-300 bg-white text-rose-700 hover:bg-rose-50",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "h-8 px-2.5 text-xs",
  md: "h-10 px-4 text-sm",
  lg: "h-12 px-4 text-sm",
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({
    variant = "primary",
    size = "md",
    fullWidth = false,
    className,
    type = "button",
    ...props
  }, ref) => {
    const classes = [
      "inline-flex items-center justify-center rounded-xl font-semibold transition disabled:cursor-not-allowed disabled:opacity-60",
      variantClasses[variant],
      sizeClasses[size],
      fullWidth ? "w-full" : "",
      className ?? "",
    ]
      .join(" ")
      .trim();

    return <button ref={ref} type={type} className={classes} {...props} />;
  },
);

Button.displayName = "Button";

export default Button;
