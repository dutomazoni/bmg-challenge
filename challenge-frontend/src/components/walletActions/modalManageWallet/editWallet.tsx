import styles from "./modalManageWallet.module.scss"
import React, {useEffect, useState} from "react";
import TextField from "@mui/material/TextField";
import {Button, CircularProgress} from "@mui/material";
import {api} from "@/services/api";
import {toast} from "react-toastify";
import NewInvestment from "@/components/walletActions/modalManageWallet/newInvestment";
import InvestmentsTable from "@/components/walletActions/modalManageWallet/investmentsTable";

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

const EditWallet = (props: { selectedWallet: string, setOpen: any, setRefresh: any, user: { access_token: string, user: string } }) => {
	const [wallet, setWallet] = useState<Wallet>({id: 0, name: '', amount: 0, createdAt: new Date()});
	const [investments, setInvestments] = useState<Investment[]>()
	const [loading, setLoading] = useState(false)
	const [loadingAction, setLoadingAction] = useState(false)
	
	const getWalletInfo = async () => {
		setLoading(true)
		await api.get('/wallet/id/' + props.selectedWallet, {headers: {Authorization: 'bearer ' + props.user.access_token}}).then((response) => {
			setWallet(response.data)
			getWalletInvestments()
		})
	}
	
	const getWalletInvestments = async () => {
		await api.get('/investment/' + props.selectedWallet, {headers: {Authorization: 'bearer ' + props.user.access_token}}).then((response) => {
			setInvestments(response.data)
			setLoading(false)
		})
	}
	
	useEffect(() => {
		getWalletInfo()
	}, [props.selectedWallet])
	
	const updateWallet = async () => {
		setLoadingAction(true)
		await api.patch("/wallet", {name: wallet?.name, id: wallet?.id} ,{ headers: { Authorization: 'bearer ' + props.user.access_token}})
			.then((response) => {
				toast.success(`Carteira editada com sucesso!`, {
					icon: false,
					position: 'top-center',
					autoClose: 3000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					progress: undefined,
					progressClassName: "progress",
				})
				setLoadingAction(false)
				props.setOpen(false)
				props.setRefresh(false)
				
			})
	}
	
	return (
		<div className={styles.actionContainer}>
			{loading ? <CircularProgress color="warning" style={{alignSelf: 'center'}}/> :
				<div className={styles.formContainer}>
					<label className={styles.inputLabel}>NOME*</label>
					<TextField
						InputProps={{
							className: styles.textField,
						}}
						required
						id="outlined-required"
						value={wallet?.name}
						onChange={(e) => setWallet({...wallet, name: e.currentTarget.value})}
					/>
					<br/>
					{investments && <InvestmentsTable investments={investments}/>}
					<br/>
					{loadingAction ? <CircularProgress color="warning" style={{alignSelf: 'center'}}/> : <Button
						className={styles.btn}
						disabled={!wallet?.name}
						onClick={() => updateWallet()}
					>
						Salvar
					</Button>}
					<br/>
				</div>
			}
		
		</div>
	)
}

export default EditWallet;
