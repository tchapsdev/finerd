import { Account } from '../types';
import { HttpService } from './HttpService';

export class AccountService extends HttpService {
	protected key = 'user';

	public readonly login = (model: Account): void => {
		let result = this.post('/Users/login', model);
		result
			.then(res => {
				this.storeObject('auth', res.data);
				console.log('Login successful. Token received');
			})
			.catch(err => {
				console.log(err);
			});
	};

	public readonly signUp = (model: Account): void => {
		let result = this.post('/Users', model);
		result
			.then(res => {
				console.log('Account created. ');
			})
			.catch(err => {
				console.log(err);
			});
	};

	public readonly Get = (): Account => {
		let result = this.get('/Users');
		result
			.then(res => {
				console.log(res);
				return res.data;
			})
			.catch(err => {
				console.log(err);
			});
		return null;
	};
}
