import cx from "classnames";

import { Icons } from "../Icon";
import styles from "./Input.module.scss";
import { IconWrapper } from "./InputWrapper/IconWrapper";
import { ValueOf } from "next/dist/shared/lib/constants";

export const statuses = {
  default: "default",
  error: "error",
} as const;

export type Props = {
  status?: ValueOf<typeof statuses>;
  preIcon?: keyof typeof Icons;
  afterIcon?: keyof typeof Icons;
  className?: string;
} & React.ComponentProps<"input">;

export function Input({
  status = statuses.default,
  preIcon,
  afterIcon,
  className,
  ...restProps
}: Props) {
  return (
    <div className={cx(styles.base, styles[`statuses_${status}`])}>
      {preIcon && <IconWrapper glyph={preIcon} />}
      <input
        type="text"
        className={cx(styles.input, className)}
        {...restProps}
      />
      {afterIcon && <IconWrapper glyph={afterIcon} />}
    </div>
  );
}

Input.statuses = statuses;
