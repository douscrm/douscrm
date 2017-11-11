import React, {Component} from "react";
import {Link} from 'react-router-dom';
import Card from '../../components/card';



class BusinessList extends Component {
	constructor(props) {
		super(props);
	}

	

	render() {
		return (<div className="container">
			<div className="row">
				<div className="col-12">
					<h1>BusinessList</h1>
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
									<td scope="row"><Link to={`/business/${1}`}>Factory 1</Link></td>
									<td>202-555-0180</td>
									<td>info@factory1.com</td>
								</tr>
								<tr>
									<td scope="row"><Link to={`/business/${2}`}>Business 2</Link></td>
									<td>202-555-0162</td>
									<td>info@business2.com</td>
								</tr>
								<tr>
									<td scope="row"><Link to={`/business/${3}`}>Enterprise 3</Link></td>
									<td>202-555-0193</td>
									<td>info@enterprise3.com</td>
								</tr>
							</tbody>
						</table>
					</Card>
				</div>
			</div>
		</div>);
	}
}

export default BusinessList;