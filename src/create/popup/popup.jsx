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
			activeDesc: null,
			activeTab: null
		};
		this.strings = this.props.creator.acf || {};
	}

	toggleDesc(e) {
		const elem = e.currentTarget;
		let activeDesc;
		if(this.state.activeDesc == elem.dataset.tab) {
			activeDesc = null;
		} else {
			activeDesc = elem.dataset.tab;
		}
		this.setState({
			activeDesc: activeDesc
		});
	}

	openDesc(e) {
		this.setState({
			activeDesc: e.currentTarget.dataset.tab
		});
	}

	openPopup(e) {
		this.setState({
			activeTab: e.currentTarget.dataset.tab
		});
	}

	closePopup(e) {
		this.setState({
			activeTab: null
		});
	}

	updateFormData(value) {
		try {
			const embedHtml = ReactHtmlParser(value)[0];
			const	dataString = embedHtml.props['data-fc'];
			const dataJSON = JSON.parse(dataString);
			this.props.sendFormData(dataJSON);
			this.closePopup();
		} catch (e) {
			console.warn(e);
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
									{ReactHtmlParser(this.strings.import_label)}
								</a>
								<a href='#'
									className='toggle-desc'
									data-tab='import'
									// onFocus={this.openDesc.bind(this)}
									onClick={this.toggleDesc.bind(this)}>
									<div></div>
								</a>
							</label>
						</div>

						<div className='popup-link'>
							<label>
								<a onClick={this.openPopup.bind(this)} data-tab='history' href='#'>
									{ReactHtmlParser(this.strings.history_label)}
								</a>
								<a href='#'
									className='toggle-desc'
									data-tab='history'
									// onFocus={this.openDesc.bind(this)}
									onClick={this.toggleDesc.bind(this)}>
									<div></div>
								</a>
							</label>
						</div>

					</div>


					<div className='popup-link-descs'>
						<div className={'desc field-desc'+(this.state.activeDesc=='import'?' opened':'')}>
							{ReactHtmlParser(this.strings.import_desc)}
						</div>
						<div className={'desc field-desc'+(this.state.activeDesc=='history'?' opened':'')}>
							{ReactHtmlParser(this.strings.history_desc)}
						</div>
					</div>


					<div id='creator-popup'>

						<div id='popup-back' onClick={this.closePopup.bind(this)}></div>

						<div className={'content-block tab-content'+(this.state.activeTab=='import'?' opened':'')}>
							<Import
								strings={this.strings}
								closePopup={this.closePopup.bind(this)}
								updateFormData={this.updateFormData.bind(this)}/>
						</div>

						<div className={'content-block tab-content'+(this.state.activeTab=='history'?' opened':'')}>
							<History
								strings={this.strings}
								timestamp={this.props.timestamp}
								saveHistory={this.props.saveHistory}
								toggleSave={this.props.toggleSave.bind(this)}
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