import React, { FC } from "react";
import styles from "./Tabs.module.scss";
import { Icon, IconGlyph } from "../Icon";
import Link from "next/link";
export interface Tab {
  icon: IconGlyph;
  title: string;
  url: string;
}

interface Props {
  tabs: Tab[];
}

const Tabs: FC<Props> = ({ tabs }) => {
  return (
    <div className={styles.container}>
      {tabs.map((tab) => (
        <Tab key={tab.icon} {...tab} />
      ))}
    </div>
  );
};

const Tab: FC<Tab & { opened?: boolean }> = ({
  icon,
  title,
  url,
  opened = true,
}) => {
  return (
    <div className={styles.container__element}>
      <Link href={url}>
        <Icon glyph={icon} />
      </Link>
      {opened && (
        <Link href={url}>
          <span>{title}</span>
        </Link>
      )}
    </div>
  );
};

export default Tabs;
