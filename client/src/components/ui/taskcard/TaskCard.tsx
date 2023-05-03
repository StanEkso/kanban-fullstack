import { Task } from "@/types/board";
import React, { FC } from "react";
import styles from "./TaskCard.module.scss";
const TaskCard: FC<Task> = ({ id, title }) => {
  return <div className={styles["container"]}>{title}</div>;
};

export default TaskCard;
