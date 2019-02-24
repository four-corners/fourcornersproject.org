import React from 'react';

import i18n from './../i18n.jsx';

class Module extends React.Component {

	constructor(props) {
		super(props);
		this.corners = ['imagery','links','authorship','backstory'];
		this.state = {
			activeCorner: null,
			fourCorners: null
		};
	}

	componentDidMount() {
		let self = this;
		const fourCorners = FourCorners.default.prototype.init();
		if(!fourCorners) {return}
		self.fourCorners = fourCorners[0];
	}

	componentDidUpdate(prevProps, prevState, snapshot) {

	}


	onClick(e) {
		// this.props.sendActiveFieldset('photo')
	}

	onFocus(e) {
		// e.target.setSelectionRange(0, e.target.value.length);
	}

	onBlur(e) {

	}

	openPanel(e) {
		// const cornerSlug = e.target.dataset.fcSlug;
		// this.props.sendActiveCorner(cornerSlug);
		// this.setState({
		// 	expandPanel: false
		// });
	}


	renderCorners() {
		const corners = [];
		{this.corners.forEach((cornerSlug,i) => {
			let className = 'fc-corner fc-'+cornerSlug;
			if(this.state.activeCorner == cornerSlug) {
				className += ' fc-active';
			}
			corners.push(
				<div key={i}
					className={className}
					data-fc-slug={cornerSlug}
					onClick={this.openPanel.bind(this)}>
				 </div>
			);
		})}
		return corners;
	}


	render() {
		const activeCorner = this.state.activeCorner;
		return(
			<React.Fragment>
				<div className='fc-embed fc-loaded' data-fc-active={this.corners.includes(activeCorner)?activeCorner:''}>
					{this.renderCorners()}
					{this.props.photo ?
						<div className='fc-photo'>
							<img className='fc-img' src={this.props.photo}/>
						</div>
					: ''}
				</div>
			</React.Fragment>
		)

	}
}

export default Module;