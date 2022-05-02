import React from 'react'

//Styles
import styles from "./Header.module.scss";

//Components
import { Logo, Menu } from "../../";

function Header() {
	return (
		<div className={styles.Header}>
			<div className={styles.Header__wrapper}>
				<Logo />
				<Menu />
			</div>
		</div>
	)
}

export default Header