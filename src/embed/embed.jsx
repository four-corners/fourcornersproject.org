import React from 'react';

import i18n from './../i18n.jsx';
import Entry from './entry.jsx';

class Embed extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
		};
		this.imgInputRef = React.createRef();
		this.corners = ['context','links','copyright','backstory'];
	}

	componentDidMount() {
		const fourCornersInst = FourCorners.default.prototype.init()[0];
		const activeCorner = this.props.activeCorner;
		this.FourCorners = fourCornersInst;
		if(activeCorner) {
			this.FourCorners.openCorner(activeCorner);
		}
	}

	componentDidUpdate(prevProps) {
		const activeCorner = this.props.activeCorner;
		if(activeCorner) {
			this.FourCorners.openCorner(activeCorner);
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
		// this.FourCorners.closeCorner();
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
				entries.push(
					<Entry
						cornerSlug={cornerSlug}
						fieldLabel={fieldLabel}
						fieldSlug={fieldSlug}
						fieldData={fieldData}
						mediaData={mediaData}
						key={i} />
				);
			})
			panels.push(
				<div data-slug={cornerSlug} className='fc-panel' key={i}>
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