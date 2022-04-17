import axios, { AxiosInstance as HttpClient } from 'axios';

import { TokenManager } from '../Auth/TokenManager';

export const createHttpClient = (manager: TokenManager): HttpClient => {
	const client = axios.create({
		baseURL: 'https://finerd-api.tchapssolution.com/api',
		headers: {
			accept: 'application/json',
			'content-type': 'application/json',
		},
	});

	const requestHandler = request => {
		if (!request.headers.authorization) {
			request.headers.authorization = `Bearer ${manager.getAccessToken()}`;
		}

		return request;
	};

	const errorHandler = (error): Promise<unknown> => {
		if (error.status < 400 && error.status > 500) {
			throw new Error('Something went wrong');
		}

		// Errors in the 4xx range should be handled by client - client errors
		return Promise.reject(error);
	};

	client.interceptors.request.use(request => requestHandler(request));
	client.interceptors.response.use(response => response, errorHandler);

	return client;
};

export type { HttpClient };
