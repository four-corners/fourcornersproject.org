import React from 'react';
import { render } from 'react-dom';
import ReactHtmlParser from 'react-html-parser';
import i18n from '../../i18n.jsx';
import Label from '../form/label.jsx';
import Import from './import.jsx';
import History from './history.jsx';
import Schema from '../form/schema.jsx';

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

	//NEEDS IMPROVEMENT
	// updateFormData(value) {
	// 	try {
	// 		const embedHtml = ReactHtmlParser(value)[0];
	// 		const embedChild = embedHtml.props.children[0];
	// 		const	dataString = embedHtml.props['data-fc'].replace(/\'/g, '"');
	// 		let formData = JSON.parse(dataString);
	// 		if(embedChild && embedChild.props.src) {
	// 			if(!formData.photo) {formData.photo = []}
	// 			formData.photo.src = embedChild.props.src;
	// 		}
	// 		Object.keys(formData).forEach(function(setKey) {
	// 			const setData = formData[setKey];
	// 			const setSchema = Schema[setKey];
	// 			if(typeof setData !== 'object'){return}
	// 			Object.keys(setData).forEach(function(fieldKey) {
	// 				const fieldData = setData[fieldKey];
	// 				const fieldSchema = setSchema.fields[fieldKey];
	// 				let field = document.getElementsByName(setKey+'_'+fieldKey)[0];
	// 				if(field) {
	// 					field.value = fieldData;
	// 					if(field.nodeName == 'SELECT') {
	// 						console.log(field, fieldData);
	// 						field.value = fieldData;
	// 					}
	// 				} else {
	// 					Object.keys(fieldData).forEach(function(subFieldKey) {
	// 						const subFieldData = fieldData[subFieldKey];
	// 						let subField;
	// 						if(fieldSchema.type === 'toggle' && subFieldKey !== 'type') {
	// 							const subFieldName = [setKey, fieldKey, fieldData.type, subFieldKey].join('_');
	// 							subField = document.getElementsByName(subFieldName)[0];
	// 						} else {
	// 							const subFieldName = [setKey, fieldKey, subFieldKey].join('_');
	// 							subField = document.getElementsByName(subFieldName)[0];
	// 						}
	// 						if(subField && subFieldData) {
	// 							subField.value = subFieldData;
	// 						}
	// 					});
	// 				}
	// 			});
	// 		});
	// 		this.props.sendFormData(formData);
			
	// 		this.closePopup();
	// 	} catch (e) {
	// 		console.warn(e);
	// 	}
	// }

	updateFormData(value) {
		const embedHtml = ReactHtmlParser(value)[0];
		if(!embedHtml){
			return
			//ERROR: Cannot import this photo.
		}
		const embedChild = embedHtml.props.children[0];
		const	dataString = embedHtml.props['data-fc'].replace(/\'/g, '"');
		let formData = JSON.parse(dataString);
		this.props.sendFormData(formData);
		const self = this;
		Object.keys(Schema).forEach(function(setKey) {
			const setSchema = Schema[setKey];
			setTimeout(function() {
				self.updateFieldsData([setKey], setSchema, formData);
			}, 100);
		});
		this.closePopup();
	}

	updateFieldsData(keys, schema, formData) {
		const self = this;
		const fieldsSchema = schema.fields;

		const setKey = keys[0];
		const setData = formData[setKey];

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
		// console.log(keys, formData);
		// const setKey = keys[0];
		// const fieldKey = keys[1];
		let fieldName, field;
		// console.log(fieldData);
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
				// console.log(field);
				break;
			default:
				break;
		}

		// const fieldName = keys.join('_');
		// console.log(fieldName);
		// let field = document.getElementsByName(fieldName)[0];
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
								closePopup={this.closePopup.bind(this)}
								clearFormData={this.props.clearFormData.bind(this)}
								updateFormData={this.updateFormData.bind(this)}/>
						</div>

						<div className={'content-block tab-content'+(this.state.activeTab=='history'?' opened':'')}>
							<History
								strings={this.strings}
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