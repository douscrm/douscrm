import React, {Component} from "react";



class Card extends Component {
	constructor(props) {
		super(props);
	}

	

	render() {
		let noGutters = this.props.noGutters || false;
		let className = ['card'];

		if(this.props.className) {
			className.push(this.props.className);
		}

		let children = this.props.children;
		if(this.props.padding) {
			children = <div class="card-body no-gutters">{this.props.children}</div>
		}

		return (<div className={className.join(' ')}>
			<h4 className="card-header">{this.props.title}</h4>
			{children}
		</div>);
	}
}

export default Card;