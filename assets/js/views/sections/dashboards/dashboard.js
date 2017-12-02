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
	}



	componentDidMount() {
	}



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