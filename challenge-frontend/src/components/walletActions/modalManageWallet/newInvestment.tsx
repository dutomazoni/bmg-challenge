import styles from "./modalManageWallet.module.scss";
import {Button, CircularProgress, MenuItem, Select} from "@mui/material";
import TextField from "@mui/material/TextField";
import React, {useState} from "react";
import {api} from "@/services/api";
import {toast} from "react-toastify";

const NewInvestment = (props: {selectedWallet: string, setOpen: any, setRefresh: any, user: { access_token: string, user: string }}) => {
	const [company, setCompany] = useState('')
	const [amount, setAmount] = useState('')
	const [loading, setLoading] = useState(false)
	const companies = [
		'Empresa A',
		'Empresa B',
		'Empresa C',
		'Empresa D',
		'Empresa E',
	]
	
	const createInvestment = async () => {
		setLoading(true)
		let formattedAmount = parseFloat(amount.replace('.', '').replace(',', '.'))
		await api.post("/investment", {company: company, amount: formattedAmount, wallet: props.selectedWallet}, {headers: {Authorization: 'bearer ' + props.user.access_token}})
			.then((response) => {
				toast.success(`Investimento criado com sucesso!`, {
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
				props.setOpen(false)
				props.setRefresh(false)
				setLoading(false)
			})
	}
	
	return (
		<div className={styles.actionContainer}>
			<label className={styles.inputLabel}>SELECIONE A EMPRESA PARA INVESTIR*</label>
			<Select
				className={styles.textFieldSelect}
				required
				id="outlined-required"
				value={company}
				onChange={(e) => setCompany(e.target.value)}
			>
				{companies.map((company) =>
					<MenuItem key={company} value={company}>{company}</MenuItem>,
				)}
			</Select>
			<label className={styles.inputLabel}>INSIRA O VALOR DO INVESTIMENTO*</label>
			<TextField
				InputProps={{
					className: styles.textField,
					startAdornment: <div style={{marginRight: '5px', color: 'grey'}}>R$ </div>,
				}}
				required
				id="outlined-required"
				value={amount}
				onChange={(e) => setAmount((e.target.value))}
				onBlur={() => {
					if (amount.length > 0) {
						setAmount(new Intl.NumberFormat('pt-BR', {
							maximumFractionDigits: 2,
							minimumFractionDigits: 2,
						}).format(parseFloat(amount.replace('.', '').replace(',', '.'))))
					}
				}}
				onFocus={() => setAmount('')}
			>
				{companies.map((company) =>
					<MenuItem key={company} value={company}>{company}</MenuItem>,
				)}
			</TextField>
			<br/>
			{loading ? <CircularProgress color="warning" style={{alignSelf: 'center'}}/> : <Button
				className={styles.btn}
				disabled={!company || !amount}
				onClick={() => createInvestment()}>
				Criar Investimento
			</Button>}
		</div>
	)
}

export default NewInvestment
