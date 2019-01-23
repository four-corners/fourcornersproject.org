import React from 'react';

import i18n from './../i18n.jsx';
import Entry from './entry.jsx';
import FourCorners from './../../assets/js/four-corners.min.js';

class Embed extends React.Component {

	constructor(props) {
		super(props);
		this.corners = ['context','links','authorship','backstory'];
		this.state = {
			fourCorners: null,
			formData: {},
			expandPanel: false
		};
	}

	componentDidMount() {
		let self = this;
		// const activeCorner = this.props.activeCorner;
		setTimeout(function() {
			self.fourCorners = FourCorners.prototype.init()[0];
		}, 3000);
	}

	componentDidUpdate(prevProps) {
		const activeCorner = this.props.activeCorner;
		if(this.fourCorners) {
			this.fourCorners.openCorner(activeCorner);
		}
	}

	onChangeOpts(e) {
		let stateChange = {
			formData: this.props.formData
		};
		stateChange[e.target.id] = e.target.checked;
		this.setState(stateChange);
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

	toggleExpandPanel() {
		// this.fourCorners.toggleExpandPanel();
		this.setState({
			expandPanel: !this.state.expandPanel
		});
	}

	closePanel() {
		this.fourCorners.closeCorner();
		this.props.sendActiveCorner(null);
		this.setState({
			expandPanel: false
		});
	}

	renderPanels() {
		const formData = Object.entries(this.props.formData);
		const embedData = {};
		// console.log(formData);
		{formData.map((obj) => this.corners.includes(obj[0]) ? embedData[obj[0]]=obj[1]:'')}
		// console.log(embedData);
		const panels = [];
		const fields = this.props.creator.acf;
		// console.log(this.props.activeCorner);
		{Object.entries(embedData).forEach((obj,i) => {
			const cornerSlug = obj[0];
			const cornerTitleKey = [cornerSlug, 'title'].join('_');
			const cornerTitle = fields[cornerTitleKey];
			const data = obj[1];
			const entries = [];
			Object.entries(data).forEach((obj,i) => {
				const fieldSlug = obj[0];
				const fieldData = obj[1];
				let fieldLabel = '';
				if(!['media','links'].includes(fieldSlug)) {
					const fieldLabelKey = [cornerSlug, fieldSlug, 'label'].join('_');
					fieldLabel = fields[fieldLabelKey];
				}
				const mediaData = this.props.mediaData[cornerSlug];
				if(fieldData) {
					entries.push(
						<Entry
							cornerSlug={cornerSlug}
							fieldLabel={fieldLabel}
							fieldSlug={fieldSlug}
							fieldData={fieldData}
							mediaData={mediaData}
							key={i} />
					);
				}
			});
			let className = 'fc-panel fc-'+cornerSlug;
			if(this.props.activeCorner == cornerSlug) {
				className += ' fc-active';
			}
			panels.push(
				<div className={className} data-fc-slug={cornerSlug} key={i}>
					<div className='fc-scroll'>
						<div className='fc-inner'>
							<div className='fc-panel-title'>
								<span>{cornerTitle}</span>
								<div className='fc-icon fc-expand' onClick={this.toggleExpandPanel.bind(this)}/>
								<div className='fc-icon fc-close' onClick={this.closePanel.bind(this)}/>
							</div>
							{entries}
						</div>
					</div>
				</div>
			);
		})}
		return panels;
	}

	render() {
		const photo = this.props.formData.photo;
		const imgSrc = photo ? photo.file : '';

		let className = 'fc-embed';
		if(this.props.darkMode == 'true') {
			className += ' fc-dark';
		}
		if(this.state.expandPanel) {
			className += ' fc-full';
		}
		if(imgSrc) {
			className += ' fc-loaded';	
		}
		return(
			<div className={className} data-fc-active={this.props.activeCorner}>
				{!imgSrc?<div className="no-photo"><h2>No photo</h2></div>:''}
				<div className={imgSrc?'fc-photo fc-loaded':'fc-photo'}>
					<img src={imgSrc} className='fc-img'/>
				</div>
				{this.renderPanels()}
			</div>
		)

	}
}

export default Embed;