import { AccountRequestBody } from '../types';
import { TokenManager } from './Auth/TokenManager';
import { createHttpClient, HttpClient } from './Http/Client';
import { TransactionService } from './TransactionService';

export class AccountService<T extends AccountRequestBody = AccountRequestBody> {
	protected client: HttpClient;
	protected tokenManager: TokenManager;

	constructor() {
		this.tokenManager = new TokenManager();
		this.client = createHttpClient(this.tokenManager);
	}

	public readonly signIn = async (data: Pick<T, 'email' | 'password'>): Promise<void> => {
		const res = await this.client.post('/Users/login', data);
		this.tokenManager.setToken(res.data);

		if (localStorage.getItem('shouldSyncTransactions')) {
			localStorage.removeItem('shouldSyncTransactions');
			await new TransactionService().syncTransactions();
		}
	};

	public readonly signUp = async (data: T): Promise<void> => {
		await this.client.post('/Users/signup', data);
		localStorage.setItem('shouldSyncTransactions', 'true');
	};

	public readonly signOut = async (): Promise<void> => {
		await this.client.post('/Users/logout');

		this.tokenManager.clearToken();
		localStorage.clear();
	};
}
