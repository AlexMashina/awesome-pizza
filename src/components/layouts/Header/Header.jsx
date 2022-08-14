import React from "react";
import { useSelector } from "react-redux";

//Styles
import styles from "./Header.module.scss";

//Components
import { Logo, Menu, Cart, Login, User } from "../../";

function Header() {
  const info = useSelector((state) => state.user);
  const user = window.localStorage.getItem("user") || null;

  return (
    <header className={styles.Header}>
      <div className={styles.Header__wrapper}>
        <Logo />
        <nav className={styles.Header__nav}>
          <div className={styles.Header__buttons}>
            <Menu />
            <Cart />
            {user ? <User /> : <Login />}
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Header;
