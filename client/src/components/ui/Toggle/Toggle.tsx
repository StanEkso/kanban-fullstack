import cx from "classnames";

import styles from "./Toggle.module.scss";

export type Props = {
  enabled: boolean;
  onChange: (newState: boolean) => void;
};

export function Toggle({ enabled, onChange }: Props) {
  return (
    <div
      className={cx(styles.base, enabled && styles.base_on)}
      onClick={() => onChange(!enabled)}
    >
      <span className={cx(styles.switch, enabled && styles.switch_on)} />
    </div>
  );
}
