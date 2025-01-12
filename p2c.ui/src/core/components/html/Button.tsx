import React from "react";
import { cx } from "../../utilities/helpers";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
}

export default function Button({ children, ...rest }: ButtonProps) {
  return (
    <button
      suppressHydrationWarning
      {...rest}
      className={cx("btn", rest.className!)}
    >
      {children}
    </button>
  );
}
