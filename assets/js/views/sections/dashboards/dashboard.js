import React, {Component} from "react";
import {Link} from 'react-router-dom';
import Card from '../../components/card';
import axios from 'axios';
import globals from '../../../globals';



class Dashboard extends Component {
	constructor(props) {
		super(props);

		this.state = {
			modelLoad: false,
			refreshId: '0'
		};

		this.models = [];

		this.completeTask = this.completeTask.bind(this);
	}



	componentDidMount() {
		const self = this;
		const id = self.props.match.params.id;

		axios.get(`${globals.api}/tasks`).then((response) => {
			self.models = response.data;
			self.setState({ modelLoad: true });
		}).catch((error) => {
			console.log(error)
		});
	}



	completeTask(model, index) {
		const self = this;

		axios.patch(`${globals.api}/tasks/${model.id}`, { status: 'completed' }).then((response) => {
			if(response.status == 200 && response.data.id) {
				self.models[index].status = 'completed';
				self.setState({refreshId: _.uniqueId('refresh')});
			}
		});
	}

	

	render() {
		const orderedModels = _.sortBy(this.models, [(model)=> {
			const status = (model.status == 'completed') ? '100' : '999';
			const date = (model.endDate) ? model.endDate : 0;

			return `${status}-${date}`;
		}]);

		const lines = [];
		for (let i = orderedModels.length - 1; i >= 0; i--) {
			const model = orderedModels[i];
			const key = _.uniqueId('task-');
			const index = i;
			const icon = (model.status == 'completed') ? 'fa-check-circle-o' : 'fa-circle-o';
			const className = (model.status == 'completed') ? 'table-dark' : '';

			lines.push(<tr key={key} className={className}>
				<td ><Link to={`/tasks/${model.id}`}>{model.name}</Link></td>
				<td >{(model.endDate) ? model.endDate.substr(0,10) : ''}</td>
				<td >
					<button type="button" className="btn btn-primary" onClick={(event) => {this.completeTask(model, index)}}>
						<i className={`fa ${icon}`} />
					</button>
				</td>
			</tr>);
		}


		return (<div className="container">
			<div className="row mt-3">
				<div className="col-12">
					<nav aria-label="breadcrumb" role="navigation">
						<ol className="breadcrumb">
							<li className="breadcrumb-item active">Home</li>
						</ol>
					</nav>
				</div>
			</div>
			<div className="row">
				<div className="col-12">
					<Card title="Task list">
						<table className="table">
							<thead>
								<tr>
									<th scope="col">Task</th>
									<th scope="col">Date</th>
									<th scope="col">Status</th>
								</tr>
							</thead>
							<tbody>{lines}</tbody>
						</table>
						<div className="card-footer text-muted">
							<Link className="btn btn-primary" to={`/tasks/create`}>Add task</Link>
						</div>
					</Card>
				</div>
			</div>
		</div>);
	}
}

export default Dashboard;