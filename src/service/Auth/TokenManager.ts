import { AuthToken } from '../../types';
import { KeyValueRepository } from '../Repository/KeyValueRepository';

export class TokenManager<T extends AuthToken = AuthToken> {
	protected key = 'auth';
	protected repository: KeyValueRepository<T>;

	constructor() {
		this.repository = new KeyValueRepository<T>(this.key);
	}

	public readonly getAccessToken = (): string => {
		const accessToken = this.getToken('accessToken');

		if (accessToken && window) {
			window.access_token = accessToken;
		}

		return accessToken;
	};

	public readonly getRefreshToken = (): string => this.getToken('refreshToken');

	private readonly getToken = (key: 'accessToken' | 'refreshToken'): string => {
		const token = this.repository.find();

		if (!token) {
			return '';
		}

		return token[key];
	};

	public readonly setToken = (token: T): T => this.repository.createOrUpdate(token);

	public readonly clearToken = (): void => this.repository.delete();
}
