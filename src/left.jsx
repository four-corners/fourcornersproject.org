import React from 'react';
import { render } from 'react-dom';
import Form from 'react-jsonschema-form';
import isUrl from 'validator/lib/isUrl';

import i18n from './i18n.jsx';
import Schema from './form/schema.jsx';
import uiSchema from './form/ui-schema.jsx';
import validate from './form/validate.jsx';
import CustomSelectWidget from './form/CustomSelectWidget.jsx';

class Left extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			mediaData: this.props.mediaData
		};
		this.onChange = this.onChange.bind(this);
		this.onBlur = this.onBlur.bind(this);
		this.onFocus = this.onFocus.bind(this);
	}

	componentDidMount() {

	}

	componentWillUnmount() {
		
	}

	componentDidUpdate(prevProps, prevState, snapshot) {

	}

	onFocus(id) {
		const slug = id.split('_')[1];
		this.setState({activeCorner: slug});
		this.props.sendActiveCorner(slug);
	}

	onBlur(id) {

	}

	getMediaData(url,type,corner,index) {
		if(!isUrl(url)) {return}
		const that = this;
		const uri = encodeURIComponent(url);
		const mediaData = Object.assign({},this.state.mediaData);
		let req = '';
		switch(type) {
			case 'youtube':
				req = 'https://www.youtube.com/oembed?url='+uri;
				break;
			case 'vimeo':
				req = 'https://vimeo.com/api/oembed.json?url='+uri;
				break;
			case 'soundcloud':
				req = 'https://soundcloud.com/oembed?format=json&url='+uri;
				break;
			default:
				return false;
				break;
		}
		fetch(req)
			.then(res => {
				if (!res.ok) {throw Error(res.statusText)}
				return res.json();
			})
			.then(res => {
				mediaData[corner][index] = {
					html:res.html,
					width: res.width,
					height: res.height
				}
				this.setState({mediaData: mediaData});
				this.props.sendMediaData(mediaData);
			})
			.catch(function(err) {
				console.log(err);
			});
	}

	onChange(e) {
		const formData = e.formData;
		const formDataKeys = Object.keys(formData);
		const mediaData = Object.assign({},this.props.mediaData);
		for(let key of formDataKeys) {
			if(formData[key]&&formData[key].media) {
				for(let index of formData[key].media.keys()) {
					const media = formData[key].media[index];
					const url = media.url;
					const type = media.type;
					if(!mediaData[key]){mediaData[key]=[]}
					if(!mediaData[key][index]) {
						mediaData[key][index] = ''
						this.setState({mediaData: mediaData});
					}
					if(url&&type){this.getMediaData(url,type,key,index)}
				}
			}
		}
		const newData = Object.assign(this.props.formData, formData);
		this.props.sendFormData(e.formData);
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
						schemaObj.properties[propKey].enumNames = [];
						// schemaObj.properties[propKey].enum.push('default');
						// schemaObj.properties[propKey].enumNames.push('Select one');
						if( fieldOptions ) {
							for(let fieldOption of fieldOptions) {
								const fieldValue = fieldOption.label+(fieldOption.desc ? ': '+fieldOption.desc : '');
								schemaObj.properties[propKey].enum.push(fieldValue);
								schemaObj.properties[propKey].enumNames.push(fieldValue);
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
		const widgets = {
			customSelectWidget: CustomSelectWidget
		}

		return (
			<div className='col-inner'>
				<div id='forms' className='half-max-width'>
					<Form
						schema={this.translateSchema(Schema)}
						uiSchema={uiSchema}
						widgets={widgets}
						formData={this.props.formData}
						validate={validate}
						liveValidate={true}
						onFocus={this.onFocus}
						onBlur={this.onBlur}
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