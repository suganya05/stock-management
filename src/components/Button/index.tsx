import React, { ButtonHTMLAttributes } from "react";
import "./Button.scss";

interface button extends ButtonHTMLAttributes<HTMLButtonElement> {
  varient: "primary" | "secondary";
  size?: "small" | "medium" | "large";
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children?: React.ReactNode;
}
const Button: React.FC<button> = ({
  varient,
  size,
  leftIcon,
  rightIcon,
  children,
  type = "button",
  ...rest
}) => {
  return (
    <div>
      <button type={type} className={`btn btn-${varient} ${size}`} {...rest}>
        {leftIcon && <span className="btn-icon left">{leftIcon}</span>}
        {children}
        {rightIcon && <span className="btn-icon right">{rightIcon}</span>}
      </button>
    </div>
  );
};
export default Button;
