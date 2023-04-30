import React, { DetailedHTMLProps, FC, HTMLAttributes } from "react";
import cx from "classnames";
type Props = DetailedHTMLProps<
  HTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  theme?: "primary" | "secondary";
  icon?: IconGlyph;
};
import styles from "./Button.module.scss";
import { Icon, IconGlyph } from "../Icon";
const Button: FC<Props> = ({
  className,
  theme = "primary",
  icon,
  children,
  ...props
}) => {
  return (
    <button
      className={cx(styles.base, className, styles[`themes_${theme}`])}
      {...props}
    >
      {children}
      {!!icon && <Icon glyph={icon} />}
    </button>
  );
};

export default Button;
