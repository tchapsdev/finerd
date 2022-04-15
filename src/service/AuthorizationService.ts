// https://www.bezkoder.com/react-typescript-api-call/
 import AuthToken from '../types';
// import http from './http-common';
import { LocalStorageService } from './LocalStorageService';

export class AuthorizationService extends LocalStorageService<AuthToken> {
	protected key = 'auth';
	public readonly getToken = (): string => {
		const authModel = this.fetchObject(this.key);
		debugger;
		if(authModel) {
			return authModel.accessToken;
		}
		return '';
	};
	public readonly setToken = (data: AuthToken): void => {
		this.storeObject(this.key, data);
	};

}
