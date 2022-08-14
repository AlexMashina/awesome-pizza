import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { setDoc, doc, serverTimestamp, getDoc } from "@firebase/firestore";
import InputMask from "react-input-mask";

import cn from "classnames/bind";

//Actions
import { setUser } from "../../redux/userReducer";

//Styles
import styles from "./Login.module.scss";

//Database
import { db } from "../../firebase";

const cx = cn.bind(styles);

function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [accessRegister, setAccessRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");

  const dispatch = useDispatch();

  const onLogin = () => {
    setIsOpen(true);
  };

  const closeLogin = () => {
    setIsOpen(false);
    setAccessRegister(false);
  };

  const onSwitchForm = () => {
    setIsLogin(!isLogin);
  };

  //Авторизация
  const handlerLogin = async () => {
    const auth = getAuth();
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      setEmail("");
      setPassword("");
      setIsOpen(false);
      const docRef = doc(db, "users", res.user.uid);
      const docSnap = await getDoc(docRef);
      const user = docSnap.data();
      window.localStorage.setItem(
        "user",
        JSON.stringify({ id: res.user.uid, ...user })
      );
      dispatch(
        setUser({
          name: user.name,
          email: user.email,
          phone: user.phone,
          isRole: user.isRole,
          id: res.user.uid,
          token: res.user.accessToken,
        })
      );
    } catch (error) {
      alert("Такого пользователя не существует");
    }
  };

  //Регистрация
  const handlerRegister = async () => {
    const auth = getAuth();
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(db, "users", res.user.uid), {
        name,
        email,
        phone,
        isRole: "user",
        timeStamp: serverTimestamp(),
      });
      setAccessRegister(true);
      setTimeout(() => {
        setAccessRegister(false);
      }, 3000);
      dispatch(
        setUser({
          name,
          email: res.user.email,
          phone,
          isRole: "user",
          id: res.user.uid,
          token: res.user.accessToken,
        })
      );
    } catch (error) {
      alert("Что-то пошло не так, попробуйте");
    }
  };

  return (
    <div>
      <button className={styles.Login} type="button" onClick={onLogin}>
        войти
      </button>
      <button
        className={styles["Login__mobile-button"]}
        type="button"
        onClick={onLogin}
      >
        <img
          className={styles["Login__mobile-icon"]}
          src="./assets/icons/login.png"
          alt="login"
        />
      </button>
      <div
        className={cx(styles["Login__modal-box"], {
          [styles["Login__modal-box_active"]]: isOpen,
        })}
      >
        <div
          className={cx(styles["Login__form-wrapper"], {
            [styles["Login__form-wrapper_active"]]: isOpen,
          })}
        >
          <button
            className={styles["Login__form-close"]}
            type="button"
            onClick={closeLogin}
          >
            <div className={styles["Login__cross"]}>
              <div className={styles["Login__cross-rowTop"]}></div>
              <div className={styles["Login__cross-rowBottom"]}></div>
            </div>
          </button>
          {isLogin ? (
            <form
              className={styles.Login__form}
              onSubmit={(e) => e.preventDefault()}
            >
              <p className={styles["Login__form-title"]}>Авторизация</p>
              <p className={styles["Login__form-label"]}>E-mail</p>
              <input
                className={styles["Login__form-input"]}
                value={email}
                type="email"
                autocomplete="off"
                placeholder="Введите e-mail"
                onChange={(e) => setEmail(e.target.value)}
              />
              <p className={styles["Login__form-label"]}>Пароль</p>
              <input
                className={styles["Login__form-input"]}
                value={password}
                autocomlete="off"
                type="password"
                placeholder="Введите пароль"
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                className={styles["Login__form-button"]}
                onClick={() => handlerLogin(email, password)}
              >
                Войти
              </button>
              <button
                className={styles["Login__form-switch"]}
                type="button"
                onClick={onSwitchForm}
              >
                Зарегистрироваться?
              </button>
            </form>
          ) : (
            <form
              className={styles.Login__form}
              onSubmit={(e) => e.preventDefault()}
            >
              {accessRegister ? (
                <p className={styles["Login__form-access"]}>
                  Регистрация прошла успешно!
                </p>
              ) : (
                <>
                  <p className={styles["Login__form-title"]}>Регистрация</p>
                  <p className={styles["Login__form-label"]}>Имя</p>
                  <input
                    className={styles["Login__form-input"]}
                    type="text"
                    autocomplete="off"
                    placeholder="Введите имя"
                    onChange={(e) => setName(e.target.value)}
                  />
                  <p className={styles["Login__form-label"]}>Телефон</p>
                  <InputMask
                    className={styles["Login__form-input"]}
                    mask="+7\ (999) 999-99-99"
                    type="text"
                    placeholder="Введите телефон"
                    onChange={(e) => setPhone(e.target.value)}
                    maskChar={null}
                  ></InputMask>
                  <p className={styles["Login__form-label"]}>E-mail</p>
                  <input
                    className={styles["Login__form-input"]}
                    autocomplete="off"
                    value={email}
                    type="email"
                    placeholder="Введите e-mail"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <p className={styles["Login__form-label"]}>Пароль</p>
                  <input
                    className={styles["Login__form-input"]}
                    autocomlete="off"
                    value={password}
                    type="password"
                    placeholder="Введите пароль"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    className={styles["Login__form-button"]}
                    onClick={() => handlerRegister(email, password)}
                  >
                    Регистрация
                  </button>
                  <button
                    className={styles["Login__form-switch"]}
                    type="button"
                    onClick={onSwitchForm}
                  >
                    Войти?
                  </button>
                </>
              )}
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default Login;
