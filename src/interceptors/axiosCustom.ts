import axios, { AxiosError } from 'axios';

axios.defaults.withCredentials = false;

export const axiosCustom = axios.create({ baseURL: "https://api.themoviedb.org/3/" });

axiosCustom.interceptors.request.use((request) => {
	return request;
});

axiosCustom.interceptors.response.use(
	(response) => {
		return response;
	},
	async (e: AxiosError) => {
		
	}
);
