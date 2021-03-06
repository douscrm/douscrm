import React, {Component} from "react";
import {Link} from 'react-router-dom';
import _ from 'lodash';
import axios from 'axios';
import moment from 'moment';
import globals from '../../../globals';
import { Badge, Breadcrumb, Table, Layout, Row, Col, Card, Button, Icon } from 'antd';



class TaskListCompleted extends Component {
	constructor(props) {
		super(props);

		this.state = {
			modelLoad: false,
			refreshId: '0',
			loading: true
		};

		this.models = [];

		this.columns = [{
			title: 'Name',
			dataIndex: 'name',
			sorter: true,
			render: (name, model) => {
				let badge = 'processing'
				if(model.status == 'completed') {
					badge = 'success';
				}

				return (<Link to={`/tasks/${model.id}`}>
					<Badge status={badge} />
					{name}
				</Link>);
			}
		}, {
			title: 'Date',
			dataIndex: 'endDate',
			sorter: true,
			render: (date) => { if(date) { return moment(date).format('YYYY-MM-DD') } else { return null } },
			filters: [{
				text: 'Today',
				value: 'today',
			}, {
				text: 'Delayed',
				value: 'delayed',
			}, {
				text: 'Future',
				value: 'future',
			}, {
				text: 'No date',
				value: 'nodate',
			}],
			onFilter: (value, record) => {
				const date = moment(record.endDate).format('YYYY-MM-DD');
				const currentDate = moment().format('YYYY-MM-DD');

				console.log(record.endDate)

				return ((value == 'today' && date == currentDate && record.endDate != undefined) || (value == 'delayed' && date < currentDate) || (value == 'future' && date > currentDate) || (value == 'nodate' && record.endDate == null));
			}
		}, {
			title: 'Status',
			dataIndex: 'status',
			filters: [{
				text: 'completed',
				value: 'completed',
			}, {
				text: 'pending',
				value: 'pending',
			}, {
				text: 'progress',
				value: 'progress',
			}, {
				text: 'archived',
				value: 'archived',
			}],
			onFilter: (value, record) => record.status == value
		}, , {
			title: 'Action',
			render: (record) => {
				let status = null;

				if(record.status == 'completed') {
					status = (<a href="#" onClick={(event) => {
						this.statusTask(record, 'pending');
					}}><Icon type="exclamation-circle-o" style={{ fontSize: 16 }} /></a>);
				} else {
					status = (<a href="#" onClick={(event) => {
						this.statusTask(record, 'completed');
					}}><Icon type="check-circle-o" style={{ fontSize: 16 }} /></a>);
				}

				return (<div>{status}</div>);
			},
		}];

		this.handleTableChange = this.handleTableChange.bind(this);
		this.statusTask = this.statusTask.bind(this);
		this.callTasks = this.callTasks.bind(this);
	}



	componentDidMount() {
		this.callTasks();
	}



	callTasks() {
		const self = this;
		
		axios.get(`${globals.api}/tasks`, {
			params: {
				filter: {
					where: {
						and: [
							{status: {neq: null}},
							{status: {neq: 'pending'}}
						]
					}
				}
			}
		}).then((response) => {
			self.models = response.data;
			self.setState({ loading: false });
		}).catch((error) => {
			console.log(error)
		});
	}



	statusTask(model, status) {
		const self = this;
		self.setState({ loading: true });

		axios.patch(`${globals.api}/tasks/${model.id}`, { status: status }).then((response) => {
			self.callTasks();
		}).catch(() => {
			self.callTasks();
		});
	}



	handleTableChange(pagination, filters, sorter) {
		this.models = _.sortBy(this.models, [(model)=> {
			const value = model[sorter.columnKey];

			if(value) {
				return value.toLowerCase();
			} else {
				return value;
			}
		}]);

		if(sorter.order != 'descend') {
			this.models = this.models.reverse();
		}

		this.setState({refreshId: _.uniqueId('refresh')});
	}

	

	render() {
		return (<Layout>
			<Row>
				<Col xs={12} sm={12} md={12} lg={12} xl={12}>
					<Breadcrumb className="dous-breadcrumb">
						<Breadcrumb.Item><Link to="/">Home</Link></Breadcrumb.Item>
						<Breadcrumb.Item><Link to="/tasks">Tasks</Link></Breadcrumb.Item>
						<Breadcrumb.Item>Tasks completed</Breadcrumb.Item>
					</Breadcrumb>
				</Col>
			</Row>
			<Row gutter={8}>
				<Col xs={24} sm={24} md={24} lg={24} xl={24}>
					<Card title='Completed tasks' style={{textAlign: 'center'}}>
						<Table
							columns={this.columns}
							rowKey={record => record.id}
							dataSource={this.models}
							pagination={10}
							loading={this.state.loading}
							onChange={this.handleTableChange}
							expandedRowRender={(record) => <p className="dous-linejump">{record.description}</p>}
							locale={{
								filterTitle: 'Title',
								filterConfirm: 'OK',
								filterReset: 'Reset',
								emptyText: 'Not results',
							}}
						/>
					</Card>
				</Col>
			</Row>
		</Layout>);
	}
}


export default TaskListCompleted;