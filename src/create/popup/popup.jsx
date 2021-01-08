import React from 'react';
import { render } from 'react-dom';
import ReactDOMServer from 'react-dom/server';
import ReactHtmlParser from 'react-html-parser';
import i18n from '../../i18n.jsx';
import Label from '../form/label.jsx';
import Import from './import.jsx';
import History from './history.jsx';
import Schema from '../form/schema.jsx';

const parse = require('html-react-parser');
const slugify = require('slugify');

class Popup extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			activeDesc: null,
			activeTab: null
		};
		this.strings = this.props.creator.strings || {};
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
		const self = this;
		try {
			const embedElem = parse(value);
			let embedChildren = embedElem.props.children, dataString, imgElem, scriptElem;

			if(!Array.isArray(embedChildren)) {
				embedChildren = [embedChildren]
			}

			embedChildren.forEach((elem) => {
				if(elem.type === 'script') {
					scriptElem = elem;
				}
				if(elem.type === 'img') {
					imgElem = elem;
				}
			});

			if(scriptElem) {
				dataString = scriptElem.props.dangerouslySetInnerHTML.__html;
			} else {
				dataString = embedElem.props['data-fc'];
			}

			let formData = JSON.parse(dataString);

			if(imgElem) {
				const photoSrc = imgElem.props.src;
				formData = Object.assign(formData, { photo: { src: photoSrc } });
			}

			self.props.sendFormData(formData);
			Object.keys(Schema).forEach(function(setKey) {
				const setSchema = Schema[setKey];
				setTimeout(function() {
					self.updateFieldsData([setKey], setSchema, formData);
				}, 100);
			});
			self.closePopup();
		} catch(e) {
			self.setState({
				error: "The embed code is not valid."
			});
			console.warn(e);
		}
	}

	updateFieldsData(keys, schema, formData) {
		const self = this;
		const fieldsSchema = schema.fields;

		const setKey = keys[0];
		const setData = formData[setKey];
		if(!setData){
			return;
		}
		Object.keys(fieldsSchema).forEach(function(fieldKey) {
			const fieldSchema = fieldsSchema[fieldKey];
			const fieldData = setData[fieldKey];
			let newKeys = keys.slice(0);
			newKeys.push(fieldKey);
			switch(fieldSchema.type) {
				case 'text':
					self.updateFieldData(newKeys, fieldData);
					break;
				case 'textarea':
					self.updateFieldData(newKeys, fieldData);
					break;
				case 'select':
					self.updateFieldData(newKeys, fieldData);
					break;
				case 'blocks':
					self.updateFieldData(newKeys, fieldData);
					break;
				case 'group':
					// self.updateFieldsData(field, data);
					break;
				case 'checkbox':
					break;
				case 'toggle':
					break;
				default:
					break;
			}
		});
	}

	updateFieldData(keys, fieldData) {
		let fieldName, field;
		switch(typeof fieldData) {
			case 'object':
				if(Array.isArray(fieldData)) {
					fieldData.forEach(function(fieldObj) {
						const index = fieldObj.index;
						delete fieldObj.index;
						Object.keys(fieldObj).forEach(function(key) {
							const value = fieldObj[key];
							let newKeys = keys.slice(0);
							newKeys.push(key, index);
							fieldName = newKeys.join('_');
							field = document.getElementsByName(fieldName)[0];
							if(field) { field.value = value; }
						});
					});
				}
				break;
			case 'string':
				fieldName = keys.join('_');
				field = document.getElementsByName(fieldName)[0];
				if(field) { field.value = fieldData; }
				break;
			default:
				break;
		}
	}

	updateFieldValue() {

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
								error={this.state.error}
								warn={this.state.warn}
								closePopup={this.closePopup.bind(this)}
								clearFormData={this.props.clearFormData.bind(this)}
								updateFormData={this.updateFormData.bind(this)}/>
						</div>

						<div className={'content-block tab-content'+(this.state.activeTab=='history'?' opened':'')}>
							<History
								strings={this.strings}
								error={this.state.error}
								warn={this.state.warn}
								timestamp={this.props.timestamp}
								saveHistory={this.props.saveHistory}
								toggleSave={this.props.toggleSave.bind(this)}
								closePopup={this.closePopup.bind(this)}
								clearFormData={this.props.clearFormData.bind(this)}
								updateFormData={this.updateFormData.bind(this)}/>
						</div>

					</div>
				</div>
			</React.Fragment>
		);
	}
}

export default Popup;