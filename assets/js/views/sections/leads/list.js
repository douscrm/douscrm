import React, {Component} from "react";
import {Link} from 'react-router-dom';
import Card from '../../components/card';



class LeadList extends Component {
	constructor(props) {
		super(props);
	}

	

	render() {
		return (<div className="container">
			<div className="row">
				<div className="col-12">
					<h1>LeadList</h1>
				</div>
			</div>
			<div className="row">
				<div className="col-12">
					<Card title="prueba">
						<table className="table">
							<thead>
								<tr>
									<th scope="col">Name</th>
									<th scope="col">Phone</th>
									<th scope="col">Email</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td scope="row"><Link to={`/leads/${1}`}>John Doe</Link></td>
									<td>202-555-0180</td>
									<td>john.doe@fake.com</td>
								</tr>
								<tr>
									<td scope="row"><Link to={`/leads/${2}`}>Glen Bishop</Link></td>
									<td>202-555-0162</td>
									<td>glen.bishop@fake.com</td>
								</tr>
								<tr>
									<td scope="row"><Link to={`/leads/${3}`}>Richard McCoy</Link></td>
									<td>202-555-0193</td>
									<td>richard.mccoy@fake.com</td>
								</tr>
							</tbody>
						</table>
					</Card>
				</div>
			</div>
		</div>);
	}
}

export default LeadList;