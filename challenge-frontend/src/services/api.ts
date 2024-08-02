import axios from "axios";
import {toast} from "react-toastify";

export const api = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_URL,
	// baseURL: 'http://localhost:5001/',
});

// Response Interceptor
api.interceptors.response.use(
	response => {
		return response;
	},
	async error => {
		if (error.response.status === 401) {
			toast.error(`Sessão expirada! Entre novamente.`, {
				icon: false,
				position: 'top-center',
				autoClose: 2000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
			})
			sessionStorage.removeItem('user');
			setTimeout(() => {
				window.location.href = '/login';
			}, 2000)
			
		}
		
		return Promise.reject(error);
	}
);
