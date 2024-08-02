"use client"

import styles from './page.module.css'
import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import CardTotalInvested from "@/components/cardTotalInvested/cardTotalInvested";
import WalletActions from "@/components/walletActions/walletActions";
import WalletTable from "@/components/walletTable/walletTable";
import {CircularProgress} from "@mui/material";
import {api} from "@/services/api";

interface User {
	access_token: string;
	user: string;
}

interface Wallet {
	id: number;
	name: string;
	amount: number;
	createdAt: Date;
}

const Page = () => {
	const [user, setUser] = useState<null | User>(typeof window !== 'undefined' ? JSON.parse(sessionStorage.getItem('user') as string) : null)
	const router = useRouter()
	const [wallets, setWallets] = useState<null | Wallet[]>(null)
	const [amountSpent, setAmountSpent] = useState<number>(0)
	const [loading, setLoading] = useState<boolean>(true)
	const [refresh, setRefresh] = useState<boolean>(true)
	
	const getWallets = async (email: string, token: string) => {
		setRefresh(true)
		await api.get('/wallet/' + email, { headers : { Authorization: 'bearer ' + token}}).then((response) => {
			setWallets(response.data)
			const totalSpent = response.data.reduce((total : number, wallet : Wallet) => total + wallet.amount, 0);
			setAmountSpent(totalSpent)
			setLoading(false)
		})
	}
	useEffect(() => {
		if(user) getWallets(user.user, user.access_token)
	}, [refresh]);
	
	if (!user) {
		setTimeout(() => { router.push('/login') }, 1000)
		return (
			<div className={styles.container}>
				<CircularProgress color="warning" style={{alignSelf: 'center'}}/>
			</div>
		)
	} else {
		return (
			<div className={styles.container}>
				{loading ?
					<CircularProgress color="warning" style={{alignSelf: 'center'}}/>
					:
					<div className={styles.cardContainer}>
						<h2 className={styles.title}>Olá, {user.user} 👋</h2>
						<br/>
						<CardTotalInvested totalInvested={amountSpent}/>
						<br/>
						<WalletActions user={user} wallets={wallets} setRefresh={setRefresh}/>
						<br/>
						{wallets && <WalletTable wallets={wallets} user={user}/>}
						<br/>
						<br/>
					</div>
				}
			</div>
		)
	}
}

export default Page
