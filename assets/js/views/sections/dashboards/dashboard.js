import React, {Component} from "react";
import {Link} from 'react-router-dom';
import { Spin, Layout, Card, Row, Col, Progress } from 'antd';
import axios from 'axios';
import moment from 'moment';
import globals from '../../../globals';
const { Content } = Layout;
import _ from 'lodash';
import {TodayTasksProgress, FutureTasksProgress, DelayTasksProgress} from '../../widgets/tasks';



class Dashboard extends Component {
	constructor(props) {
		super(props);
		/*
		this.state = {
			loadingScreen: true,
			modelLoad: false,
			refreshId: '0',
			delayTaskLoad: false,
			currentTaskLoad: false,
			futureTaskLoad: false
		};

		this.models = [];

		this.taskData = {
			current: {},
			dealy: {},
			future: {}
		};

		this.completeTask = this.completeTask.bind(this);
		this.getDelayTask = this.getDelayTask.bind(this);
		this.getCurrentTask = this.getCurrentTask.bind(this);
		this.getFutureTask = this.getFutureTask.bind(this);*/
	}



	componentDidMount() {
		/*const self = this;
		const id = self.props.match.params.id;

		setTimeout(() => {
			self.setState({ loadingScreen: false });
		}, 750);

		this.getDelayTask();
		this.getCurrentTask();
		this.getFutureTask();*/
	}


/*
	getDelayTask() {
		console.log('logggg')
		const self = this;
		axios.get(`${globals.api}/tasks`, {
			params: {
				filter: {
					where: {
						endDate: {
							lt: '2017-11-30'
						}
					}
				}
			}
		}).then((response) => {
			self.models = response.data;
			self.setState({ delayTaskLoad: true });
		}).catch((error) => {
			console.log(error)
		});
	}



	getCurrentTask() {
		const self = this;
		axios.get(`${globals.api}/tasks`, {
			params: {
				filter: {
					where: {
						endDate: moment().format('YYYY-MM-DD')
					}
				}
			}
		}).then((response) => {
			self.taskData.current.count = 0;
			self.taskData.current.total = response.data.length;
			self.taskData.current.data = response.data;
			
			_.each(response.data, (item) => {
				if(item.status == 'completed') {
					self.taskData.current.count = self.taskData.current.count + 1;
				}
			});

			self.taskData.current.percent = parseInt(self.taskData.current.count / self.taskData.current.total);

			if(isNaN(self.taskData.current.percent)) {
				self.taskData.current.percent = 100;
			}

			console.log('asdfasdf')
			console.log(self.taskData)

			self.setState({ currentTaskLoad: true });
		}).catch((error) => {
			console.log(error)
		});
	}



	getFutureTask() {
		const self = this;
		axios.get(`${globals.api}/tasks`, {
			params: {
				filter: {
					where: {
						endDate: {
							gt: moment().format('YYYY-MM-DD')
						}
					}
				}
			}
		}).then((response) => {
			self.models = response.data;
			self.setState({ futureTaskLoad: true });
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
*/
	

	render() {
		return (
			<Layout>
				<Row gutter={8} type="flex" justify="space-around" align="middle">
					<Col xs={24} sm={8} md={8} lg={8} xl={8}>
						<TodayTasksProgress />
					</Col>
					<Col xs={24} sm={8} md={8} lg={8} xl={8}>
						<DelayTasksProgress />
					</Col>
					<Col xs={24} sm={8} md={8} lg={8} xl={8}>
						<FutureTasksProgress />
					</Col>
				</Row>
			</Layout>
		);
	}
}

export default Dashboard;