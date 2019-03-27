import React from 'react';
import { render } from 'react-dom';
import isUrl from 'validator/lib/isUrl';

import i18n from '../../i18n.jsx';
import Schema from './schema.jsx';
import Fieldset from './fieldset.jsx';

const slugify = require('slugify');

class Form extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			mediaData: this.props.mediaData,
			formData: {
				authorship: {},
				backstory: {},
				imagery: {},
				links: {},
				opts: {},
				photo: {}
			},
		};
		this.translations = this.props.creator.acf;
	}

	componentDidMount() {
		
	}

	componentWillUnmount() {
		
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		if(this.props.formData != this.state.formData) {
			this.setState({
				formData: this.props.formData
			})
		}
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
		const setKey = nameArr[0];
		const fieldKey = nameArr[1];
		const subFieldKey = nameArr[2];
		if(!formData[setKey]) {return}
		if(subFieldKey) {
			if(!formData[setKey][fieldKey]){formData[setKey][fieldKey]={}}
			formData[setKey][fieldKey][subFieldKey] = value;
		} else {
			formData[setKey][fieldKey] = value;
		}
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
		let fieldsets = [];
		let lang = this.state.lang;
		const setKeys = Object.keys(Schema);
		const translations = this.translations;
		if(!translations) {return}
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

					} else if(field.type=='checkbox') {

						if(field.fields&&field.fields.length) {
							Schema[setKey].fields[fieldKey].options = {};
							for(let optKey of field.fields) {
								Schema[setKey].fields[fieldKey].options[optKey] = {
									label: translations[[setKey, fieldKey, optKey, 'label'].join('_')],
									desc: translations[[setKey, fieldKey, optKey, 'desc'].join('_')]
								};
							}
						}

					} else if(field.type=='blocks') {

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
							if(subField.type == 'select') {
								const opts = translations[[setKey, fieldKey, subFieldKey, 'options'].join('_')];
								Schema[setKey].fields[fieldKey].fields[subFieldKey].options = opts;
							}
						}

					} else if(field.type=='toggle') {

						const objKey = 'types';
						const subFields = Schema[setKey].fields[fieldKey].fields;
						const subFieldKeys = Object.keys(subFields);
						for(let subFieldKey of subFieldKeys) {
							const subField = subFields[subFieldKey];

							Schema[setKey].fields[fieldKey].fields[subFieldKey].strings = {
								label: translations[[setKey, fieldKey, subFieldKey, 'label'].join('_')],
								placeholder: translations[[setKey, fieldKey, subFieldKey, 'placeholder'].join('_')],
								desc: translations[[setKey, fieldKey, subFieldKey, 'desc'].join('_')]
							}

							if(subField.type == 'group') {
								const subFields = this.buildGroup(Schema, setKey, fieldKey, subFieldKey);
								Schema[setKey].fields[fieldKey].fields[subFieldKey].fields = subFields;
							}
							else if(subField.type == 'select') {
								const opts = translations[[setKey, fieldKey, subFieldKey, 'options'].join('_')];
								Schema[setKey].fields[fieldKey].fields[subFieldKey].options = opts;
							}
						}

					} else if(field.type=='group') {
						const subFields = this.buildGroup(Schema, setKey, fieldKey);
						Schema[setKey].fields[fieldKey].fields = subFields;
					}
				}
			}
			fieldsets.push(
				<Fieldset
					key={setKey}
					setKey={setKey}
					data={Schema[setKey]}
					formData={this.state.formData}
					imgLoaded={this.props.imgLoaded}
					onChange={this.onChange.bind(this)}
					activeCorner={this.props.activeCorner}
					activeFieldset={this.props.activeFieldset}
					sendActiveCorner={this.props.sendActiveCorner}
					sendActiveFieldset={this.props.sendActiveFieldset}
					sendMediaData={this.props.sendMediaData} />
			);
		}
		return fieldsets;
	}

	buildGroup(schema, setKey, fieldKey, subFieldKey) {
		let fieldPath = [setKey, fieldKey].join('_')
		let groupFields = schema[setKey].fields[fieldKey].fields;
		if(subFieldKey) {
			groupFields = groupFields[subFieldKey].fields;
			fieldPath = [fieldPath, subFieldKey].join('_');
			// return;
		}
		const translations = this.translations;
		const objKey = 'fields';
		const groupFieldKeys = Object.keys(groupFields);
		for(let groupFieldKey of groupFieldKeys) {
			groupFields[groupFieldKey].strings = {
				label: translations[[fieldPath, groupFieldKey, 'label'].join('_')],
				placeholder: translations[[fieldPath, groupFieldKey, 'placeholder'].join('_')],
				desc: translations[[fieldPath, groupFieldKey, 'desc'].join('_')]
			}
		}
		return groupFields;
	}

	render() {
		return (
			<div className='col-inner'>
				<div id='forms' className='col-content'>

					<div className='content-block'>
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