import styles from './modalManageWallet.module.scss'
import React, {useState} from "react";
import {Button, CircularProgress, MenuItem, Select} from "@mui/material";
import NewInvestment from "@/components/walletActions/modalManageWallet/newInvestment";
import EditWallet from "@/components/walletActions/modalManageWallet/editWallet";
import DeleteWallet from "@/components/walletActions/modalManageWallet/deleteWallet";

interface Wallet {
	id: number;
	name: string;
	amount: number;
	createdAt: Date;
}

const ModalManageWallet = (props: { open: boolean, setOpen: any, user: { access_token: string, user: string }, setRefresh: any, wallets: Wallet[] | null }) => {
	const [selectedWallet, setSelectedWallet] = useState('')
	const [deleteAction, setDelete] = useState(false)
	const [edit, setEdit] = useState(false)
	const [invest, setInvest] = useState(false)
	
	return (
		<div className={styles.modal}>
			<div className={styles.modalContent}>
				<span className={styles.closeBtn} onClick={() => props.setOpen(false)}>&times;</span>
				<h2 style={{color: '#fb6300', textAlign: "center"}}>Gerenciar carteira de investimentos</h2>
				<br/>
				<div className={styles.formContainer}>
					<label className={styles.inputLabel}>SELECIONE A CARTEIRA*</label>
					<Select
						className={styles.textFieldSelect}
						required
						id="outlined-required"
						value={selectedWallet}
						onChange={(e) => setSelectedWallet(e.target.value)}
					>
						{props.wallets && props.wallets.map((wallet) =>
							<MenuItem key={wallet.id} value={wallet.id}>{wallet.name}</MenuItem>,
						)}
					</Select>
					<br/>
					{selectedWallet &&
                      <div className={styles.actionsContainer}>
                        <Button
                          className={styles.btnDelete}
                          disabled={!selectedWallet}
                          onClick={() => {
							  setInvest(false)
							  setDelete(true)
							  setEdit(false)
						  }}>
                          Deletar Carteira
                        </Button>
                        <Button
                          className={styles.btnEdit}
                          disabled={!selectedWallet}
                          onClick={() => {
							  setInvest(false)
							  setDelete(false)
							  setEdit(true)
						  }}>
                          Editar Carteira
                        </Button>
                        <Button
                          className={styles.btnInvest}
                          disabled={!selectedWallet}
                          onClick={() => {
							  setInvest(true)
							  setDelete(false)
							  setEdit(false)
						  }}>
                          Novo Investimento
                        </Button>
                      </div>
					}
					<br/>
					{!edit && !invest && deleteAction &&
                      <DeleteWallet selectedWallet={selectedWallet} user={props.user} setOpen={props.setOpen} setRefresh={props.setRefresh}/>
					}
					{edit && !invest && !deleteAction &&
                      <EditWallet selectedWallet={selectedWallet} user={props.user} setOpen={props.setOpen} setRefresh={props.setRefresh}/>
					}
					{!edit && invest && !deleteAction &&
                      <NewInvestment selectedWallet={selectedWallet} user={props.user} setOpen={props.setOpen} setRefresh={props.setRefresh}/>
					}
					<br/>
				</div>
			</div>
		</div>
	)
}

export default ModalManageWallet
