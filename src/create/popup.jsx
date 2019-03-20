import React from 'react';
import { render } from 'react-dom';
import ReactHtmlParser from 'react-html-parser';
import i18n from '../i18n.jsx';
import Label from './form/label.jsx';

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

	importCode(e) {
		e.preventDefault();
		const value = e.target.querySelector('textarea').value;
		try {
			const embedHtml = ReactHtmlParser(value)[0];
			const	embedJSON = JSON.parse(embedHtml.props['data-fc']);
			this.props.sendFormData(embedJSON);

			if(embedHtml.props.children.length) {
				const embedImgSrc = embedHtml.props.children[0].props.src;
				this.props.sendImgSrc(embedImgSrc);
			}
			this.props.closePopup();
		} catch (e) {
			console.log(e);
		}

	}

	onError(e) {
	}

	renderHistory() {
		const self = this;
		let history = localStorage.getItem('FourCornersHistory');
		history = JSON.parse(history) || {};
		let sortedTimestamps = Object.keys(history).sort(function(a, b) {
			return new Date(b.date) - new Date(a.date);
		});
		let states = [];
		sortedTimestamps.forEach(function (timestamp) {
			const savedState = history[timestamp];
			const dateCreated = new Date(Number(timestamp));
			const dateFormat = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
			const dateString = dateCreated.toLocaleDateString(self.props.lang, dateFormat);

			states.push(
				<div key={timestamp}
					className='saved-state row'>
					<div className='col col-6'>
						{dateString}
					</div>
				</div>
			);
		})

		return(
			<div className='saved-states'>
				{states}
			</div>
		);
	}


	render() {
		return (
			<React.Fragment>
				<div id='embed-import' className={this.state.activeTab ? 'opened' : ''}>
					
					<div id='popup-links'>

						<div className='popup-link'>
							<label>
								<span onClick={this.openPopup.bind(this)} data-tab='import'>
									Import code to edit
								</span>
								<div
									className='toggle-desc'
									data-tab='import'
									onClick={this.toggleDesc.bind(this)}
									onFocus={this.toggleDesc.bind(this)}>
									<div></div>
								</div>
							</label>
						</div>

						{/*<div className='popup-link'>
							<label>
								<span onClick={this.openPopup.bind(this)} data-tab='history'>
									View your history
								</span>
								<div
									className='toggle-desc'
									data-tab='history'
									onClick={this.toggleDesc.bind(this)}
									onFocus={this.toggleDesc.bind(this)}>
									<div></div>
								</div>
							</label>
						</div>*/}

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

						<div className={'tab-content'+(this.state.activeTab=='import'?' opened':'')}>

							<div className='content-block'>
								<form onSubmit={this.importCode.bind(this)}>
									{/*<Label strings={{label:'Import a Four Corners photo'}}/>*/}
									<legend>Import code to edit</legend>
									<div className='desc'>
										Paste the HTML code you previously generated on this page. Clicking import will update all fields of the current form and the preview.
									</div>
									<textarea
										name='import-code'
										className='form-elem'
										rows={5} />
									<div className='buttons-group'>
										<div className='button'
											onClick={this.closePopup.bind(this)}>
											Cancel
										</div>
										<input className='button'
											type='submit'
											value='Import'/>
									</div>
								</form>
							</div>

						</div>

						<div className={'tab-content'+(this.state.activeTab=='history'?' opened':'')}>

							<div className='content-block'>
								<legend>View your history</legend>
								<div className='desc'>
									Paste the HTML code you previously generated on this page. Clicking import will update all fields of the current form and the preview.
								</div>

								{this.renderHistory()}

								<div className='buttons-group'>
									<div className='button'
										onClick={this.closePopup.bind(this)}>
										Cancel
									</div>
								</div>
							</div>

						</div>

					</div>
				</div>
			</React.Fragment>
		);
	}
}

export default Popup;