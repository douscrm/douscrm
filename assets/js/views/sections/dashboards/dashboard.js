import React, {Component} from "react";
import {Link} from 'react-router-dom';
import Card from '../../components/card';



class Dashboard extends Component {
	constructor(props) {
		super(props);
	}

	

	render() {
		return (<div className="container">
			<div className="row">
				<div className="col-12">
					<h1>Dashboard</h1>
				</div>
			</div>
			<div className="row">
				<div className="col-12">
					<Card title="prueba">
						<table className="table">
							<thead>
								<tr>
									<th scope="col">Task</th>
									<th scope="col">Date</th>
									<th scope="col">Project</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<th scope="row">1</th>
									<td><Link to={`/tasks/${1}`}>Task 1</Link></td>
									<td>2017-11-11</td>
								</tr>
								<tr>
									<th scope="row">2</th>
									<td><Link to={`/tasks/${2}`}>Task 2</Link></td>
									<td>2017-11-12</td>
								</tr>
								<tr>
									<th scope="row">3</th>
									<td><Link to={`/tasks/${3}`}>Task 3</Link></td>
									<td>2017-11-13</td>
								</tr>
							</tbody>
						</table>
					</Card>
				</div>
			</div>
		</div>);
	}
}

export default Dashboard;