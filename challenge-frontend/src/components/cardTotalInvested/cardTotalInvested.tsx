import styles from "./cardTotalInvested.module.scss"

const CardTotalInvested = (props: { totalInvested: number }) => {
	
	return (
		<div className={styles.container}>
			<div className={styles.cardContainer}>
				<div className={styles.card}>
					<div className={styles.cardLeft}>
						<p className={styles.title}>Total Investido</p>
						<p className={styles.amount}>{new Intl.NumberFormat('pt-BR', {style: 'currency', currency: "BRL"}).format(props.totalInvested)}</p>
					</div>
					<div className={styles.cardRight}/>
				</div>
			</div>
		
		</div>
	
	)
}

export default CardTotalInvested
