import styles from './walletActions.module.scss'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import SettingsIcon from '@mui/icons-material/Settings';
import {useState} from "react";
import ModalAddWallet from "@/components/walletActions/modalAddWallet/modalAddWallet";
import ModalManageWallet from "@/components/walletActions/modalManageWallet/modalManageWallet";

interface Wallet {
	id: number;
	name: string;
	amount: number;
	createdAt: Date;
}

const WalletActions = (props: {user: { access_token: string, user: string}, setRefresh: any, wallets: Wallet[] | null }) => {
	console.log(props.wallets)
	const [modalAddWallet, setModalAddWallet] = useState(false);
	const [modalEditWallet, setModalEditWallet] = useState(false);
	return (
		<div className={styles.container}>
			{modalAddWallet && <ModalAddWallet open={modalAddWallet} setOpen={setModalAddWallet} user={props.user} setRefresh={props.setRefresh}/>}
			{modalEditWallet && <ModalManageWallet open={modalEditWallet} setOpen={setModalEditWallet} user={props.user} setRefresh={props.setRefresh} wallets={props.wallets}/>}
			<div className={styles.cardContainer}>
				<div className={styles.card}>
					<div className={styles.button} onClick={() => setModalAddWallet(true)}>
						<AddCircleOutlineIcon className={styles.buttonIcon}/>
						<br/>
						<p className={styles.buttonText}>Adicionar Carteira</p>
					</div>
					<div className={styles.button} onClick={() => setModalEditWallet(true)}>
						<SettingsIcon className={styles.buttonIcon}/>
						<br/>
						<p className={styles.buttonText}>Gerenciar Carteiras</p>
					</div>
				</div>
			</div>
		</div>
	)
}

export default WalletActions;
