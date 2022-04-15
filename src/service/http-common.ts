import axios from 'axios';

export default axios.create({
	baseURL: 'https://finerd-api.tchapssolution.com/api',
	headers: {
		'Content-type': 'application/json',
	},
});
