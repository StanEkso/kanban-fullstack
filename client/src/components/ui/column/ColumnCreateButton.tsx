import React from "react";
import styles from "./Column.module.scss";
import Button from "../button/Button";
type Props = {
  onClick: () => void;
};
const ColumnCreateButton = (props: Props) => {
  return (
    <div className="">
      <Button theme="secondary" icon="Plus" onClick={props.onClick}>
        Add new column
      </Button>
    </div>
  );
};

export default ColumnCreateButton;
