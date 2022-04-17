import { AccountRequestBody } from '../types';
import { TokenManager } from './Auth/TokenManager';
import { createHttpClient, HttpClient } from './Http/Client';

export class AccountService<T extends AccountRequestBody = AccountRequestBody> {
	protected client: HttpClient;
	protected tokenManager: TokenManager;

	constructor() {
		this.tokenManager = new TokenManager();
		this.client = createHttpClient(this.tokenManager);
	}

	public readonly signIn = async (data: Pick<T, 'email' | 'password'>): Promise<any> => {
		const res = await this.client.post('/Users/login', data);
		this.tokenManager.setToken(res.data);
	};

	public readonly signUp = async (data: T): Promise<any> => {
		await this.client.post('/Users/signup', data);
	};

	public readonly signOut = async (): Promise<any> => {
		await this.client.post('/Users/logout');
		this.tokenManager.clearToken();

		// localStorage.clear(); // should we clear localStorage?
	};
}
