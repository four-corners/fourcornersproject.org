import React from 'react';
import i18n from '../../i18n.jsx';
// import FourCorners from '@four-corners/four-corners';

import Authorship from './panels/authorship.jsx';
import Backstory from './panels/backstory.jsx';
import Imagery from './panels/imagery.jsx';
import Links from './panels/links.jsx';

class Module extends React.Component {

	constructor(props) {
		super(props);
		this.corners = ['imagery','links','authorship','backstory'];
		this.rtlLangs = ['ar','arc','fa','he','ks','kv','ur','yi'];
		this.state = {
			lang: i18n.language,
			formData: {},
			expandPanel: false
		};
	}

	componentDidMount() {
		const fourCorners = new FourCorners({
			selector: '.saved-states .fc-embed'
		});
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
		console.warn('Error', e);
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
		const formData = Object.entries(this.props.formData),
					embedData = {};
		{formData.map((obj) => this.corners.includes(obj[0]) ? embedData[obj[0]]=obj[1]:'')}
		const panels = [],
					creator = this.props.creator;
		{Object.entries(embedData).forEach((obj,i) => {
			const cornerSlug = obj[0],
						cornerTitleKey = [cornerSlug, 'title'].join('_'),
						panelData = obj[1];
			let panelInner = '';
			if(Object.keys(panelData).length) {
				switch(cornerSlug) {
					case 'authorship':
						panelInner = <Authorship panelData={panelData} />;
						break;
					case 'backstory':
						panelInner = <Backstory panelData={panelData} mediaData={this.props.mediaData.backstory} />;
						break;
					case 'imagery':

						panelInner = <Imagery panelData={panelData} mediaData={this.props.mediaData.imagery} />;
						break;
					case 'links':
						panelInner = <Links panelData={panelData} />;
						break;
				}
			}

			const title = creator&&creator.strings ? creator.strings[cornerTitleKey] : '&nbsp;';
			let className = 'fc-panel fc-'+cornerSlug;
			if(this.props.activeCorner === cornerSlug) {
				className += ' fc-active';
			}
			panels.push(
				<div className={className} data-fc-slug={cornerSlug} key={i}>
					<div className="fc-panel-title">
						{title}
						<div className="fc-icon fc-expand" onClick={this.toggleExpandPanel.bind(this)}/>
						<div className="fc-icon fc-close" onClick={this.collapsePanel.bind(this)}/>
					</div>
					<div className="fc-panel-title fc-pseudo">{title}</div>
					{panelInner ?
					<div className="fc-scroll">
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
			if(this.props.activeCorner === cornerSlug) {
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
		if(!opts||(!opts.caption&&!opts.credit&&!opts.logo)){return}
		return (
			<div className="fc-cutline">
				{opts.caption && data.authorship ? <span className="fc-caption">{data.authorship.caption}</span> : ''}
				{opts.credit && data.authorship ?
					<span className="fc-credit">
						{data.authorship.credit ? <span>{data.authorship.credit}</span> : ''}
						{data.authorship.license && data.authorship.license.holder ? <span>{data.authorship.license.holder}</span> : ''}
					</span>
				: ''}
				{opts.logo ? <a href="https://fourcornersproject.org" target="_blank" class="fc-logo"></a> : ''}
			</div>
		);
	}

	render() {
		const lang = this.state.lang,
					formData = this.props.formData,
					imgSrc = formData.photo ? formData.photo.src : null,
					opts = formData.opts;
		let className = 'fc-embed',
				textDir = 'ltr';

		if(opts&&opts.dark) {
			className += ' fc-dark';
		}
		if(this.state.expandPanel) {
			className += ' fc-full';
		}
		if(imgSrc) {
			className += ' fc-loaded';	
		} else {
			className += ' fc-empty';
		}
		if(this.rtlLangs.includes(lang)) {
			textDir = 'rtl';
		}
		const activeCorner = this.props.activeCorner;
		return(
			<React.Fragment>
				<div className={className} data-fc-active={this.corners.includes(activeCorner) ? activeCorner : ''} lang={lang} dir={textDir}>
					{imgSrc ?
						<div className="fc-photo fc-loaded">
							<img src={imgSrc} className="fc-img"/>
						</div> :
						<React.Fragment>
							<div className="no-photo">
								<div className="no-photo-text">
									<h2>No photo added</h2>
									<h4>Add a link to your image file under "Add your photo"</h4>
								</div>
							</div>
							<div className="fc-photo"></div>
						</React.Fragment>}
					{this.renderCorners()}
					{this.renderPanels()}
				</div>
				{this.renderCutline()}
			</React.Fragment>
		)

	}
}

export default Module;