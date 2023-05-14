"use client";

import React from "react";
import styles from "./Main.module.scss";
import Button from "../../ui/button/Button";
import { useAction } from "@/helpers/hooks";
import { actions } from "@/store";
import PromoImage from "@/assets/main.png";
import PromoImagePhone from "@/assets/phone.png";
import Image from "next/image";
const Main = () => {
  const open = useAction(actions.modal.open);
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
            <Button
              className="mx-auto"
              icon="NextArrow"
              onClick={() => open("sign-in")}
            >
              Get for free
            </Button>
          </div>
        </div>
        <div className={styles["page-image-wrapper"]}>
          <Image
            src={PromoImage}
            className={styles["page-image"]}
            alt="Promo image"
          />
          <Image
            src={PromoImagePhone}
            className={styles["page-image-phone"]}
            alt="Promo image"
          />
        </div>
      </div>
    </div>
  );
};

export default Main;
