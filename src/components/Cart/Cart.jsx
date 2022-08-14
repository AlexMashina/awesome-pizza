import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import cn from "classnames/bind";

//Styles
import styles from "./Cart.module.scss";

//Components
import { CartItem } from "..";

//Actions
import { clearCart } from "../../redux/cartReducer";
import { resetDisableButton } from "../../redux/mainReducer";
import { setOrder } from "../../redux/userReducer";

//Database
import {
  addDoc,
  doc,
  serverTimestamp,
  collection,
  getDocs,
} from "@firebase/firestore";
import { db } from "../../firebase";

const cx = cn.bind(styles);

function Cart() {
  const dispatch = useDispatch();

  //Selectors
  const cartList = useSelector((state) => state.cart.cartList);
  const sum = useSelector((state) => state.cart.sum);
  const user = useSelector((state) => state.user);

  //Payment
  const name = user.name;
  const email = user.email;
  const phone = user.phone;
  const [accessRegister, setAccessRegister] = useState(false);
  const [numberCard, setNumberCard] = useState("");
  const [cvcCard, setCvcCard] = useState("");
  const [dateCard, setDateCard] = useState("");
  const [address, setAddress] = useState("");

  const [isOpen, setIsOpen] = useState(false);
  const [isPaymentOpen, setOpenPayment] = useState(false);
  const [isAccessPayment, setAccessPayment] = useState(false);

  const openOrCloseCart = () => {
    setIsOpen(!isOpen);
    setOpenPayment(false);
  };

  const openPayment = () => {
    setOpenPayment(true);
  };

  const onClearCart = () => {
    dispatch(clearCart());
    dispatch(resetDisableButton());
    setOpenPayment(false);
  };

  const handlerPayment = async () => {
    const order = {
      userId: user.id,
      name,
      phone,
      email,
      sum,
      address,
      listItems: [...cartList],
      timeStamp: serverTimestamp(),
    };
    try {
      if (numberCard && cvcCard && dateCard && address) {
        await addDoc(collection(db, "orders"), {
          ...order,
        });
        setAccessPayment(true);
        const date = new Date().toLocaleDateString();
        const dateTime = new Date().toLocaleTimeString();
        const userOrder = {
          date: date,
          dateTime: dateTime,
          sum,
          listItems: [...order.listItems],
        };
        dispatch(setOrder(userOrder));
        dispatch(clearCart);
        setTimeout(() => {
          setIsOpen(false);
          setOpenPayment(false);
        }, 3000);
      } else {
        alert("Заполните все поля, пожалуйста");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getItems = async () => {
    const querySnapshot = await getDocs(collection(db, "orders"));
    const items = [];
    querySnapshot.forEach((doc) => {
      items.push({ uid: doc.id, ...doc.data() });
    });
  };

  useEffect(() => {
    getItems();
  }, []);

  return (
    <div className={styles.Cart}>
      {" "}
      <button className={styles.Cart__link} onClick={openOrCloseCart}>
        корзина{" "}
        {cartList.length > 0 && (
          <div className={styles["Cart__link-wrapper"]}>
            <div classNmae={styles["Cart__link-count"]}>{cartList.length}</div>
          </div>
        )}
      </button>
      <button
        className={styles["Cart__mobile-button"]}
        type="button"
        onClick={openOrCloseCart}
      >
        <img
          className={styles["Cart__mobile-icon"]}
          src="./assets/icons/cart.png"
          alt="cart"
        />
      </button>
      <div
        className={cx(styles.Cart__modal, {
          [styles.Cart__modal_active]: isOpen,
        })}
      >
        <div
          className={cx(styles["Cart__payment-wrapper"], {
            [styles["Cart__payment-wrapper_active"]]: isPaymentOpen,
          })}
        >
          <form
            className={styles.Cart__payment}
            onSubmit={(e) => e.preventDefault()}
          >
            {accessRegister ? (
              <p className={styles["Cart__payment-access"]}>
                Оплата прошла успешно!
              </p>
            ) : (
              <>
                <p className={styles["Cart__payment-title"]}>Оплата</p>
                <p
                  className={styles["Cart__payment-itog"]}
                >{`Итог: ${sum}р`}</p>
                <p className={styles["Cart__payment-label"]}>Номер карты</p>
                <input
                  className={styles["Cart__payment-input"]}
                  type="text"
                  placeholder="Введите номер карты"
                  onChange={(e) => setNumberCard(e.target.value)}
                />
                <p className={styles["Cart__payment-label"]}>Код cvc</p>
                <input
                  className={styles["Cart__payment-input"]}
                  type="password"
                  placeholder="Введите cvc"
                  onChange={(e) => setCvcCard(e.target.value)}
                />
                <p className={styles["Cart__payment-label"]}>Дата карты</p>
                <input
                  className={styles["Cart__payment-input"]}
                  type="text"
                  placeholder="Укажите дату вашей карты"
                  onChange={(e) => setDateCard(e.target.value)}
                />
                <p className={styles["Cart__payment-label"]}>Адрес доставки</p>
                <input
                  className={styles["Cart__payment-input"]}
                  type="text"
                  placeholder="Укажите адрес доставки"
                  onChange={(e) => setAddress(e.target.value)}
                />
                <button
                  className={styles["Cart__payment-button"]}
                  onClick={handlerPayment}
                  disabled={isAccessPayment}
                >
                  {isAccessPayment ? "Оплачено" : "Оплатить"}
                </button>
              </>
            )}
          </form>
          <button
            className={cx(styles["Cart__button-close"], {
              [styles["Cart__button-close_active"]]: isPaymentOpen,
            })}
            type="button"
            onClick={openOrCloseCart}
          >
            <div className={styles["Cart__cross"]}>
              <div className={styles["Cart__cross-rowTop"]}></div>
              <div className={styles["Cart__cross-rowBottom"]}></div>
            </div>
          </button>
        </div>
        <div
          className={cx(styles.Cart__content, {
            [styles.Cart__content_active]: isOpen,
          })}
        >
          {cartList.length === 0 ? (
            <div className={styles["Cart__content-main"]}>
              <p className={styles["Cart__content-title"]}>Корзина пуста</p>
              <img
                className={styles["Cart__content-image"]}
                src="./assets/empty-cart.png"
                alt="Грустный смайлик"
              />
              <p className={styles["Cart__content-text"]}>
                Пожалуйста вернитесь к каталогу и добавьте что-нибудь в корзину
              </p>
            </div>
          ) : (
            <div className={styles["Cart__content-flex"]}>
              <p className={styles["Cart__content-title"]}>Корзина</p>
              <ul className={styles["Cart__content-list"]}>
                {cartList.map((item, index) => (
                  <CartItem item={item} index={index} key={item.id} />
                ))}
              </ul>
              <div className={styles.Cart__footer}>
                <p className={styles["Cart__footer-sum"]}>К оплате {sum}р</p>
                <button
                  className={styles["Cart__footer-button"]}
                  type="button"
                  disabled={user.isRole ? false : true}
                  onClick={openPayment}
                >
                  Перейти к оплате
                </button>
                <button
                  className={styles["Cart__footer-button"]}
                  type="button"
                  onClick={onClearCart}
                >
                  Очистить корзину
                </button>
              </div>
            </div>
          )}
          <button
            className={cx(styles["Cart__button-close"], {
              [styles["Cart__button-close_active"]]: isPaymentOpen,
            })}
            type="button"
            onClick={openOrCloseCart}
          >
            <div className={styles["Cart__cross"]}>
              <div className={styles["Cart__cross-rowTop"]}></div>
              <div className={styles["Cart__cross-rowBottom"]}></div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
