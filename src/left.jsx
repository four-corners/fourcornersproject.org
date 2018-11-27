import React from 'react';
import { render } from 'react-dom';
import Form from 'react-jsonschema-form';

import i18n from './i18n.jsx';
import Schema from './schema.jsx';
import uiSchema from './ui-schema.jsx';

class Left extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			formData: {}
		};
		this.onChange = this.onChange.bind(this);
	}

	componentDidMount() {

	}

	componentWillUnmount() {
		
	}

	componentDidUpdate() {

	}

	onFocus(id, val) {
		const slug = id.split('_')[1];
		this.setState({activeCorner: slug});
		this.props.sendActiveCorner(slug);
	}

	onChange(e) {
		const formData = Object.assign(this.props.formData, e.formData);
		this.props.sendFormData(formData);
		// this.props.sendFormData(formData);
	}

	onError(e) {
		// console.log('Error', e);
	}

	translateSchema(schema) {
		let lang = this.state.lang;
		const schemaObjs = Object.assign({}, schema);
		const groupKeys = Object.keys(schema.properties);
		const creator = this.props.creator;
		const fields = creator.acf;
		for(let groupKey of groupKeys) {
			let schemaObj = schema.properties[groupKey];
			const titleKey = [groupKey, 'title'].join('_');
			schemaObj.title = fields[titleKey];
			const descKey = [groupKey, 'desc'].join('_');
			schemaObj.description = fields[descKey];
		  const props = schemaObj.properties;
		  if(props) {
			  const propKeys = Object.keys(props);
				for (let propKey of propKeys) {
					//Text fields
					const fieldTitleKey = [groupKey, propKey, 'label'].join('_');
					if(fields.hasOwnProperty(fieldTitleKey)) {
						const fieldTitle = fields[fieldTitleKey];
						schemaObj.properties[propKey].title = fieldTitle;
					}
					const fieldDescKey = [groupKey, propKey, 'desc'].join('_');
					if(fields.hasOwnProperty(fieldDescKey)) {
						const fieldDescLabel = fields[fieldDescKey];
						schemaObj.properties[propKey].description = fieldDescLabel;
					}
					//Select fields
					if(props[propKey].hasOwnProperty('enum')) {
						const fieldOptionsKey = [groupKey, propKey, 'options'].join('_');
						const fieldOptions = fields[fieldOptionsKey];
						schemaObj.properties[propKey].enum = [];
						if( fieldOptions ) {
							for (let fieldOption of fieldOptions) {
								const fieldValue = fieldOption.label+(fieldOption.desc ? ': '+fieldOption.desc : '');
								schemaObj.properties[propKey].enum.push(fieldValue);
							}
						}
					}
					//Repeater fields
					if(props[propKey].type == 'array') {
						const nestedProps = props[propKey].items.properties;
						const nestedPropKeys = Object.keys(nestedProps);
						for (let nestedProp of nestedPropKeys) {
							const nestedPropKey = [groupKey, nestedProp, 'label'].join('_');
							if(fields.hasOwnProperty(nestedPropKey)) {
								const nestedPropLabel = fields[nestedPropKey];
								schemaObj.properties[propKey].items.properties[nestedProp].title = nestedPropLabel;
							}
						}
					}
				}
			}
			schemaObjs.properties[groupKey] = schemaObj;
		}
		return schemaObjs;
	}

	renderForm() {
		return (
			<div className='col-inner'>
				<div id='forms'>
					<Form
						schema={this.translateSchema(Schema)}
						uiSchema={uiSchema}
						formData={this.props.formData}
						onFocus={this.onFocus.bind(this)}
						onChange={this.onChange}
						onError={this.onError}>
						<button type='submit' hidden/>
						<button type='button' className='btn'>Add content in another language</button>
		      </Form>
				</div>
			</div>
		);
	}

	render() {
		return (
			<React.Fragment>
				{this.renderForm()}
			</React.Fragment>
		);
	}
}

export default Left;