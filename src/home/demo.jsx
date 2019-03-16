import React from 'react';
import ReactHtmlParser from 'react-html-parser';
import i18n from './../i18n.jsx';

class Demo extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			nextIndex: 0,
			activeSlug: null,
			hoveredSlug: null,
			fourCorners: null,
			time: 0
		};
	}

	componentDidMount() {
		// let self = this;
		// const fourCorners = FourCorners.default.prototype.init();
		// if(!fourCorners) {return}
		// self.fourCorners = fourCorners[0];
		this.interval = setInterval(() => this.cycleCorner(), 1750);
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		
	}

	componentWillUnmount() {
		clearInterval(this.state.time);
	}

	cycleCorner() {
		const cornersInfo = this.props.cornersInfo;
		let nextIndex = this.state.nextIndex;
		const nextCorner = cornersInfo[nextIndex];
		nextIndex++;
		this.setState({
			activeSlug: nextCorner.slug,
			nextIndex: nextIndex < cornersInfo.length ? nextIndex : 0
		});
	}


	onHover(e) {
		const cornerSlug = e.target.dataset.fcSlug;
		const cornerIndex = e.target.dataset.index;
		this.setState({
			hoveredSlug: cornerSlug,
			activeSlug: cornerSlug,
			nextIndex: cornerIndex
		});
	}

	unHover(e) {
		this.setState({
			hoveredSlug: null
		});
	}

	openPanel(e) {
		this.setState({
			expandPanel: false
		});
	}


	renderCorners() {
		const corners = [];
		{this.props.cornersInfo.forEach((corner,i) => {
			const cornerSlug = corner.slug;
			let className = 'fc-corner fc-'+cornerSlug;
			if(this.state.activeSlug == cornerSlug && !this.state.hoveredSlug) {
				className += ' active';
			}
			corners.push(
				<div key={i}
					className={className}
					data-fc-slug={cornerSlug}
					data-index={i}
					onMouseOver={this.onHover.bind(this)}
					onMouseLeave={this.unHover.bind(this)}
					onClick={this.openPanel.bind(this)}>
				 </div>
			);
		})}
		return corners;
	}

	renderTitles() {
		const corners = [];
		const strings = this.props.options || {};
		{this.props.cornersInfo.forEach((corner,i) => {
			const cornerSlug = corner.slug;
			let className = 'corner-title';
			if(this.state.hoveredSlug == cornerSlug
				|| (this.state.activeSlug == cornerSlug && !this.state.hoveredSlug)) {
				className += ' active';
			}
			corners.push(
				<div key={i} className={className}>
					<span>{ReactHtmlParser(strings[cornerSlug+'_brief'])}</span>
				</div>
			);
		})}
		return corners;
	}


	render() {
		const activeSlug = this.state.activeSlug;
		return(
			<React.Fragment>
				<div className='fc-embed-demo'>
					{this.renderCorners()}
					{this.renderTitles()}
					{this.props.innerContent ?
						<div className='inner-content'>
							{ReactHtmlParser(this.props.innerContent)}
						</div>
					: ''}
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

export default Demo;