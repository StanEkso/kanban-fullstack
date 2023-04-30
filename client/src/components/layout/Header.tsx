import React from "react";
import styles from "./Header.module.scss";
import Profile from "./profile/Profile";
const Header = () => {
  return (
    <header className={styles.header}>
      <h2>Kanban application</h2>
      <Profile></Profile>
    </header>
  );
};

export default Header;
