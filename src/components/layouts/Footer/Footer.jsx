import React from 'react'

//Styles
import styles from "./Footer.module.scss";

function Footer() {
	return (
		<div className={styles.Footer}>
			<div className={styles.Footer__wrapper}>
				<div className={styles.Footer__header}>
					<h3 className={styles['Footer__header-title']}>Awesome Pizza</h3>
					<div className={styles['Footer__header-info']}>
						<div className={styles['Footer__block']}>
							<h5 className={styles['Footer__block-title']}>О нас</h5>
							<p className={styles['Footer__block-text']}>Мы&nbsp;команда энтузиастов, которые любят вкусно поесть. Но&nbsp;больше всего мы&nbsp;любим пиццу. Мы&nbsp;были в&nbsp;разных странах и&nbsp;искали самые лучшие рецепты, чтобы наша пицца была неповторимой и&nbsp;разнообразной. Конечно у&nbsp;нас есть и&nbsp;нами придуманные рецепты. Надеемся, что вы&nbsp;останетесь довольны</p>
						</div>
						<div className={styles['Footer__block']}>
							<h5 className={styles['Footer__block-title']}>Тех поддержка</h5>
							<p className={styles['Footer__block-text']}>По&nbsp;всем вопросам можете обращаться в&nbsp;нашу поддержку, звонок бесплатный. Если у&nbsp;вас есть предложения по&nbsp;улучшению сервиса, мы&nbsp;всегда открыты к&nbsp;своим клиентам. Пожалуйста, пишите нам на&nbsp;почту</p>
							<p className={styles['Footer__block-link']}>Наш телефон: <span className={styles['Footer__block-phone']}> +7 961-722-03-03</span></p>
							<p className={styles['Footer__block-link']}>Наша почта: <a className={styles['Footer__block-email']} href="mailto:awesome-pizza@.com">awesome-pizza@.com</a></p>
						</div>
						<div className={styles['Footer__block']}>
							<h5 className={styles['Footer__block-title']}>Соцсети</h5>
							<p className={styles['Footer__block-text']}>У&nbsp;нас часто проводятся конкурсы и&nbsp;розыгрыши, чтобы не&nbsp;пропустить наши события, присоединяйтесь к&nbsp;нам в&nbsp;соцсетях</p>
							<div className={styles['Footer__block-buttons']}>
								<button className={styles['Footer__block-button']}><img className={styles['Footer__block-icon']} src="./assets/icons/vk.png" alt="" /></button>
								<button className={styles['Footer__block-button']}><img className={styles['Footer__block-icon']} src="./assets/icons/twitter.png" alt="" /></button>
								<button className={styles['Footer__block-button']}><img className={styles['Footer__block-icon']} src="./assets/icons/telegram.png" alt="" /></button>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className={styles.Footer__bottom}>
				<p className={styles['Footer__bottom-copyright']}>Awesome Pizza © 2022 | Все права защищены</p>
			</div>
		</div>
	)
}

export default Footer