import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import {Router, Route, Switch} from 'react-router-dom';
import {createBrowserHistory} from 'history';
import axios from 'axios';



import store from './store';
import globals from './globals';

import Login from './views/pages/login'
import Admin from './views/pages/admin'



class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			appIsLoaded: false
		}
	}


	componentDidMount() {
		//axios.get('/user?ID=12345');
		var self = this;

		setTimeout(() => {
			store.dispatch({
				type: 'login',
				bool: true
			});
			self.setState({
				appIsLoaded: true
			});
		}, 1000);
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
		


		if(!store.getState().isLogged) {
			return (<Login/>);
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