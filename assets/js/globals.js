import {createBrowserHistory} from 'history';


const history = createBrowserHistory();
const configuration = {
	data: {},
	setData: (key, value) => { configuration.data[key] = value; }
};


export default {
	history: history,
	api: '/api',
	configuration: configuration
};