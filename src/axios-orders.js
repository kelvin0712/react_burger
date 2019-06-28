import axios from 'axios';

const instance = axios.create ({
	baseURL: 'https://react-burger-95c47.firebaseio.com/'
});

export default instance;

