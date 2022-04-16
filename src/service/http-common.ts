import axios from 'axios';

export default axios.create({
	baseURL: 'http://finerd-api.tchapssolution.com/api',
	headers: {
		'Content-type': 'application/json',
	},
});
