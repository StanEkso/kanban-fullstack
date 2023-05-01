import React from "react";

import styles from "./BoardCard.module.scss";
import cx from "classnames";
const BoardCardAdd = () => {
  return (
    <div className={cx(styles.wrapper, styles["wrapper-create"])}>
      <h3>Add new board</h3>
    </div>
  );
};

export default BoardCardAdd;
