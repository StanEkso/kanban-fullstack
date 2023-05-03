import { Task } from "@/types/board";
import React, { FC } from "react";
import styles from "./TaskCard.module.scss";
interface Props extends Task {}
const TaskCard: FC<Props> = ({ id, title }) => {
  return <div className={styles["container"]}>{title}</div>;
};

export default TaskCard;
