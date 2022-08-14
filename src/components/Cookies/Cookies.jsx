import React from "react";
import cn from "classnames/bind";

//Styles
import styles from "./Cookies.module.scss";

const cx = cn.bind(styles);

function Cookies({ isOpen, onCookies }) {
  return (
    <div
      className={cx(styles.Cookies, {
        [styles.Cookies_active]: isOpen,
      })}
    >
      <p className={styles.Cookies__text}>Мы используем файлы Cookies</p>
      <button className={styles.Cookies__button} onClick={onCookies}>
        ок
      </button>
    </div>
  );
}

export default Cookies;
