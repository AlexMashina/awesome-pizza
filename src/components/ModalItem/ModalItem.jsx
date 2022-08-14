import React, { useState } from "react";
import cn from "classnames/bind";
import { useDispatch, useSelector } from "react-redux";

//Actions
import { addItem, setSum } from "../../redux/cartReducer";
import {
  countIncrease,
  countDecrease,
  addToCart,
} from "../../redux/mainReducer";

//Styles
import styles from "./ModalItem.module.scss";

const cx = cn.bind(styles);

function ModalItem({ isOpenModal, onCloseModal, itemId }) {
  const menuList = useSelector((state) =>
    state.main.menuList.filter((item) => item.id === itemId)
  );
  const activeItem = menuList[0] || {};

  const dispatch = useDispatch();
  const onAddCart = (item) => {
    dispatch(addItem({ ...item }));
    dispatch(addToCart(item.id));
    dispatch(setSum());
  };

  const onButtonPlus = () => {
    dispatch(countIncrease(itemId));
    dispatch(setSum());
  };

  const onButtonMinus = () => {
    dispatch(countDecrease(itemId));
    dispatch(setSum());
  };

  return (
    <div
      className={cx(styles.ModalItem, {
        [styles.ModalItem_active]: isOpenModal,
      })}
    >
      <div
        className={cx(styles.ModalItem__content, {
          [styles.ModalItem__content_active]: isOpenModal,
        })}
      >
        <img
          className={styles["ModalItem__content-image"]}
          src={activeItem.urlImage}
          alt=""
        />
        <div className={styles["ModalItem__content-block"]}>
          <div className={styles["ModalItem__content-info"]}>
            <h3
              className={styles["ModalItem__content-title"]}
            >{`${activeItem.category}: ${activeItem.name}`}</h3>
            <p className={styles["ModalItem__content-description"]}>
              {activeItem.description}
            </p>
            {isOpenModal && activeItem.ingridients !== null ? (
              <div className={styles.ModalItem__ingridients}>
                <p className={styles["ModalItem__ingridients-title"]}>
                  Ингридиенты
                </p>
                <ul className={styles.ModalItem__list}>
                  {activeItem.ingridients.map((item) => (
                    <li className={styles["ModalItem__list-item"]} key={item}>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              ""
            )}
            <p className={styles["ModalItem__content-shortDesc"]}>
              {activeItem.shortDesc}
            </p>
            <p
              className={styles["ModalItem__content-price"]}
            >{`Цена: ${activeItem.price}р`}</p>
            <div className={styles.ModalItem__count}>
              <p className={styles["ModalItem__count-text"]}>Количество:</p>
              <div className={styles["ModalItem__count-buttons"]}>
                <button
                  className={cx(styles["ModalItem__count-button"], {
                    [styles["ModalItem__count-button_disabled"]]:
                      activeItem.isAdded,
                  })}
                  type="button"
                  onClick={onButtonMinus}
                  disabled={activeItem.isAdded}
                >
                  -
                </button>
                {activeItem.count}
                <button
                  className={cx(styles["ModalItem__count-button"], {
                    [styles["ModalItem__count-button_disabled"]]:
                      activeItem.isAdded,
                  })}
                  onClick={onButtonPlus}
                  type="button"
                  disabled={activeItem.isAdded}
                >
                  +
                </button>
              </div>
            </div>
          </div>
          <button
            className={cx(styles["ModalItem__content-button"], {
              [styles["ModalItem__content-button_disabled"]]:
                activeItem.isAdded,
            })}
            type="button"
            onClick={() => onAddCart(activeItem)}
            disabled={activeItem.isAdded}
          >
            {activeItem.isAdded ? "Добавлено" : "В корзину"}
          </button>
          <button
            className={styles.ModalItem__cross}
            type="button"
            onClick={onCloseModal}
          >
            <div className={styles["ModalItem__cross-wrapper"]}>
              <div className={styles["ModalItem__cross-rowTop"]}></div>
              <div className={styles["ModalItem__cross-rowBottom"]}></div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalItem;
