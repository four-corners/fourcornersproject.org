import React from 'react';
import { render } from 'react-dom';
import SchemaForm from 'react-jsonschema-form';
import isUrl from 'validator/lib/isUrl';

import i18n from '../i18n.jsx';
import Schema from './schema.jsx';
import Fieldset from './fieldset.jsx';

// import uiSchema from './ui-schema.jsx';
// import validate from './validate.jsx';
// import CustomSelectWidget from './CustomSelectWidget.jsx';
// import CustomToggleWidget from './CustomToggleWidget.jsx';
// import CustomUploadWidget from './CustomUploadWidget.jsx';
// import ArrayField from './ArrayField.jsx';

class Form extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			mediaData: this.props.mediaData,
			formData: {
				'photo':{},
				'authorship':{},
				'backstory':{},
				'context':{},
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
		this.props.sendActiveFieldset(slug)
	}

	onBlur(id) {

	}

	onChange(name, value) {
		const formData = this.state.formData;
		const nameArr = name.split('_');
		let fieldsetSlug = nameArr[0];
		let fieldSlug = nameArr[1];
		let blockFieldSlug = '';
		if(!formData[fieldsetSlug]) {return}
		formData[fieldsetSlug][fieldSlug] = value;
		this.setState({
			formData: formData
		});
		this.props.sendFormData(formData);
		// this.props.sendActiveCorner(fieldsetSlug);
		// this.props.sendActiveFieldset(fieldsetSlug);
	}

	onToggle(e) {
		
	}

	onError(e) {
		// console.log('Error', e);
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
			Schema[setKey].text = {
				title: translations[[setKey, 'title'].join('_')],
				desc: translations[[setKey, 'desc'].join('_')]
			}
			for(let fieldKey of fieldKeys) {
				let field = fields[fieldKey];
				if(field) {
					Schema[setKey].fields[fieldKey].text = {
						label: translations[[setKey, fieldKey, 'label'].join('_')],
						desc: translations[[setKey, fieldKey, 'desc'].join('_')],
						placeholder: translations[[setKey, fieldKey, 'placeholder'].join('_')],
					}
					if(field.type=='select') {
						const opts = translations[[setKey, fieldKey, 'options'].join('_')];
						Schema[setKey].fields[fieldKey].options = opts;
					}
					if(field.type=='blocks') {

						const blockFields = Schema[setKey].fields[fieldKey].fields;
						const blockFieldKeys = Object.keys(blockFields);
						for(let blockFieldKey of blockFieldKeys) {
							const blockOpts = translations[[setKey, fieldKey, blockFieldKey, 'opts'].join('_')];
							if(blockOpts) {
								Schema[setKey].fields[fieldKey].fields[blockFieldKey].opts = blockOpts;
							}
							Schema[setKey].fields[fieldKey].fields[blockFieldKey].text = {
								label: translations[[setKey, fieldKey, blockFieldKey, 'label'].join('_')],
								placeholder: translations[[setKey, fieldKey, blockFieldKey, 'placeholder'].join('_')],
								desc: translations[[setKey, fieldKey, blockFieldKey, 'desc'].join('_')]
							}
						}
					}
				}
			}
			const fieldset = <Fieldset
				id={setKey}
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