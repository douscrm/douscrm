import React, {Component} from "react";
import {Redirect, Router, Route, Switch, Link} from 'react-router-dom';
import globals from './../../globals';


import dashboard from './../sections/dashboards/dashboard';
import contacts from './../sections/contacts/list';
import business from './../sections/business/list';
import leads from './../sections/leads/list';
import oportunities from './../sections/oportunities/list';
import projects from './../sections/projects/list';
import tasks from './../sections/tasks/list';
import calendar from './../sections/calendar/calendar';
import reports from './../sections/reports/list';




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
		return (
			<div className="h-100">
				<nav className="navbar navbar-expand-lg navbar-light bg-light">
					<Link to="/" className="navbar-brand">Home</Link>
					<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
						<span className="navbar-toggler-icon"></span>
					</button>
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
						<div className="col-2 bg-dark text-white">
							<ul className="nav flex-column">
								<li className="nav-item">
									<Link to="/" className="nav-link text-white">Home</Link>
								</li>
								<li className="nav-item">
									<Link to="/contacts" className="nav-link text-white">Contacts</Link>
								</li>
								<li className="nav-item">
									<Link to="/business" className="nav-link text-white">Business</Link>
								</li>
								<li className="nav-item">
									<Link to="/leads" className="nav-link text-white">Leads</Link>
								</li>
								<li className="nav-item">
									<Link to="/oportunities" className="nav-link text-white">Oportunities</Link>
								</li>
								<li className="nav-item">
									<Link to="/projects" className="nav-link text-white">Projects</Link>
								</li>
								<li className="nav-item">
									<Link to="/tasks" className="nav-link text-white">Tasks</Link>
								</li>
								<li className="nav-item">
									<Link to="/calendar" className="nav-link text-white">Calendar</Link>
								</li>
								<li className="nav-item">
									<Link to="/reports" className="nav-link text-white">Reports</Link>
								</li>
								{/*<li className="nav-item">
									<Link to="/invoices" className="nav-link text-white">Invoices</Link>
								</li>*/}
							</ul>
						</div>
						<div className="col">
							<Switch>
								<Route path="/contacts" component={contacts}/>
								<Route path="/business" component={business}/>
								<Route path="/leads" component={leads}/>
								<Route path="/oportunities" component={oportunities}/>
								<Route path="/projects" component={projects}/>
								<Route path="/tasks" component={tasks}/>
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