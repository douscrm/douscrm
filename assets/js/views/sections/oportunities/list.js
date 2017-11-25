import React, {Component} from "react";
import {Link} from 'react-router-dom';
import _ from 'lodash';
import Card from '../../components/card';
import axios from 'axios';
import globals from '../../../globals';



class OportunityList extends Component {
	constructor(props) {
		super(props);

		this.state = {
			modelLoad: false
		};

		this.models = [];
	}



	componentDidMount() {
		const self = this;
		const id = self.props.match.params.id;

		axios.get(`${globals.api}/oportunities`).then((response) => {
			self.models = response.data;
			self.setState({ modelLoad: true });
		}).catch((error) => {
			console.log(error)
		});
	}

	

	render() {
		const lines = [];
		for (var i = this.models.length - 1; i >= 0; i--) {
			const model = this.models[i];
			const key = _.uniqueId('task-');

			lines.push(<tr key={key}>
				<td><Link to={`/oportunities/${model.id}`}>{model.name}</Link></td>
				<td></td>
				<td></td>
			</tr>);

			this.models[i]
		}


		return (<div className="container">
			<div className="row mt-3">
				<div className="col-12">
					<nav aria-label="breadcrumb" role="navigation">
						<ol className="breadcrumb">
							<li className="breadcrumb-item">
								<Link to="/">Home</Link>
							</li>
							<li className="breadcrumb-item active">Oportunities</li>
						</ol>
					</nav>
				</div>
			</div>
			<div className="row">
				<div className="col-12">
					<Card title="Oportunity list">
						<table className="table">
							<thead>
								<tr>
									<th scope="col">Name</th>
								</tr>
							</thead>
							<tbody>{lines}</tbody>
						</table>
						<div className="card-footer text-muted">
							<Link className="btn btn-primary" to={`/oportunities/create`}>Add oportunity</Link>
						</div>
					</Card>
				</div>
			</div>
		</div>);
	}
}


export default OportunityList;