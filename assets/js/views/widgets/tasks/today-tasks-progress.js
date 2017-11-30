import React, {Component} from "react";
import {Link} from 'react-router-dom';
import { Spin, Layout, Card, Row, Col, Progress } from 'antd';
import axios from 'axios';
import moment from 'moment';
import globals from '../../../globals';
const { Content } = Layout;
import _ from 'lodash';



class TodayTasksProgress extends Component {
	constructor(props) {
		super(props);

		this.state = {
			loadTask: false
		};

		this.percent = 0;

		this.getTasks = this.getTasks.bind(this);
	}



	componentDidMount() {
		this.getTasks();
	}



	getTasks() {
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
			let count = 0;
			const total = response.data.length;
			const data = response.data;
			
			_.each(data, (item) => {
				if(item.status == 'completed') {
					count++;
				}
			});

			if(total == 0) {
				this.percent = 100;
			} else {
				this.percent = count / parseFloat(total) * 100;
			}
			
			self.setState({ loadTask: true });
		}).catch((error) => {
			console.log(error)
		});
	}



	render() {
		return (
			<Card loading={!this.state.loadTask} title={this.props.title || 'Today tasks'} style={{textAlign: 'center'}}>
				<Progress type="circle" percent={this.percent} />
			</Card>
		);
	}
}

export default TodayTasksProgress;