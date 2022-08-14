import React from "react";

// Components
import { Slider } from "../";

//Styles
import styles from "./News.module.scss";

function News() {
  return (
    <div class={styles.News}>
      <Slider />
    </div>
  );
}

export default News;
