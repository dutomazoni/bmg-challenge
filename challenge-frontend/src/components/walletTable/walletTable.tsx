import styles from './walletTable.module.scss'
import {useEffect, useState} from "react";
import {set} from "immutable";
import ModalViewWallet from "@/components/walletTable/modalViewWallet/modalViewWallet";

interface Wallet {
	id: number;
	name: string;
	amount: number;
	createdAt: Date;
}

const WalletTable = (props: { wallets: Wallet[], user: { access_token: string, user: string }}) => {
	const [modalViewWallet, setModalViewWallet] = useState(false);
	const [wallet, setWallet] = useState<Wallet>();
	const [currentPage, setCurrentPage] = useState(1);
	const rowsPerPage = 5;
	const start = (currentPage - 1) * rowsPerPage;
	const end = start + rowsPerPage;
	const totalPages = Math.ceil(props.wallets.length / rowsPerPage);
	const paginatedData = props.wallets.slice(start, end);
	
	const handlePageChange = (page: number) => {
		setCurrentPage(page);
	};
	
	const handleModalViewWallet = (wallet: Wallet) => {
		setModalViewWallet(true);
		setWallet(wallet)
	}
	
	return (
		<div className={styles.container}>
			{wallet && modalViewWallet && <ModalViewWallet  open={modalViewWallet} setOpen={setModalViewWallet} wallet={wallet} user={props.user}/>}
			<div className={styles.card}>
				<h2>Carteiras</h2>
				<div className={styles.tableContainer}>
					<table>
						<thead>
						<tr>
							<th>Nome</th>
							<th>Valor Investido</th>
							<th>Data de Criação</th>
							<th></th>
						</tr>
						</thead>
						<tbody>
						{paginatedData.map((wallet: Wallet, index: number) =>
							<tr key={index}>
								<td>
									{wallet.name}
								</td>
								<td>
									{new Intl.NumberFormat('pt-BR', {style: 'currency', currency: "BRL"}).format(wallet.amount)}
								</td>
								<td>
									{new Date(wallet.createdAt).toLocaleDateString()}
								</td>
								<td className={styles.actionColumn} onClick={() => handleModalViewWallet(wallet)}>
									Ver Carteira
								</td>
							</tr>
						)}
						
						</tbody>
					</table>
					<br/>
					<div className={styles.paginationControls}>
						{Array.from({length: totalPages}, (_, index) => (
							<button
								key={index + 1}
								className={styles.paginationButton}
								onClick={() => handlePageChange(index + 1)}
							>
								{index + 1}
							</button>
						))}
					</div>
					<br/>
				</div>
			</div>
		</div>
	)
}

export default WalletTable;
