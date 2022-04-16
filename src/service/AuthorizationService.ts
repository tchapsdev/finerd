// https://www.bezkoder.com/react-typescript-api-call/
import { AuthToken } from '../types';
import { LocalStorageService } from './LocalStorageService';

export class AuthorizationService extends LocalStorageService<AuthToken> {
	protected key = 'auth';
	public readonly getToken = (): string => {
		const authModel = this.fetchObject(this.key);
		if (authModel) {
			const token = authModel.accessToken;
			window.access_token = token;
			return token;
		}
		return '';
	};
	public readonly setToken = (data: AuthToken): void => {
		this.storeObject(this.key, data);
	};
}
