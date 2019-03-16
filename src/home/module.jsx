import React from 'react';
import i18n from './../i18n.jsx';

class Module extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			activeCorner: null,
			hoveredCorner: null,
			fourCorners: null
		};
	}

	componentDidMount() {
		let self = this;
		// const fourCorners = FourCorners.default.prototype.init();
		// if(!fourCorners) {return}
		// self.fourCorners = fourCorners[0];
	}

	componentDidUpdate(prevProps, prevState, snapshot) {

	}


	onHover(e) {
		console.log(e.target.dataset.fcActive);
	}

	openPanel(e) {
		const cornerSlug = e.target.dataset.fcSlug;
		this.props.sendActiveCorner(cornerSlug);
		this.setState({
			expandPanel: false
		});
	}


	renderCorners() {
		const self = this;
		const corners = [];
		{self.props.cornersInfo.forEach((corner,i) => {
			const cornerSlug = corner.slug;
			let className = 'fc-corner fc-'+cornerSlug;
			if(self.state.activeCorner == cornerSlug) {
				className += ' fc-active';
			}
			corners.push(
				<div key={i}
					className={className}
					data-fc-slug={cornerSlug}
					onMouseOver={self.onHover.bind(this)}
					onClick={self.openPanel.bind(this)}>
				 </div>
			);
		})}
		return corners;
	}

	renderTitles() {
		const corners = [];
		{this.props.cornersInfo.forEach((corner,i) => {
			let className = 'corner-title';
			if(this.state.hoveredCorner == corner.slug) {
				className += ' active';
			}
			corners.push(
				<div key={i} className={className}>
					<h2>{corner.title}</h2>
				</div>
			);
		})}
		return corners;
	}


	render() {
		const activeCorner = this.state.activeCorner;
		return(
			<React.Fragment>
				<div className='fc-embed-demo'>
					{this.renderCorners()}
					{this.renderTitles()}
					{this.props.photo ?
						<div className='fc-photo'>
							{<img className='fc-img' src={this.props.photo}/>}
						</div>
					: ''}
				</div>
			</React.Fragment>
		)

	}
}

export default Module;