import { type ButtonHTMLAttributes } from 'react';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

function Button({ children, className, ...props }: ButtonProps) {
  return (
    <button
      className={`${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
export default Button;