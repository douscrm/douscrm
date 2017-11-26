import React, {Component} from "react";
import {Redirect} from 'react-router-dom';
import axios from 'axios';
import globals from '../../globals';



class Login extends Component {
	constructor(props) {
		super(props);

		this.state = {
			email: '',
			password: ''
		}

		this.onSubmit = this.onSubmit.bind(this);
	}


	onSubmit(e) {
		const self = this;
		e.preventDefault();

		axios.post(`${globals.api}/users/login`, {
			email: this.state.email,
			password: this.state.password
		}).then((response) => {
			if(response.data.id) {
				axios.defaults.headers.common['Authorization'] = response.data.id;
				sessionStorage.setItem('token', response.data.id);
				sessionStorage.setItem('uid', response.data.userId);
				self.props.loggedIn();
			} else {
				//console.log(response)
			}
			
		});

		this.setState({ isLogged: true })
	}


	render() {
		const smallUser = (globals.configuration.data.env != 'production') ? (<small>By default use "admin@douscrm.com"</small>) : '';
		const smallPassword = (globals.configuration.data.env != 'production') ? (<small>By default use "admin"</small>) : '';

		return (<div className="container">
			<div className="row">
				<div className="col-12">
					<h1>Login</h1>
					<form onSubmit={this.onSubmit}>
						<label htmlFor="dous-email">Email</label>
						<input type="email" className="form-control" id="dous-email" placeholder="Email" required value={this.state.email} onChange={(event) => { this.setState({email: event.target.value}); }} />
						{smallUser}<br/>
						<label htmlFor="dous-password">Password</label>
						<input type="password" className="form-control" id="dous-password" placeholder="Password" value={this.state.password} required onChange={(event) => { this.setState({password: event.target.value}); }}/>
						{smallPassword}<br/>
						
						<button type="submit" className="btn btn-primary">Login</button>
					</form>
				</div>
			</div>
		</div>);
	}
}

export default Login;