import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import {Router, Route, Switch} from 'react-router-dom';
import {createBrowserHistory} from 'history';
import axios from 'axios';
//import { config } from 'react-loopback';


import globals from './globals';
import Login from './views/pages/login'
import Admin from './views/pages/admin'


import { Layout, Menu, Icon, Spin, Alert, Form } from 'antd';
const { Header, Sider, Content } = Layout;



//config.set('baseUrl', '/api/');



class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			appIsLoaded: false,
			loadingScreen: true,
			isLogged: false,
			collapsed: false
		}

		this.loggedIn = this.loggedIn.bind(this);
	}


	componentDidMount() {
		var self = this;

		setTimeout(() => {
			self.setState({ loadingScreen: false });
		}, 750);

		const token = sessionStorage.getItem('token');
		const uid = sessionStorage.getItem('uid');
		axios.defaults.headers.common['Authorization'] = `${token}`;
		
		axios.get(`${globals.api}/users/logged`).then((response) => {
			globals.configuration.setData('env', response.data.env);

			if(response.data.status) {
				self.setState({
					appIsLoaded: true,
					isLogged: true
				});
			} else {
				self.setState({
					appIsLoaded: true,
					isLogged: false
				});
			}
		}).catch((error) => {
			self.setState({
				appIsLoaded: true,
				isLogged: false
			});
		});
	}



	loggedIn() {
		this.setState({isLogged: true});
	}



	render() {
		if(!this.state.appIsLoaded || this.state.loadingScreen) {
			return (<Spin tip="Loading..." size="large"><Layout style={{height: '100vh'}}></Layout></Spin>);
		}

		if(!this.state.isLogged) {
			return (<Login loggedIn={this.loggedIn}/>);
		} else {
			return (<Admin/>);
		}
	}
}



ReactDOM.render((
	<Router history={globals.history}>
		<App />
	</Router>
), document.getElementById('root'));