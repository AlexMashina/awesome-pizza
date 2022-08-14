import React, { useState } from "react";
import { useSelector } from "react-redux";

import classNames from "classnames/bind";

//Styles
import styles from "./Menu.module.scss";

const cx = classNames.bind(styles);

function Menu() {
  const [isOpen, setIsOpen] = useState(false);
  const [linkActive, setLinkActive] = useState(null);

  const list = useSelector((state) => state.main.listTitles);

  const onMenu = () => {
    setIsOpen(!isOpen);
    setLinkActive(null);
  };

  const onMenuLink = (index) => {
    setLinkActive(index);
    onMenu(false);
  };

  return (
    <div className={styles.Menu}>
      <button className={styles.Menu__button} onClick={onMenu}>
        меню
      </button>
      <button className={styles.Menu__burger} type="button" onClick={onMenu}>
        <div className={styles["Menu__burger-row"]}></div>
        <div className={styles["Menu__burger-row"]}></div>
        <div className={styles["Menu__burger-row"]}></div>
      </button>
      <div
        className={cx(styles.Menu__list, {
          Menu__list_active: isOpen,
        })}
      >
        {list.map((item, index) => (
          <a
            className={
              linkActive === index
                ? cx("Menu__list-link_active")
                : cx("Menu__list-link")
            }
            href={`#${item}`}
            onClick={() => onMenuLink(index)}
            key={item}
          >
            {item}
          </a>
        ))}
      </div>
    </div>
  );
}

export default Menu;
