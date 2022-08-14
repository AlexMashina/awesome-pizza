//Styles
import styles from "./MenuItem.module.scss";

import React from "react";

function MenuItem({ item, onMenuItem }) {
  return (
    <button className={styles.MenuItem} onClick={() => onMenuItem(item.id)}>
      <img className={styles.MenuItem__image} src={item.urlImage} alt="" />
      <div className={styles.MenuItem__content}>
        <div className={styles["MenuItem__info-wrapper"]}>
          <h3 className={styles["MenuItem__content-title"]}>{item.name}</h3>
          <p className={styles["MenuItem__content-description"]}>
            {item.description}
          </p>
          <p className={styles["MenuItem__content-price"]}>{item.price}р</p>
        </div>
        <button className={styles["MenuItem__content-button"]} type="button">
          Подробнее
        </button>
      </div>
    </button>
  );
}

export default MenuItem;
