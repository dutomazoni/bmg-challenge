import Header from "@/components/header/header";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './globals.css'
export default function RootLayout({children,}: { children: React.ReactNode }) {
	
	return (
		<html lang="en">
		<head>
			<meta charSet="UTF-8"/>
			<link rel="icon" type="image/svg+xml" href="/logo.svg"/>
			<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
			<title>InvestingPig</title>
		</head>
		<body>
		<Header/>
		<ToastContainer/>
		{children}
		</body>
		</html>
	)
}
