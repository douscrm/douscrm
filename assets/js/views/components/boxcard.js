import React, {Component} from "react";



class BoxCard extends Component {
	constructor(props) {
		super(props);
	}

	

	render() {
		let noGutters = this.props.noGutters || false;
		let className = ['card'];

		if(this.props.className) {
			className.push(this.props.className);
		}

		return (<div className={className.join(' ')}>
			{this.props.children}
		</div>);
	}
}


class BoxCardHeader extends Component {
	constructor(props) {
		super(props);
	}

	

	render() {
		return (<h4 className="card-header">{this.props.children}</h4>);
	}
}


class BoxCardBody extends Component {
	constructor(props) {
		super(props);
	}

	

	render() {
		let html = null;

		if(!this.props.padding) {
			html = (<div className="card-body no-gutters">{this.props.children}</div>);
		} else {
			html = (<div className="card-body">{this.props.children}</div>);
		}
		
		return html;
	}
}


class BoxCardFooter extends Component {
	constructor(props) {
		super(props);
	}

	

	render() {
		return (<div className="card-footer text-muted">{this.props.children}</div>);
	}
}


export {BoxCard, BoxCardHeader, BoxCardBody, BoxCardFooter};

/*export default {
	BoxCard: BoxCard, 
	BoxCardHeader: BoxCardHeader, 
	BoxCardBody: BoxCardBody, 
	BoxCardFooter: BoxCardFooter
};*/