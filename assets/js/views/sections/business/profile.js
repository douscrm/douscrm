import React, {Component} from "react";
import {Link, Redirect} from 'react-router-dom';
import {BoxCard,BoxCardHeader,BoxCardBody,BoxCardFooter} from '../../components/boxcard';
import axios from 'axios';
import globals from '../../../globals';



class BusinessProfile extends Component {
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

		axios.get(`${globals.api}/business/${id}`).then((response) => {
			self.model = response.data;
			self.setState({ modelLoad: true });
		}).catch((error) => {
			console.log(error)
		});
	}



	deleteItem() {
		const self = this;
		const id = self.props.match.params.id;

		axios.delete(`${globals.api}/business/${id}`).then((response) => {
			self.setState({ modelDelete: true });
		}).catch((error) => {
			console.log(error)
		});
	}

	

	render() {
		if(this.state.modelDelete) {
			return (<Redirect to="/business"/>);
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
								<Link to="/business">Business</Link>
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
						<BoxCardBody></BoxCardBody>
						<BoxCardFooter>
							<Link className="btn btn-primary float-left" to={`/business/${this.model.id}/update`}>Edit business</Link>
							<button className="btn btn-danger float-right" onClick={this.deleteItem}>Delete</button>
						</BoxCardFooter>
					</BoxCard>
				</div>
			</div>
		</div>);
	}
}


export default BusinessProfile;