import styles from "../../walletTable/walletTable.module.scss"
import {useState} from "react";

interface Investment {
	id: number;
	company: string;
	amount: number;
	createdAt: Date;
}

const InvestmentsTable = (props: { investments: Investment[] }) => {
	
	const [currentPage, setCurrentPage] = useState(1);
	const rowsPerPage = 5;
	const start = (currentPage - 1) * rowsPerPage;
	const end = start + rowsPerPage;
	const totalPages = Math.ceil(props.investments?.length / rowsPerPage);
	const paginatedData = props.investments?.slice(start, end);
	
	const handlePageChange = (page: number) => {
		setCurrentPage(page);
	};
	
	return (
		<div className={styles.container}>
			<div className={styles.card} style={{width: "100%"}}>
				<h2 style={{color: '#fb6300'}}>Investimentos</h2>
				<div className={styles.tableContainer}>
					<table>
						<thead>
						<tr>
							<th>Empresa</th>
							<th>Valor Investido</th>
							<th>Data de Criação</th>
						</tr>
						</thead>
						<tbody>
						{paginatedData?.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).map((investment: Investment, index: number) =>
							<tr key={index}>
								<td>
									{investment.company}
								</td>
								<td>
									{new Intl.NumberFormat('pt-BR', {style: 'currency', currency: "BRL"}).format(investment.amount)}
								</td>
								<td>
									{new Date(investment.createdAt).toLocaleDateString()}
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

export default InvestmentsTable
