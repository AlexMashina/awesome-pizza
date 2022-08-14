import React from "react";
import { useDispatch } from "react-redux";

//Styles
import styles from "./CartItem.module.scss";

//Actions
import {
  countIncrease,
  countDecrease,
  addToCart,
} from "../../redux/mainReducer";
import {
  countMinus,
  countPlus,
  removeItem,
  setSum,
} from "../../redux/cartReducer";

function CartItem({ item, index }) {
  const dispatch = useDispatch();

  const onButtonPlus = (id, index) => {
    dispatch(countIncrease(id));
    dispatch(countPlus(index));
    dispatch(setSum());
  };

  const onButtonMinus = (id, index) => {
    dispatch(countDecrease(id));
    dispatch(countMinus(index));
    dispatch(setSum());
  };

  const removeCartItem = (id, index) => {
    dispatch(removeItem(index));
    dispatch(addToCart(id));
    dispatch(setSum());
  };

  return (
    <li className={styles.CartItem} key={item.id}>
      <div className={styles.CartItem__wrapper}>
        <img
          className={styles["CartItem__wrapper-image"]}
          src={item.urlImage}
          alt="Пицца"
        />
        <div className={styles.CartItem__blockInfo}>
          <p className={styles["CartItem__wrapper-name"]}>{item.name}</p>
          <p
            className={styles["CartItem__wrapper-price"]}
          >{`Цена: ${item.price}р`}</p>
          <div className={styles.CartItem__count}>
            <p className={styles["CartItem__count-text"]}>Количество:</p>
            <div className={styles["CartItem__count-buttons"]}>
              <button
                className={styles["CartItem__count-button"]}
                type="button"
                onClick={() => onButtonMinus(item.id, index)}
              >
                -
              </button>
              {item.count}
              <button
                className={styles["CartItem__count-button"]}
                onClick={() => onButtonPlus(item.id, index)}
                type="button"
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
      <button
        className={styles.CartItem__cross}
        type="button"
        onClick={() => removeCartItem(item.id, index)}
      >
        <div className={styles["CartItem__cross-wrapper"]}>
          <div className={styles["CartItem__cross-rowTop"]}></div>
          <div className={styles["CartItem__cross-rowBottom"]}></div>
        </div>
      </button>
    </li>
  );
}

export default CartItem;
