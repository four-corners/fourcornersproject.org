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
			formData: {}
		};
	}

	componentDidMount() {
		let self = this;
		const activeCorner = this.props.activeCorner;
		setTimeout(function() {
			self.fourCorners = FourCorners.prototype.init({
				noPanels: true
			})[0];
		});
	}

	componentDidUpdate(prevProps) {
		const activeCorner = this.props.activeCorner;
		const prevCorner = prevProps.activeCorner;
		if(activeCorner) {
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

	renderPanels() {
		const formData = Object.entries(this.props.formData);
		const embedData = {};
		{formData.map((obj) => this.corners.includes(obj[0]) ? embedData[obj[0]]=obj[1]:'')}
		// const imgLoaded = this.state.imgLoaded?' has-image':'';
		// const imgFocus = this.state.imgFocus?' focus':'';
		const panels = [];
		const fields = this.props.creator.acf;
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
			let className = 'fc-panel';
			if(this.props.activeCorner == cornerSlug) {
				className += ' fc-active';
			}
			panels.push(
				<div className={className} data-slug={cornerSlug} key={i}>
					<div className='fc-panel-title'>{cornerTitle}</div>
					<div className='fc-inner'>{entries}</div>
				</div>
			);
		})}
		return panels;
	}

	render() {
		return(
			<div className={this.props.imgLoaded?'fc-embed card':'fc-embed'}>
				<div className={this.props.imgLoaded?'fc-photo fc-loaded':'fc-photo'}>
					<img src={this.props.imgSrc} className='fc-img'/>
				</div>
				{this.renderPanels()}
			</div>
		)

	}
}

export default Embed;