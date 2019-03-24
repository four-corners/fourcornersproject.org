import React from 'react';
import { render } from 'react-dom';
import ReactHtmlParser from 'react-html-parser';
import i18n from '../../i18n.jsx';
import Label from '../form/label.jsx';
import Import from './import.jsx';
import History from './history.jsx';

const slugify = require('slugify');

class Popup extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			activeDesc: false,
			activeTab: false
		};
		// this.translations = this.props.creator.acf;
	}

	toggleDesc(e) {
		const elem = e.currentTarget;
		let activeDesc;
		if(!e || this.state.activeDesc == elem.dataset.tab) {
			activeDesc = false;
		} else {
			activeDesc = elem.dataset.tab;
		}
		this.setState({
			activeDesc: activeDesc
		});
	}

	openPopup(e) {
		this.setState({
			activeTab: e.currentTarget.dataset.tab
		});
	}

	closePopup(e) {
		this.setState({
			activeTab: false
		});
	}

	updateFormData(value) {
		try {
			const embedHtml = ReactHtmlParser(value)[0];
			const	dataString = embedHtml.props['data-fc'];
			const dataJSON = JSON.parse(dataString);
			this.props.sendFormData(dataJSON);
			if(embedHtml.props.children.length) {
				const embedImgSrc = embedHtml.props.children[0].props.src;
				this.props.sendImgSrc(embedImgSrc);
			}
			this.props.closePopup();
		} catch (e) {
			console.log(e);
		}
	}

	render() {
		return (
			<React.Fragment>
				<div id='embed-import' className={this.state.activeTab ? 'opened' : ''}>
					
					<div id='popup-links'>

						<div className='popup-link'>
							<label>
								<a onClick={this.openPopup.bind(this)} data-tab='import' href='#'>
									Import code to edit
								</a>
								<a href='#'
									className='toggle-desc'
									data-tab='import'
									onClick={this.toggleDesc.bind(this)}
									onFocus={this.toggleDesc.bind(this)}>
									<div></div>
								</a>
							</label>
						</div>

						<div className='popup-link'>
							<label>
								<a onClick={this.openPopup.bind(this)} data-tab='history' href='#'>
									View your history
								</a>
								<a href='#'
									className='toggle-desc'
									data-tab='history'
									onClick={this.toggleDesc.bind(this)}
									onFocus={this.toggleDesc.bind(this)}>
									<div></div>
								</a>
							</label>
						</div>

					</div>


					<div className='popup-link-descs'>
						<div className={'desc field-desc'+(this.state.activeDesc=='import'?' opened':'')}>
							Have you've already created a Four Corners embed and wish to make some edits? Click the link above to import your code and make your changes in the form below.
						</div>
						<div className={'desc field-desc'+(this.state.activeDesc=='history'?' opened':'')}>
							If opted-in, your form process will be autosaved in this browser to be recovered later. This saved data is not collected by Four Corners.
						</div>
					</div>


					<div id='creator-popup'>

						<div id='popup-back' onClick={this.closePopup.bind(this)}></div>

						<div className={'content-block tab-content'+(this.state.activeTab=='import'?' opened':'')}>
							<Import
								closePopup={this.closePopup.bind(this)}
								updateFormData={this.updateFormData.bind(this)}/>
						</div>

						<div className={'content-block tab-content'+(this.state.activeTab=='history'?' opened':'')}>
							<History
								timestamp={this.props.timestamp}
								closePopup={this.closePopup.bind(this)}
								updateFormData={this.updateFormData.bind(this)}/>
						</div>

					</div>
				</div>
			</React.Fragment>
		);
	}
}

export default Popup;