import React from 'react';
import ReactHtmlParser from 'react-html-parser';
import i18n from './../i18n.jsx';

class Demo extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			nextIndex: 1,
			activeSlug: 'authorship',
			hoveredSlug: null,
			fourCorners: null,
			time: 0,
			corners: ['authorship', 'backstory', 'imagery', 'links']
		};
	}

	componentDidMount() {
		this.interval = setInterval(() => this.cycleCorner(), 1750);
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		
	}

	componentWillUnmount() {
		clearInterval(this.state.time);
	}

	cycleCorner() {
		let nextIndex = this.state.nextIndex;
		const nextCorner = this.state.corners[nextIndex];
		nextIndex++;
		this.setState({
			activeSlug: nextCorner,
			nextIndex: nextIndex < this.state.corners.length ? nextIndex : 0
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
		const cornerIcons = [];
		{this.state.corners.forEach((corner,i) => {
			let className = 'fc-corner fc-'+corner;
			if(this.state.activeSlug == corner && !this.state.hoveredSlug) {
				className += ' active';
			}
			cornerIcons.push(
				<div key={i}
					className={className}
					data-fc-slug={corner}
					data-index={i}
					onMouseOver={this.onHover.bind(this)}
					onMouseLeave={this.unHover.bind(this)}
					onClick={this.openPanel.bind(this)}>
				 </div>
			);
		})}
		return cornerIcons;
	}

	renderTitles() {
		const cornerTitles = [];
		{if(this.props.strings.demo) {
			{this.state.corners.forEach((corner,i) => {
				let className = 'corner-title';
				if(this.state.hoveredSlug == corner || (this.state.activeSlug == corner && !this.state.hoveredSlug)) {
					className += ' active';
				}
				cornerTitles.push(
					<div key={i} className={className}>
						{ReactHtmlParser(this.props.strings.demo[corner])}
					</div>
				);
			})}
		}}
		return cornerTitles;
	}


	render() {
		const activeSlug = this.state.activeSlug;
		return(
			<React.Fragment>
				<div className='fc-embed-demo'>
					{this.renderCorners()}
					{this.renderTitles()}
				</div>
			</React.Fragment>
		)

	}
}

export default Demo;