import React, { useState } from "react";
import cn from "classnames/bind";
import { useSelector, useDispatch } from "react-redux";

//Styles
import styles from "./User.module.scss";

//Actions
import { removeUser } from "../../redux/userReducer";

const cx = cn.bind(styles);

function User() {
  const [isOpen, setIsOpen] = useState(false);

  const dispatch = useDispatch();

  const onUser = () => {
    setIsOpen(!isOpen);
  };

  const onExit = () => {
    dispatch(removeUser());
    window.localStorage.removeItem("user");
    setIsOpen(!isOpen);
  };

  const user = useSelector((state) => state.user);

  return (
    <div className={styles.User}>
      <button className={styles.User__button} type="button" onClick={onUser}>
        кабинет
      </button>
      <button
        className={styles["User__mobile-button"]}
        type="button"
        onClick={onUser}
      >
        <img
          className={styles["User__mobile-icon"]}
          src="./assets/icons/user.png"
          alt="user"
        />
      </button>
      <div
        className={cx(styles["User__modal"], {
          [styles.User__modal_active]: isOpen,
        })}
      >
        <div
          className={cx(styles["User__modal-content"], {
            [styles["User__modal-content_active"]]: isOpen,
          })}
        >
          <ul className={styles["User__main"]}>
            <p className={styles["User__main-title"]}>Кабинет</p>
            <li className={styles["User__main-label"]}>Имя: </li>
            <li className={styles["User__main-text"]}>{user.name}</li>
            <li className={styles["User__main-label"]}>Почта: </li>
            <li className={styles["User__main-text"]}>{user.email}</li>
            <li className={styles["User__main-label"]}>Номер телефона: </li>
            <li className={styles["User__main-text"]}>{user.phone}</li>
            <ul className={styles["User__main-label"]}>
              <li>
                {user.orders.length !== 0
                  ? "Активные заказы"
                  : "Активных заказов нет"}
              </li>
              {user.orders.map((item) => (
                <div>
                  <p>{`Дата заказа: ${item.date}`}</p>
                  <p>{`Время заказа: ${item.dateTime}`}</p>
                  <p>{`Сумма заказа: ${item.sum}`}</p>
                  <ul>
                    {item.listItems.map((item) => (
                      <li>{`${item.category} ${item.name}, кол-во ${item.count}`}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </ul>
            <button
              className={styles["User__main-out"]}
              type="button"
              onClick={onExit}
            >
              выйти
            </button>
          </ul>
          <button
            className={styles["User__button-close"]}
            type="button"
            onClick={onUser}
          >
            <div className={styles["User__cross"]}>
              <div className={styles["User__cross-rowTop"]}></div>
              <div className={styles["User__cross-rowBottom"]}></div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

export default User;
