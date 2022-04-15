import axios from 'axios';

import { AuthorizationService } from './AuthorizationService';
import http from './http-common';
import { LocalStorageService } from './LocalStorageService';

export class HttpService<T> extends LocalStorageService<T> {
	private getconfig = (): any => {
		const service = new AuthorizationService();
		return {
			headers: {
				'Content-type': 'application/json',
				Authorization: `Bearer ${service.getToken()}`,
			},
		};
	};

	public readonly post = (url: string, model: T): any => {
		return http.post<any>(url, model, this.getconfig());
	};

	public readonly put = (url: string, model: T): any => {
		return http.put<any>(url, model, this.getconfig());
	};

	public readonly delete = (url: string, model: T): any => {
		return http.delete<any>(url, this.getconfig());
	};

	public readonly getOne = (url: string): T => {
		return http.get(url, this.getconfig());
	};

	public readonly get = (url: string): T[] => {
		return http.get<T[]>(url, this.getconfig());
	};
}
