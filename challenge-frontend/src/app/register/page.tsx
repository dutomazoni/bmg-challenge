"use client";

import styles from './register.module.scss'
import TextField from '@mui/material/TextField'
import {useEffect, useState} from 'react'
import {api} from '@/services/api'
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'
import {Button, CircularProgress, Divider, InputAdornment} from '@mui/material'
import {useRouter} from "next/navigation";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'

const Register = () => {
	const router = useRouter()
	const [email, setEmail] = useState('')
	const [pwd, setPwd] = useState('')
	const [confirmPwd, setConfirmPwd] = useState('')
	const [loading, setLoading] = useState(false)
	const [disableBtn, setDisableBtn] = useState(false)
	
	const isValidEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
	const validate = async () => {
		
		if (email.match(isValidEmail) && pwd.length > 0 && pwd === confirmPwd) {
			setDisableBtn(false)
		} else {
			setDisableBtn(true)
		}
	}
	
	const btnRegister = async () => {
		setLoading(true)
		await api.post('/user', {email: email, password: pwd}).then(() => {
			toast.success(`Usuário cadastrado com sucesso! 🎉`, {
				icon: false,
				position: 'top-center',
				autoClose: 3000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			})
			setLoading(false)
			router.push('/login')
		}).catch((e) => {
			toast.error(`Email já cadastrado! ❌`, {
				icon: false,
				position: 'top-center',
				autoClose: 3000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			})
			setLoading(false)
			return e
		})
	}
	
	useEffect(() => {
		validate()
	}, [email, pwd, confirmPwd])
	
	return (
		<div className={styles.containerRegister}>
			<div className={styles.cardContainerRegister}>
				<div className={styles.btnGoBackRegister} onClick={() => router.back()}>
					<ArrowBackIosNewIcon/>
				</div>
				<h2 style={{color: '#fb6300', textAlign: "center"}}>Crie sua conta</h2>
				<div className={styles.formContainerRegister} style={{width: "auto"}}>
					<label className={styles.inputLabelRegister}>E-MAIL*</label>
					<TextField
						InputProps={{
							className: styles.textFieldRegister,
						}}
						required
						id="outlined-required"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						error={!email}
						helperText={!email.match(isValidEmail) ? 'Formato inválido' : !email ? 'Campo obrigatório.' : ''}
					/>
					<label className={styles.inputLabelRegister}>SENHA*</label>
					<TextField
						InputProps={{
							className: styles.textFieldRegister,
							endAdornment: <InputAdornment
								aria-label="toggle password visibility"
								style={{alignSelf: "center", display: "flex", justifySelf: "center", color: "#78909C"}}
								position={'end'}>
							</InputAdornment>
						}}
						required
						id="outlined-required"
						type={'password'}
						value={pwd}
						onChange={(e) => setPwd(e.target.value)}
						error={!pwd}
						helperText={!pwd ? 'Campo obrigatório.' : ''}
					/>
					<label className={styles.inputLabelRegister}>CONFIRMAR SENHA*</label>
					<TextField
						InputProps={{
							className: styles.textFieldRegister,
							endAdornment: <InputAdornment
								aria-label="toggle password visibility"
								style={{alignSelf: "center", display: "flex", justifySelf: "center", color: "#78909C"}}
								position={'end'}>
							</InputAdornment>
						}}
						required
						id="outlined-required"
						type={'password'}
						value={confirmPwd}
						onChange={(e) => setConfirmPwd(e.target.value)}
						error={confirmPwd !== pwd}
						helperText={confirmPwd !== pwd ? 'Senhas não coincidem.' : ''}
					/>
					<br/>
					{loading ? <CircularProgress color="warning" style={{alignSelf: 'center'}}/> : <Button
						className={styles.btnRegister}
						disabled={disableBtn}
						onClick={() => btnRegister()}>Efetuar Cadastro</Button>}
					<br/>
					<br/>
				</div>
			</div>
		
		</div>
	)
}

export default Register;
