import React, {Component} from "react";
import {Redirect, Router, Route, Switch, Link} from 'react-router-dom';
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



class Admin extends Component {
	constructor(props) {
		super(props);
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


	render() {
		const menuData = [
			{link: '/', name: 'Home'},
			{link: '/contacts', name: 'Contacts'},
			{link: '/business', name: 'Business'},
			{link: '/leads', name: 'Leads'},
			{link: '/oportunities', name: 'Oportunities'},
			{link: '/projects', name: 'Projects'},
			{link: '/tasks', name: 'Tasks'},
			{link: '/calendar', name: 'Calendar'},
			{link: '/reports', name: 'Reports'}
		];
		const menuCollapse = [];
		const menuLateral = [];
		let counter = 0;

		menuData.forEach((item) => {
			menuLateral.push(<li key={`menu-lateral-${counter}`} className="nav-item">
				<Link to={item.link} className="nav-link text-white">{item.name}</Link>
			</li>);

			menuCollapse.push(<li key={`menu-collapse-${counter}`} className="nav-item">
				<Link to={item.link} className="nav-link">{item.name}</Link>
			</li>);

			counter++;
		});


		return (
			<div className="h-100">
				<nav className="navbar navbar-expand-lg navbar-light bg-light">
					<Link to="/" className="navbar-brand">Home</Link>
					<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
						<span className="navbar-toggler-icon"></span>
					</button>
					<div className="collapse navbar-collapse" id="navbarSupportedContent">
						<ul className="navbar-nav mr-auto d-block d-sm-none">{menuCollapse}</ul>
					</div>
					{/*
					<div className="collapse navbar-collapse" id="navbarSupportedContent">
						<ul className="navbar-nav mr-auto">
							<li className="nav-item active">
								<a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
							</li>
							<li className="nav-item">
								<a className="nav-link" href="#">Link</a>
							</li>
							<li className="nav-item dropdown">
								<a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
									Dropdown
								</a>
								<div className="dropdown-menu" aria-labelledby="navbarDropdown">
									<a className="dropdown-item" href="#">Action</a>
									<a className="dropdown-item" href="#">Another action</a>
									<div className="dropdown-divider"></div>
									<a className="dropdown-item" href="#">Something else here</a>
								</div>
							</li>
							<li className="nav-item">
								<a className="nav-link disabled" href="#">Disabled</a>
							</li>
						</ul>
						<form className="form-inline my-2 my-lg-0">
							<input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
							<button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
						</form>
					</div>*/}
				</nav>
				<div className="container-fluid h-100">
					<div className="row h-100">
						<div className="col-2 bg-dark text-white d-none d-sm-block">
							<ul className="nav flex-column">
								{menuLateral}
								{/*<li className="nav-item">
									<Link to="/invoices" className="nav-link text-white">Invoices</Link>
								</li>*/}
							</ul>
						</div>
						<div className="col">
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
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Admin;