import { AuthToken } from '../types';
import { AuthorizationService } from './AuthorizationService';
import http from './http-common';
import { LocalStorageService } from './LocalStorageService';

export class HttpService extends LocalStorageService<AuthToken> {
	protected key = '';
	public httpCommon = http;
	protected getconfig = (): any => {
		const service = new AuthorizationService();
		return {
			headers: {
				Authorization: `Bearer ${service.getToken()}`,
				'Content-type': 'application/json',
			},
		};
	};

	public readonly post = (url: string, model: any): any => {
		return http.post<any>(url, model, this.getconfig());
	};

	public readonly put = (url: string, model: any): any => {
		return http.put<any>(url, model, this.getconfig());
	};

	public readonly delete = (url: string): any => {
		return http.delete<any>(url, this.getconfig());
	};

	public readonly get = (url: string): any => {
		return http.get(url, this.getconfig());
	};
}
