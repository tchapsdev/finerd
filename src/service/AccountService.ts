import { Account } from '../types'; 
import { HttpService } from './httpService';

export class AccountService extends HttpService<Account> {
	protected key = 'user';

	public readonly login = (model: Account): void => {
		let result = this.post("/Users/login", model);
		result.then(res => {
			this.storeObject('auth', res.data);
		})
		.catch(err => {
			console.log(err);
		});		

	} 

}
