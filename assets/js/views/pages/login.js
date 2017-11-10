import React, {Component} from "react";
import {Redirect} from 'react-router-dom';
import store from './../../store';



class Login extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isLogged: false
		}

		this.onSubmit = this.onSubmit.bind(this);
	}


	onSubmit(e) {
		e.preventDefault();

		console.log('submit')

		store.dispatch({
			type: 'login',
			bool: true
		});

		this.setState({ isLogged: true })
	}


	render() {
		if(this.state.isLogged) {
			return (<Redirect to={{pathname: '/'}}/>);
		}

		

		return (<div className="container">
			<div className="row">
				<div className="col-12">
					<h1>Login</h1>
					<form onSubmit={this.onSubmit}>
						<label htmlFor="dous-email">Email</label>
						<input type="email" className="form-control" id="dous-email" placeholder="Email" required/>
						<label htmlFor="dous-password">Password</label>
						<input type="password" className="form-control" id="dous-password" placeholder="Password" required/>
						
						<button type="submit" className="btn btn-primary">Login</button>
					</form>
				</div>
			</div>
		</div>);
	}
}

export default Login;