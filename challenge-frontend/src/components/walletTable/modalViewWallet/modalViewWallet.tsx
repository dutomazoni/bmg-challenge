import styles from "./modalViewWallet.module.scss";
import React, {useEffect, useState} from "react";
import {api} from "@/services/api";
import InvestmentsTable from "@/components/walletActions/modalManageWallet/investmentsTable";
import {CircularProgress} from "@mui/material";

interface Wallet {
	id: number;
	name: string;
	amount: number;
	createdAt: Date;
}

interface Investment {
	id: number;
	company: string;
	amount: number;
	createdAt: Date;
}

const ModalViewWallet = (props: { open: boolean, setOpen: any, wallet: Wallet | null, user: { access_token: string, user: string } }) => {
	const [loading, setLoading] = useState(false)
	const [investments, setInvestments] = useState<Investment[]>()
	
	const getWalletInvestments = async () => {
		setLoading(true)
		await api.get('/investment/' + props.wallet?.id, {headers: {Authorization: 'bearer ' + props.user.access_token}}).then((response) => {
			setInvestments(response.data)
			setLoading(false)
		})
	}
	
	useEffect(() => {
		getWalletInvestments()
	}, []);
	
	return (
		<div className={styles.modal}>
			<div className={styles.modalContent}>
				<span className={styles.closeBtn} onClick={() => props.setOpen(false)}>&times;</span>
				<br/>
				<h2 style={{color: '#fb6300', textAlign: "center"}}>Carteira {props.wallet?.name}</h2>
				<br/>
				<div className={styles.walletInfo}>
					<h3>Valor Investido: {new Intl.NumberFormat('pt-BR', {style: 'currency', currency: "BRL"}).format(props.wallet ? props.wallet.amount : 0)}</h3>
					<h3>Número de Investimentos: {investments?.length}</h3>
				</div>
				<br/>
				{investments && !loading ? <InvestmentsTable investments={investments}/> : <CircularProgress color="warning" style={{margin: '0 50%'}}/> }
			</div>
		</div>
	)
}

export default ModalViewWallet;
