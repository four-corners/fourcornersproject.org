import React from 'react';

import i18n from './../i18n.jsx';

import Authorship from './panels/authorship.jsx';
import Backstory from './panels/backstory.jsx';
import Imagery from './panels/imagery.jsx';
import Links from './panels/links.jsx';

import Entry from './entry.jsx';
// import FourCorners from './../../assets/js/four-corners.min.js';

class Module extends React.Component {

	constructor(props) {
		super(props);
		this.corners = ['imagery','links','authorship','backstory'];
		this.state = {
			fourCorners: null,
			formData: {},
			expandPanel: false
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

	onChangeOpts(e) {
		let stateChange = {
			formData: this.props.formData
		};
		stateChange[e.target.id] = e.target.checked;
		this.setState(stateChange);
	}

	onClick(e) {
		this.props.sendActiveFieldset('photo')
	}

	onFocus(e) {
		e.target.setSelectionRange(0, e.target.value.length);
	}

	onBlur(e) {

	}

	onError(e) {
		console.log('Error', e);
	}

	onScroll(e) {
		
	}

	openPanel(e) {
		const cornerSlug = e.target.dataset.fcSlug;
		this.props.sendActiveCorner(cornerSlug);
		this.setState({
			expandPanel: false
		});
	}

	toggleExpandPanel() {
		this.setState({
			expandPanel: !this.state.expandPanel
		});
	}

	collapsePanel() {
		this.props.sendActiveCorner(null);
		this.setState({
			expandPanel: false
		});
	}

	renderPanels() {
		const formData = Object.entries(this.props.formData);
		const embedData = {};
		{formData.map((obj) => this.corners.includes(obj[0]) ? embedData[obj[0]]=obj[1]:'')}
		const panels = [];
		const creator = this.props.creator;
		{Object.entries(embedData).forEach((obj,i) => {
			const cornerSlug = obj[0];
			const cornerTitleKey = [cornerSlug, 'title'].join('_');
			const panelData = obj[1];
			let panelInner = '';
			if(Object.keys(panelData).length) {
				switch(cornerSlug) {
					case 'authorship':
						panelInner = <Authorship panelData={panelData} />;
						break;
					case 'backstory':
						panelInner = <Backstory panelData={panelData} />;
						break;
					case 'imagery':
						panelInner = <Imagery panelData={panelData} mediaData={this.props.mediaData.imagery} />;
						break;
					case 'links':
						panelInner = <Links panelData={panelData} />;
						break;
				}
			}
			// const entries = [];
			// Object.entries(data).forEach((obj,i) => {
				// console.log(obj);
				// const fieldSlug = obj[0];
				// const fieldData = obj[1];
				// let fieldLabel = '';
				// if(!['media','links'].includes(fieldSlug) && creator && creator.acf) {
				// 	const fieldLabelKey = [cornerSlug, fieldSlug, 'label'].join('_');
				// 	fieldLabel = creator.acf[fieldLabelKey];
				// }
				// const mediaData = this.props.mediaData[cornerSlug];
				// if(fieldData) {
				// 	entries.push(
				// 		<Entry
				// 			cornerSlug={cornerSlug}
				// 			fieldLabel={fieldLabel}
				// 			fieldSlug={fieldSlug}
				// 			fieldData={fieldData}
				// 			mediaData={mediaData}
				// 			key={i} />
				// 	);
				// }
			// });

			const title = creator&&creator.acf ? creator.acf[cornerTitleKey] : '&nbsp;';
			let className = 'fc-panel fc-'+cornerSlug;
			if(this.props.activeCorner == cornerSlug) {
				className += ' fc-active';
			}
			panels.push(
				<div className={className} data-fc-slug={cornerSlug} key={i}>
					<div className='fc-panel-title'>
						{title}
						<div className='fc-icon fc-expand' onClick={this.toggleExpandPanel.bind(this)}/>
						<div className='fc-icon fc-close' onClick={this.collapsePanel.bind(this)}/>
					</div>
					<div className='fc-panel-title fc-pseudo'>{title}</div>
					{panelInner ?
					<div className='fc-scroll'>
						<div className='fc-inner'>
							{panelInner}
						</div>
					</div>
					:''}
				</div>
			);
		})}
		return panels;
	}

	renderCorners() {
		const corners = [];
		{this.corners.forEach((cornerSlug,i) => {
			let className = 'fc-corner fc-'+cornerSlug;
			if(this.props.activeCorner == cornerSlug) {
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

	renderCutline() {
		const data = this.props.formData;
		if(!data){return}
		const opts = data.opts;
		if(!opts||!opts.cutline){return}
		return (
			<div className='fc-cutline'>
				{data.authorship.credit}
				<a href="https://fourcornersproject.org" target="_blank">Four Corners</a>
			</div>
		);
	}

	render() {
		const imgData = this.props.imgData;
		const imgSrc = imgData ? imgData.imgSrc : null;
		const imgLoaded = imgData ? imgData.imgLoaded : null;
		const opts = this.props.formData.opts;
		let className = 'fc-embed';
		if(opts&&opts.dark) {
			className += ' fc-dark';
		}
		if(this.state.expandPanel) {
			className += ' fc-full';
		}
		if(imgSrc) {
			className += ' fc-loaded';	
		}
		const activeCorner = this.props.activeCorner;
		return(
			<React.Fragment>
				<div className={className} data-fc-active={this.corners.includes(activeCorner)?activeCorner:''}>
					{!imgLoaded?
					<div
						className="no-photo" onClick={this.onClick.bind(this)}>
						<h2>Add your photo</h2>
					</div>:''}
					<div className={imgLoaded?'fc-photo fc-loaded':'fc-photo'}>
						<img src={imgSrc} className='fc-img'/>
					</div>
					{this.renderCorners()}
					{this.renderPanels()}
				</div>
				{this.renderCutline()}
			</React.Fragment>
		)

	}
}

export default Module;