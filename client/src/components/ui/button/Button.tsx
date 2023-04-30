import React, { DetailedHTMLProps, FC, HTMLAttributes } from "react";
import cx from "classnames";
type Props = DetailedHTMLProps<
  HTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  theme?: "primary" | "secondary";
};
import styles from "./Button.module.scss";
const Button: FC<Props> = ({ className, theme = "primary", ...props }) => {
  return (
    <button
      className={cx(styles.base, className, styles[`themes_${theme}`])}
      {...props}
    ></button>
  );
};

export default Button;
