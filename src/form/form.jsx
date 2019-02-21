import React from 'react';
import { render } from 'react-dom';
import SchemaForm from 'react-jsonschema-form';
import isUrl from 'validator/lib/isUrl';

import i18n from '../i18n.jsx';
import Schema from './schema.jsx';
import Fieldset from './fieldset.jsx';

const slugify = require('slugify');

class Form extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			mediaData: this.props.mediaData,
			formData: {
				'authorship':{},
				'backstory':{},
				'imagery':{},
				'links':{},
				'opts':{}
			},
			imgSrc: null
		};
	}

	componentDidMount() {

	}

	componentWillUnmount() {
		
	}

	componentDidUpdate(prevProps, prevState, snapshot) {

	}

	onFocus(e) {
		const name = e.target.name;
		const slug = name.split('_')[0];
		this.props.sendActiveCorner(slug);
		this.props.sendActiveFieldset(slug);
	}

	onBlur(id) {

	}

	onChange(name, value) {
		const formData = this.state.formData;
		const nameArr = name.split('_');
		let fieldsetSlug = nameArr[0];
		let fieldSlug = nameArr[1];
		if(!formData[fieldsetSlug]) {return}
		formData[fieldsetSlug][fieldSlug] = value;
		this.setState({
			formData: formData
		});

		this.props.sendFormData(formData);
	}

	onToggle(e) {
		
	}

	onError(e) {
	}

	renderSchema() {
		let components = [];
		let lang = this.state.lang;
		const creator = this.props.creator;
		const translations = creator.acf;
		const setKeys = Object.keys(Schema);
		let translatedSchema = {};
		let fieldsets = [];
		for(let setKey of setKeys) {
			const fields = Schema[setKey].fields;
			const fieldKeys = Object.keys(fields);
			Schema[setKey].strings = {
				title: translations[[setKey, 'title'].join('_')],
				desc: translations[[setKey, 'desc'].join('_')]
			}
			for(let fieldKey of fieldKeys) {
				let field = fields[fieldKey];
				if(field) {
					Schema[setKey].fields[fieldKey].strings = {
						label: translations[[setKey, fieldKey, 'label'].join('_')],
						desc: translations[[setKey, fieldKey, 'desc'].join('_')],
						placeholder: translations[[setKey, fieldKey, 'placeholder'].join('_')],
					}
					if(field.type=='select') {
						const opts = translations[[setKey, fieldKey, 'options'].join('_')];
						Schema[setKey].fields[fieldKey].options = opts;
					}
					else if(field.type=='checkbox') {
						if(field.fields&&field.fields.length) {
							Schema[setKey].fields[fieldKey].options = {};
							for(let optKey of field.fields) {
								Schema[setKey].fields[fieldKey].options[optKey] = {
									label: translations[[setKey, fieldKey, optKey, 'label'].join('_')],
									desc: translations[[setKey, fieldKey, optKey, 'desc'].join('_')]
								};
							}
						}
					}
					else if(field.type=='blocks'||field.type=='toggle') {
						const objKey = 'types';
						const subFields = Schema[setKey].fields[fieldKey].fields;
						const subFieldKeys = Object.keys(subFields);
						for(let subFieldKey of subFieldKeys) {
							const subField = subFields[subFieldKey];
							const blockTypes = translations[[setKey, fieldKey, 'types'].join('_')];
							Schema[setKey].fields[fieldKey][objKey] = {};
							if(blockTypes) { for(let blockType of blockTypes) {
								let blockTypeSlug = blockType.slug || slugify(blockType.label,{lower:true});
								Schema[setKey].fields[fieldKey][objKey][blockTypeSlug] = blockType;
							} }
							Schema[setKey].fields[fieldKey].fields[subFieldKey].strings = {
								label: translations[[setKey, fieldKey, subFieldKey, 'label'].join('_')],
								placeholder: translations[[setKey, fieldKey, subFieldKey, 'placeholder'].join('_')],
								desc: translations[[setKey, fieldKey, subFieldKey, 'desc'].join('_')]
							}
							if(subField.type=='select') {
								const opts = translations[[setKey, fieldKey, subFieldKey, 'options'].join('_')];
								Schema[setKey].fields[fieldKey].fields[subFieldKey].options = opts;
							}
						}
					}
					else if(field.type=='group') {
						const objKey = 'fields';
						const subFields = Schema[setKey].fields[fieldKey].fields;
						const subFieldKeys = Object.keys(subFields);
						for(let subFieldKey of subFieldKeys) {
							const subFieldTypes = translations[[setKey, fieldKey, 'types'].join('_')];
							Schema[setKey].fields[fieldKey][objKey] = {};
							if(subFieldTypes) {
								subFieldTypes.forEach(function(subFieldType, subFieldIndex) {
									Schema[setKey].fields[fieldKey][objKey][subFieldIndex] = subFieldType;
								});
							}
							Schema[setKey].fields[fieldKey].fields[subFieldKey].strings = {
								label: translations[[setKey, fieldKey, subFieldKey, 'label'].join('_')],
								placeholder: translations[[setKey, fieldKey, subFieldKey, 'placeholder'].join('_')],
								desc: translations[[setKey, fieldKey, subFieldKey, 'desc'].join('_')]
							}
						}
					}
				}
			}
			const fieldset = <Fieldset
				setKey={setKey}
				data={Schema[setKey]}
				key={setKey}
				onChange={this.onChange.bind(this)}
				activeCorner={this.props.activeCorner}
				activeFieldset={this.props.activeFieldset}
				sendActiveCorner={this.props.sendActiveCorner}
				sendActiveFieldset={this.props.sendActiveFieldset}
				sendMediaData={this.props.sendMediaData}
				sendImgData={this.props.sendImgData} />;
			fieldsets.push(fieldset);
		}
		return fieldsets;
	}

	render() {
		return (
			<div className='col-inner'>
				<div id='forms' className='col-content'>
					<div className='desc'>
						{this.props.creator.post_content}
					</div>
					<form
						onFocus={this.onFocus.bind(this)}>
						{this.renderSchema()}
					</form>
				</div>
			</div>
		);
	}
}

export default Form;