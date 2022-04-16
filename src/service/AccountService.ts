import { Account } from '../types';
import { TokenManager } from './Auth/TokenManager';
import { createHttpClient, HttpClient } from './Http/Client';
import { ModelRepository } from './Repository/ModelRepository';

export class AccountService<T extends Account = Account> {
	protected key = 'user';
	protected client: HttpClient;

	protected repository: ModelRepository<T>;
	protected tokenManager: TokenManager;

	constructor() {
		this.repository = new ModelRepository<T>(this.key);
		this.tokenManager = new TokenManager();
		this.client = createHttpClient(this.tokenManager);
	}

	public readonly signIn = (model: T): void => {
		this.client.post('/Users/login', model).then(res => {
			this.tokenManager.setToken(res.data);
			console.log('login successful', 'token received');
		});
	};

	public readonly signUp = (model: T): void => {
		this.client.post('/Users/signup', model).then(res => console.log('account created', res));
	};
}
