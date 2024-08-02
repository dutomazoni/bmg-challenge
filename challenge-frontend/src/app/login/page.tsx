"use client";

import styles from './login.module.scss'
import TextField from '@mui/material/TextField'
import { useState } from 'react'
import { api } from '@/services/api'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'
import { Button, CircularProgress, Divider, InputAdornment } from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import {useRouter} from "next/navigation";

const Login = () => {
	
	const router = useRouter()
	const [email, setEmail] = useState('')
	const [pwd, setPwd] = useState('')
	const [modalForgotPwd, setModalForgotPwd] = useState(false)
	const [loading, setLoading] = useState(false)
	const [showPassword, setShowPassword] = useState(false);
	const handleClickShowPassword = () => setShowPassword((show) => !show);
	const btnLogin = async () => {
		setLoading(true)
		
		await api.post('/auth/login', { email: email, password: pwd }).then((response) => {
			sessionStorage.setItem('user', JSON.stringify(response.data))
			window.dispatchEvent(new Event("storage"));
			toast(`Olá, ${response.data.user}! 👋`, {
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
			router.push('/')
		}).catch((e) => {
			toast.error(`Usuário inválido!`, {
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
	
	return (
		<div className={styles.containerLogin}>
			<div className={styles.cardContainerLogin}>
				<br/><br/>
				 <h2 style={{ color: '#fb6300', textAlign: "center" }}>Entre na sua conta</h2>
				<Divider
					style={{ width: '70%', margin: '15px auto 0', borderBottom: '3px solid #fb6300' }}/><br/>
				<br/><br/>
				<div className={styles.formContainerLogin} style={{width: "auto"}}>
					<label className={styles.inputLabelLogin}>E-MAIL*</label>
					<TextField
						InputProps={{
							className: styles.textFieldLogin,
						}}
						required
						id="outlined-required"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
					<label className={styles.inputLabelLogin}>SENHA*</label>
					<TextField
						InputProps={{
							className: styles.textFieldLogin,
							endAdornment: <InputAdornment
								aria-label="toggle password visibility"
								onClick={handleClickShowPassword}
								style={{ alignSelf: "center", display: "flex", justifySelf: "center", color: "#78909C" }}
								position={'end'}>
								{showPassword ? <VisibilityOff/> : <Visibility/>}
							</InputAdornment>
						}}
						required
						id="outlined-required"
						type={showPassword ? 'text' : 'password'}
						value={pwd}
						onChange={(e) => setPwd(e.target.value)}
					/>
					<br/>
					{loading ? <CircularProgress color="warning" style={{ alignSelf: 'center' }}/> : <Button
						className={styles.btnLogin}
						onClick={() => btnLogin()}>Entrar</Button>}
					<br/>
					<div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
						{/*<div className={styles.forgotPwd} onClick={() => setModalForgotPwd(true)}>Esqueceu a senha?</div>*/}
						<div className={styles.forgotPwd} onClick={() => router.push('/register')}>Clique aqui para cadastrar</div>
					</div>
					<br/>
				</div>
			</div>
		</div>
	)
}

export default Login
