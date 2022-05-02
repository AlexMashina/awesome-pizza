import React from 'react'

//styles
import styles from "./Container.module.scss";

function Container({children}) {
	return (
		<div className={styles.Container}>{children}</div>
	)
}

export default Container