import styles from './modalAddWallet.module.scss'
import TextField from "@mui/material/TextField";
import {useState} from "react";
import {Button, CircularProgress} from "@mui/material";
import {api} from "@/services/api";
import {toast} from "react-toastify";

const ModalAddWallet = (props: { open: boolean, setOpen: any, user: { access_token: string, user: string}, setRefresh: any}) => {
	const [name, setName] = useState('')
	const [loading, setLoading] = useState(false)
	
	const createWallet = async () => {
		setLoading(true)
		await api.post("/wallet", {name: name, user: props.user.user} ,{ headers: { Authorization: 'bearer ' + props.user.access_token}})
			.then((response) => {
				toast.success(`Carteira criada com sucesso!`, {
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
		<div className={styles.modal}>
			<div className={styles.modalContent}>
				<span className={styles.closeBtn} onClick={() => props.setOpen(false)}>&times;</span>
				<h2 style={{ color: '#fb6300', textAlign: "center" }}>Criar nova carteira de investimentos</h2>
				<div className={styles.formContainer}>
					<label className={styles.inputLabel}>NOME*</label>
					<TextField
						InputProps={{
							className: styles.textField,
						}}
						required
						id="outlined-required"
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
					<br/>
					{loading ? <CircularProgress color="warning" style={{alignSelf: 'center'}}/> : <Button
						className={styles.btn}
						disabled={!name}
						onClick={() => createWallet()}>
						Criar
					</Button>}
					<br/>
				</div>
			</div>
		</div>
	)
}

export default ModalAddWallet
