"use client";
import React, { FC, PropsWithChildren, useState } from "react";
import styles from "./Dropdown.module.scss";
import Button from "../button/Button";
type Props = {};
import cx from "classnames";
import { Icon, IconGlyph } from "../Icon";
import Link from "next/link";

interface DropdownProps extends PropsWithChildren {}

const Dropdown = ({ children }: DropdownProps) => {
  const [isOpened, setIsOpened] = useState(false);
  return (
    <div className={styles.wrapper}>
      <Button
        theme="secondary"
        onClick={() => setIsOpened(!isOpened)}
        icon="Arrow"
        style={{ transform: isOpened ? "rotate(180deg)" : "" }}
      />
      <div
        className={cx(
          styles["wrapper-dropdown"],
          isOpened && styles[`wrapper-dropdown-opened`]
        )}
      >
        {children}
      </div>
    </div>
  );
};

export default Dropdown;
interface ItemProps extends PropsWithChildren {
  icon: IconGlyph;
  url?: string;
  onClick?: () => void;
}
const Item: FC<ItemProps> = ({ icon, url, children, onClick }) => {
  return (
    <div className="flex gap-2 items-center" onClick={onClick}>
      <Icon glyph={icon} />
      {url && <Link href={url}>{children}</Link>}
      {!url && <p>{children}</p>}
    </div>
  );
};

const Divider = () => <div className={styles["wrapper-divider"]}></div>;

Dropdown.Item = Item;
Dropdown.Divider = Divider;
