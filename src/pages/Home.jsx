import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { collection, getDocs } from "firebase/firestore";

//Styles
import "../App.css";

//Layouts
import { Header, Footer, Container } from "../components/layouts";
import Main from "../components/layouts/Main";

//Components
import { Cookies, News, MenuSection, MenuItem, ModalItem } from "../components";

//Actions
import { setItems } from "../redux/mainReducer";

//Database
import { db } from "../firebase";

function Home() {
  const [isOpenCookie, setOpenCookie] = useState(false);
  const [isOpenModal, setOpenModal] = useState(false);
  const [isActiveItem, setIsActiveItem] = useState(null);
  const menu = useSelector((state) => state.main.menuList);
  const listTitles = useSelector((state) => state.main.listTitles);

  const dispatch = useDispatch();

  const onCookies = useCallback(() => {
    setOpenCookie(false);
  }, []);

  const onMenuItem = useCallback((item) => {
    setIsActiveItem(item);
    setOpenModal(true);
  }, []);

  const onCloseModal = useCallback(() => {
    setOpenModal(false);
    setIsActiveItem(null);
  }, []);

  //Получение каталога меню
  const getItems = async () => {
    const querySnapshot = await getDocs(collection(db, "products"));
    const items = [];
    querySnapshot.forEach((doc) => {
      items.push({ uid: doc.id, ...doc.data() });
    });
    dispatch(setItems(items));
  };

  useEffect(() => {
    getItems();

    if (isOpenCookie === false) {
      setTimeout(() => {
        setOpenCookie(true);
      }, 5000);
    }
  }, []);

  return (
    <Main>
      <ModalItem
        isOpenModal={isOpenModal}
        onCloseModal={onCloseModal}
        itemId={isActiveItem}
      />
      <News />
      {listTitles.map((title) => (
        <MenuSection title={title} key={title}>
          {menu
            .filter((item) => item.category === title)
            .map((item, index) => (
              <MenuItem item={item} onMenuItem={onMenuItem} key={item.id} />
            ))}
        </MenuSection>
      ))}
      {/* <Cookies isOpen={isOpenCookie} onCookies={onCookies} /> */}
    </Main>
  );
}

export default Home;
