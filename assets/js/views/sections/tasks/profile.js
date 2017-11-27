import React, {Component} from "react";
import {Link, Redirect} from 'react-router-dom';
import {BoxCard,BoxCardHeader,BoxCardBody,BoxCardFooter} from '../../components/boxcard';
import axios from 'axios';
import globals from '../../../globals';



class TaskProfile extends Component {
	constructor(props) {
		super(props);

		this.state = {
			modelLoad: false,
			modelDelete: false
		};

		this.model = {};

		this.deleteItem = this.deleteItem.bind(this);
	}



	componentDidMount() {
		const self = this;
		const id = self.props.match.params.id;

		axios.get(`${globals.api}/tasks/${id}`).then((response) => {
			self.model = response.data;
			self.setState({ modelLoad: true });
		}).catch((error) => {
			console.log(error)
		});
	}



	deleteItem() {
		const self = this;
		const id = self.props.match.params.id;

		axios.delete(`${globals.api}/tasks/${id}`).then((response) => {
			self.setState({ modelDelete: true });
		}).catch((error) => {
			console.log(error)
		});
	}

	

	render() {
		if(this.state.modelDelete) {
			return (<Redirect to="/tasks"/>);
		}


		const lines = [];
		if(this.model.endDate) {
			//TODO use moment
			lines.push(<li class="list-group-item"><strong>End date:</strong> {this.model.endDate.substr(0, 10)}</li>);
		}

		if(this.model.description) {
			//TODO use moment
			lines.push(<li class="list-group-item"><strong>Description:</strong><br/>{this.model.description}</li>);
		}


		return (<div className="container">
			<div className="row mt-3">
				<div className="col-12">
					<nav aria-label="breadcrumb" role="navigation">
						<ol className="breadcrumb">
							<li className="breadcrumb-item">
								<Link to="/">Home</Link>
							</li>
							<li className="breadcrumb-item">
								<Link to="/tasks">Tasks</Link>
							</li>
							<li className="breadcrumb-item active">{this.model.name}</li>
						</ol>
					</nav>
				</div>
			</div>
			<div className="row">
				<div className="col-12">
					<BoxCard>
						<BoxCardHeader>{this.model.name}</BoxCardHeader>
						<ul class="list-group list-group-flush">{lines}</ul>
						<BoxCardFooter>
							<Link className="btn btn-primary float-left" to={`/tasks/${this.model.id}/update`}>Edit task</Link>
							<button className="btn btn-danger float-right" onClick={this.deleteItem}>Delete</button>
						</BoxCardFooter>
					</BoxCard>
				</div>
			</div>
		</div>);
	}
}


export default TaskProfile;