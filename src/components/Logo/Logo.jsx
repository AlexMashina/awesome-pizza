import React from "react";

//Styles
import styles from "./Logo.module.scss";

function Logo() {
  return (
    <div className={styles.Logo}>
      <a className={styles.Logo__link} href={"/"}>
        Awesome Pizza
        <div className={styles["Logo__link-icon"]}></div>
      </a>
    </div>
  );
}

export default Logo;
