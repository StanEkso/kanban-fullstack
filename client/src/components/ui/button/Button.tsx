import React, { DetailedHTMLProps, FC, HTMLAttributes } from "react";
import cx from "classnames";
type Props = DetailedHTMLProps<
  HTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    theme?: "primary" | "secondary";
    icon?: IconGlyph;
    preIcon?: IconGlyph;
  };
import styles from "./Button.module.scss";
import { Icon, IconGlyph } from "../Icon";
const Button: FC<Props> = ({
  className,
  theme = "primary",
  icon,
  preIcon,
  children,
  ...props
}) => {
  return (
    <button
      className={cx(styles.base, className, styles[`themes_${theme}`])}
      {...props}
    >
      {!!preIcon && <Icon glyph={preIcon} />}
      {children}
      {!!icon && <Icon glyph={icon} />}
    </button>
  );
};

export default Button;
