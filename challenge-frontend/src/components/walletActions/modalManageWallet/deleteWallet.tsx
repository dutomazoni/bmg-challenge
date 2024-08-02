import styles from "./modalManageWallet.module.scss"
import React, {useState} from "react";
import {api} from "@/services/api";
import {toast} from "react-toastify";
import {Button, CircularProgress} from "@mui/material";

const DeleteWallet = (props: { selectedWallet: string, setOpen: any, setRefresh: any, user: { access_token: string, user: string } }) => {
	const [loading, setLoading] = useState(false)
	
	const deleteWallet = async () => {
		setLoading(true)
		await api.delete('/wallet/' + props.selectedWallet, {headers: {Authorization: 'bearer ' + props.user.access_token}}).then((response) => {
			toast.success(`Carteira deletada com sucesso!`, {
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
			setLoading(false)
			props.setOpen(false)
			props.setRefresh(false)
		})
	}
	
	return (
		<div className={styles.actionContainer}>
			<h3>Essa carteira será deletada, confirme a ação.</h3>
			<br/>
			{loading ? <CircularProgress color="warning" style={{alignSelf: 'center'}}/> :
				<Button
					className={styles.btnDeleteAction}
					onClick={() => deleteWallet()}>
					Confirmar
				</Button>}
			
		</div>
	)
}

export default DeleteWallet
