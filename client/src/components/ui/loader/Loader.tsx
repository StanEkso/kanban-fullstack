import React from "react";
import { InfinitySpin } from "react-loader-spinner";
import styles from "./Loader.module.scss";
import cx from "classnames";
type Props = {};

const Loader = (props: Props) => {
  return (
    <div className={cx(styles.base)}>
      <div className={styles.wrapper}>
        <InfinitySpin width="200" color="#215bf0" />
      </div>
    </div>
  );
};

export default Loader;
