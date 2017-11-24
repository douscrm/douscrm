import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import {Router, Route, Switch} from 'react-router-dom';
import {createBrowserHistory} from 'history';
import axios from 'axios';
//import { config } from 'react-loopback';



import store from './store';
import globals from './globals';

import Login from './views/pages/login'
import Admin from './views/pages/admin'



//config.set('baseUrl', '/api/');



class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			appIsLoaded: false,
			isLogged: false
		}

		this.loggedIn = this.loggedIn.bind(this);
	}


	componentDidMount() {
		var self = this;

		const token = sessionStorage.getItem('token');
		const uid = sessionStorage.getItem('uid');
		axios.defaults.headers.common['Authorization'] = `${token}`;

		axios.get(`${globals.api}/users/logged`).then((response) => {
			if(response.data) {
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


	/*render() {
		console.log(store.getState().isLogged)

		if(!store.getState().isLogged) {
			return (<Switch>
				<Route path="/*" component={login}/>
			</Switch>);
		} else {
			return (<Switch>
				<Route path="/" component={dashboard}/>
			</Switch>);
		}
	}*/

	loggedIn() {
		this.setState({isLogged: true});
	}



	render() {
		if(!this.state.appIsLoaded) {
			return (<div className="container-fluid" style={{height: '100vh'}}>
				<div className="row align-items-center" style={{height: '100vh'}}>
					<div className="col text-center">
						<i className='fa fa-circle-o-notch fa-spin fa-5x'></i>
					</div>
				</div>
			</div>)
		}
		


		if(!this.state.isLogged) {
			return (<Login loggedIn={this.loggedIn}/>);
		} else {
			return (<Admin/>);
		}
	}
}



ReactDOM.render((
	<Provider store={store}>
		<Router history={globals.history}>
			<App />
		</Router>
	</Provider>
), document.getElementById('root'));