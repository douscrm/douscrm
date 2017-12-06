import React, {Component} from "react";
import {Link, Redirect} from 'react-router-dom';
import axios from 'axios';
import _ from 'lodash';
import moment from 'moment';
import globals from '../../../globals';
import { Breadcrumb, Layout, Row, Col, Card, Button, Icon, Input, Form, DatePicker } from 'antd';



class TaskUpdate extends Component {
	constructor(props) {
		super(props);

		this.state = {
			id: null,
			refreshId: '0'
		};

		this.model = {};

		this.onSubmit = this.onSubmit.bind(this);
		this.changeInputValue = this.changeInputValue.bind(this);
		this.changeDateValue = this.changeDateValue.bind(this);
	}



	componentDidMount() {
		const self = this;
		const id = self.props.match.params.id;

		axios.get(`${globals.api}/tasks/${id}`, {
			name: this.name
		}).then((response) => {
			self.model = response.data;
			self.setState({ id: id });
		}).catch((error) => {
			console.log(error)
		});
	}



	onSubmit(e) {
		const self = this;
		e.preventDefault();

		axios.patch(`${globals.api}/tasks/${self.model.id}`, self.model).then((response) => {
			if(response.status == 200 && response.data.id) {
				globals.history.push(`/tasks/${response.data.id}`);
			}
		});
	}

	

	changeInputValue(field, value) {
		this.model[field] = value;
		this.setState({refreshId: _.uniqueId('refresh')});
	}



	changeDateValue(field, date) {
		this.model[field] = date;
		this.setState({refreshId: _.uniqueId('refresh')});
	}

	

	render() {
		const formItemLayout = {
			labelCol: {
				xs: { span: 24 },
				sm: { span: 4 },
			},
			wrapperCol: {
				xs: { span: 24 },
				sm: { span: 20 },
			}
		};

		const endDate = (this.model.endDate) ? moment(this.model.endDate) : undefined;

		return (<Layout>
			<Row>
				<Col xs={12} sm={12} md={12} lg={12} xl={12}>
					<Breadcrumb className="dous-breadcrumb">
						<Breadcrumb.Item><Link to="/">Home</Link></Breadcrumb.Item>
						<Breadcrumb.Item><Link to="/tasks">Tasks</Link></Breadcrumb.Item>
						<Breadcrumb.Item>Add new task</Breadcrumb.Item>
					</Breadcrumb>
				</Col>
			</Row>
			<Row gutter={8}>
				<Col xs={24} sm={24} md={24} lg={24} xl={24}>
					<Card title="Add new task" style={{textAlign: 'center'}}>
						<Form layout="horizontal" onSubmit={this.onSubmit}>
							<Form.Item label="Name" {...formItemLayout}>
								<Input placeholder="Task name" required value={this.model.name} onChange={(event) => { this.changeInputValue('name', event.target.value); }} />
							</Form.Item>
							<Form.Item label="Due Date" {...formItemLayout} style={{textAlign: 'left'}}>
								<DatePicker value={endDate} onChange={(date, datestring) => { this.changeDateValue('endDate', date); }} />
							</Form.Item>
							<Form.Item label="Description" {...formItemLayout}>
								<Input.TextArea placeholder="Task description" autosize value={this.model.description} onChange={(event) => { this.changeInputValue('description', event.target.value); }} />
							</Form.Item>
							<Form.Item>
								<Button type="primary" htmlType="submit">Add Task</Button>
							</Form.Item>
						</Form>
					</Card>
				</Col>
			</Row>
		</Layout>);
	}
}


export default TaskUpdate;