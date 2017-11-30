import React, {Component} from "react";
import {Redirect} from 'react-router-dom';
import axios from 'axios';
import globals from '../../globals';
import { message, Layout, Spin, Card, Row, Col, Form, Icon, Input, Button } from 'antd';
const FormItem = Form.Item;


class Login extends Component {
	constructor(props) {
		super(props);

		this.state = {
			iconLoading: false,
			loadingScreen: true
		}

		this.onSubmit = this.onSubmit.bind(this);
		this.enterIconLoading = this.enterIconLoading.bind(this);
	}



	componentDidMount() {
		const self = this;

		setTimeout(() => {
			self.setState({ loadingScreen: false });
		}, 750);
	}



	onSubmit(e) {
		const self = this;
		e.preventDefault();
		this.setState({ iconLoading: true });

		setTimeout(() => {
			axios.post(`${globals.api}/users/login`, {
				email: self.state.email,
				password: self.state.password
			}).then((response) => {
				if(response.data.id) {
					axios.defaults.headers.common['Authorization'] = response.data.id;
					sessionStorage.setItem('token', response.data.id);
					sessionStorage.setItem('uid', response.data.userId);
					self.props.loggedIn();
				}
			}).catch(() => {
				message.error('Login error');
				self.setState({ iconLoading: false });
			});
		}, 500);
	}


	enterIconLoading() {
		
	}


	render() {
		let cardContent = '';

		if(this.state.loadingScreen) {
			cardContent = (<Spin tip="Loading..." size="large"></Spin>);
		} else {
			cardContent = (<Form onSubmit={this.onSubmit} className="login-form">
				<FormItem>
					<Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="Username" required value={this.state.email} onChange={(event) => { this.setState({email: event.target.value}); }} />
				</FormItem>
				<FormItem>
					<Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="Password" required onChange={(event) => { this.setState({password: event.target.value}); }} />
				</FormItem>
				<FormItem>
					<Button type="primary" icon="poweroff" loading={this.state.iconLoading} htmlType="submit">Log in</Button>
				</FormItem>
			</Form>);
		}


		return (<Layout style={{height: '100vh'}}>
			<Row type="flex" justify="space-around" align="middle" style={{height: '100vh'}}>
				<Col xs={22} sm={20} md={16} lg={8} xl={8}>
					<Card title="Login" style={{textAlign: 'center'}}>{cardContent}</Card>
				</Col>
			</Row>
		</Layout>);
	}
}

export default Login;