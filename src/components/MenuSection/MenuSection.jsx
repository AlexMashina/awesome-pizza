import React from "react";

//Styles
import styles from "./MenuSection.module.scss";

function MenuSection({ children, title }) {
  return (
    <section className={styles.MenuSection} id={title}>
      <h2 className={styles.MenuSection__title}>{title}</h2>
      <div className={styles.MenuSection__box}>{children}</div>
    </section>
  );
}

export default MenuSection;
