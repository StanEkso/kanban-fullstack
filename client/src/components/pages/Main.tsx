import React from "react";
import styles from "./Main.module.scss";
import Button from "../ui/button/Button";
const Main = () => {
  return (
    <div className="mx-4 sm:mx-8">
      <div className={styles["screen-full"]}>
        <div className={styles.page__wrapper}>
          <h2 className={styles["page-title"]}>
            The ultimate tool to help you stay organized and on top of your
            tasks!
          </h2>
          <p className={styles["page-text"]}>
            Kanban Application is a user-friendly web application that allows
            you to manage your tasks and projects from anywhere, at any time.
          </p>
          <div className="">
            <Button className="mx-auto" icon="NextArrow">
              Get for free
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
