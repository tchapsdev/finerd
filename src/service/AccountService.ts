import { Account } from '../types';
import { HttpService } from './httpService';

export class AccountService extends HttpService<Account> {
	protected key = 'user';

	public readonly login = (model: Account): void => {
		let result = this.post('/Users/login', model);
		result
			.then(res => {
				this.storeObject('auth', res.data);
				console.log('Login successful. Token received');
				console.log(res);
			})
			.catch(err => {
				console.log(err);
			});
	};

	public readonly signUp = (model: Account): void => {
		let result = this.post('/Users/signup', model);
		result
			.then(res => {
				console.log('Account created. ');
				console.log(res);
			})
			.catch(err => {
				console.log(err);
			});
	};
}
