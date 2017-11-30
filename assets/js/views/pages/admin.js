import React, {Component} from "react";
import {Redirect, Router, Route, Switch, Link} from 'react-router-dom';
import {isMobile} from 'react-device-detect';
import globals from './../../globals';


import dashboard from './../sections/dashboards/dashboard';
import contacts from './../sections/contacts';
import business from './../sections/business';
import leads from './../sections/leads';
import oportunities from './../sections/oportunities';
import projects from './../sections/projects';
import tasks from './../sections/tasks';
import calendar from './../sections/calendar/calendar';
import reports from './../sections/reports/list';
import milestones from './../sections/milestones';


import { Layout, Menu, Icon, Spin, Alert, Form } from 'antd';
const { Header, Sider, Content } = Layout;



class Admin extends Component {
	constructor(props) {
		super(props);

		this.state = {
			collapsed: false,
			collapsedWidth: (isMobile) ? 0 : 64
		};

		this.menuData = [
			{link: '/', name: 'Home', icon: 'fa-tachometer'},
			{link: '/contacts', name: 'Contacts', icon: 'fa-address-card-o'},
			{link: '/business', name: 'Business', icon: 'fa-university'},
			{link: '/leads', name: 'Leads', icon: 'fa-leaf'},
			{link: '/oportunities', name: 'Oportunities', icon: 'fa-briefcase'},
			{link: '/projects', name: 'Projects', icon: 'fa-cubes'},
			{link: '/tasks', name: 'Tasks', icon: 'fa-tasks'},
			{link: '/calendar', name: 'Calendar', icon: 'fa-calendar'},
			{link: '/reports', name: 'Reports', icon: 'fa-pie-chart'}
		];

		this.toggle = this.toggle.bind(this);
		this.menuClick = this.menuClick.bind(this);
	}


	componentDidMount() {
		this.historyListener = globals.history.listen((location, action) => {
			console.log(`The current URL is ${location.pathname}${location.search}${location.hash}`)
			console.log(`The last navigation action was ${action}`)
		});
	}


	componentWillUnmount() {
		this.historyListener();
	}



	menuClick(options) {
		console.log(options.key)
		console.log(this.menuData[options.key])
		globals.history.push(this.menuData[options.key].link);
	}



	toggle() {
		this.setState({
			collapsed: !this.state.collapsed,
		});
	}



	render() {
		let counter = 0;
		const menuLateral = [];

		this.menuData.forEach((item) => {
			menuLateral.push(<Menu.Item key={counter}>
				<Icon><i className={`fa ${item.icon}`} /></Icon>
				
				<span> {item.name}</span>
			</Menu.Item>);

			counter++;
		});


		return (<Layout style={{height: '100vh'}}>
			<Sider trigger={null} collapsible collapsed={this.state.collapsed} collapsedWidth={this.state.collapsedWidth}>
				<div className="logo" />
				<Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} onClick={this.menuClick}>{menuLateral}</Menu>
			</Sider>
			<Layout>
				<Header style={{ background: '#fff', padding: 0 }}>
					<Icon
						className="trigger"
						type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
						onClick={this.toggle}
					/>
				</Header>
				<Content style={{ margin: '24px 16px', padding: 24, minHeight: 280 }}>
					<Switch>
						<Route path="/contacts/create" component={contacts.create}/>
						<Route path="/contacts/:id/update" component={contacts.update}/>
						<Route path="/contacts/:id" component={contacts.profile}/>
						<Route path="/contacts" component={contacts.list}/>

						<Route path="/business/create" component={business.create}/>
						<Route path="/business/:id/update" component={business.update}/>
						<Route path="/business/:id" component={business.profile}/>
						<Route path="/business" component={business.list}/>

						<Route path="/leads/create" component={leads.create}/>
						<Route path="/leads/:id/update" component={leads.update}/>
						<Route path="/leads/:id" component={leads.profile}/>
						<Route path="/leads" component={leads.list}/>

						<Route path="/oportunities/create" component={oportunities.create}/>
						<Route path="/oportunities/:id/update" component={oportunities.update}/>
						<Route path="/oportunities/:id" component={oportunities.profile}/>
						<Route path="/oportunities" component={oportunities.list}/>

						<Route path="/projects/create" component={projects.create}/>
						<Route path="/projects/:id/update" component={projects.update}/>
						<Route path="/projects/:id" component={projects.profile}/>
						<Route path="/projects" component={projects.list}/>

						<Route path="/milestones/create" component={milestones.create}/>
						<Route path="/milestones/:id/update" component={milestones.update}/>
						<Route path="/milestones/:id" component={milestones.profile}/>
						<Route path="/milestones" component={milestones.list}/>

						<Route path="/tasks/create" component={tasks.create}/>
						<Route path="/tasks/:id/update" component={tasks.update}/>
						<Route path="/tasks/:id" component={tasks.profile}/>
						<Route path="/tasks" component={tasks.list}/>
						
						<Route path="/calendar" component={calendar}/>
						<Route path="/reports" component={reports}/>
						<Route path="/*" component={dashboard}/>
					</Switch>
				</Content>
			</Layout>
		</Layout>);
	}
}

export default Admin;