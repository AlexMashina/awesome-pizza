import React from "react";

import classNames from "classnames/bind";

// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Mousewheel } from "swiper";

// Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";

// Styles
import styles from "./Slider.module.scss";

const cx = classNames.bind(styles);

function Slider() {
  return (
    <Swiper
      spaceBetween={0}
      slidesPerView={1}
      navigation={true}
      mousewheel={true}
      loop={true}
      speed={1000}
      autoplay={{
        delay: 4000,
      }}
      modules={[Autoplay, Navigation, Mousewheel]}
    >
      <SwiperSlide>
        <div className={cx("Slider__slide", "Slider-pizza")}>
          <div className={styles["Slider__slide-content"]}>
            <h1 className={styles["Slider__slide-title"]}>Новая пицца</h1>
            <p className={styles["Slider__slide-text"]}>
              В ассортименте появилась новая пицца Венеция. Идеальное сочетание
              трех сыров, трех видов грибов, трех солями. И подчеркивает
              прекрасный вкус новый соус, специально разработанный под Венецию.
              Попробуйте
            </p>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className={cx("Slider__slide", "Slider-limonades")}>
          <div className={styles["Slider__slide-content"]}>
            <h1 className={styles["Slider__slide-title"]}>
              Новая линейка лимонадов
            </h1>
            <p className={styles["Slider__slide-text"]}>
              Уже совсем скоро у нас появятся новые лимонады. Напиток, который
              заставляет вас всегда вспоминать теплое лето. Прекрасное
              дополнение к десертам
            </p>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className={cx("Slider__slide", "Slider-skidka")}>
          <div className={styles["Slider__slide-content"]}>
            <h1 className={styles["Slider__slide-title"]}>Скидки</h1>
            <p className={styles["Slider__slide-text"]}>
              Мы часто проводим конкурсы на бесплатную доставку и персональное
              предложение. Следите за нами в социальных сетях. В праздничные дни
              скидки до 40%
            </p>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className={cx("Slider__slide", "Slider-work")}>
          <div className={styles["Slider__slide-content"]}>
            <h1 className={styles["Slider__slide-title"]}>Работа у нас</h1>
            <p className={styles["Slider__slide-text"]}>
              Если вы хотетите присоединиться к нашей команде, то смотрите
              актуальную информацию по нашим вакансиям у нас в социальных сетях
            </p>
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
  );
}

export default Slider;
