import React, {Component} from "react";
import {Link} from 'react-router-dom';
import Card from '../../components/card';



class OportunityList extends Component {
	constructor(props) {
		super(props);
	}

	

	render() {
		return (<div className="container">
			<div className="row">
				<div className="col-12">
					<h1>OportunityList</h1>
				</div>
			</div>
			<div className="row">
				<div className="col-12">
					<Card title="prueba">
						<table className="table">
							<thead>
								<tr>
									<th scope="col">Name</th>
									<th scope="col">Business</th>
									<th scope="col">Status</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td scope="row"><Link to={`/oportunities/${1}`}>Oportunity 1</Link></td>
									<td scope="row"><Link to={`/business/${1}`}>Factory 1</Link></td>
									<td>Win</td>
								</tr>
								<tr>
									<td scope="row"><Link to={`/oportunities/${2}`}>Oportunity 2</Link></td>
									<td scope="row"><Link to={`/business/${2}`}>Business 2</Link></td>
									<td>Lose</td>
								</tr>
								<tr>
									<td scope="row"><Link to={`/oportunities/${3}`}>Oportunity 3</Link></td>
									<td scope="row"><Link to={`/business/${3}`}>Enterprise 3</Link></td>
									<td>Pending</td>
								</tr>
							</tbody>
						</table>
					</Card>
				</div>
			</div>
		</div>);
	}
}

export default OportunityList;