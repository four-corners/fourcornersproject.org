import React from 'react';
import { render } from 'react-dom';
import Form from 'react-jsonschema-form';

import Header from './header.jsx';
import Embed from './embed.jsx';
import i18n from './i18n.jsx';
import Schema from './schema.jsx';
import uiSchema from './ui-schema.jsx';
// import Forms from './forms.jsx';

class Creator extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			creator: {},
			lang: 'en',
			formData: {}
		};
		this.onLanguageChanged = this.onLanguageChanged.bind(this);
		this.onChange = this.onChange.bind(this);
		this.outputRef = React.createRef();
	}

	componentDidMount() {
		let that = this;
		let url = window.location.href.split('/');
		let lang = i18n.language;
		let req = SiteSettings.url.api + 'creators?lang=' + lang;
		fetch(req)
			.then(function(res) {
				if (!res.ok) {
					throw Error(res.statusText);
				}
				return res.json();
			})
			.then(function(res) {
				that.setState({ creator: res[0] });
			});
		i18n.on('languageChanged', this.onLanguageChanged);
	}

	componentWillUnmount() {
		i18n.off('languageChanged', this.onLanguageChanged);
	}

	componentDidUpdate() {

	}

	onLanguageChanged(lang) {
		this.setState({
			lang: lang
		});
	}

	translateSchema(schema) {
		const schemaObjs = Object.assign({}, schema);
		const groupKeys = Object.keys(schema.properties);
		for(let groupKey of groupKeys) {
			let schemaObj = schema.properties[groupKey];
			const creator = this.state.creator;
			const fields = creator.acf;
			const titleKey = [groupKey, 'title'].join('_');
			const title = fields[titleKey];
		  const props = schemaObj.properties;
		  schemaObj.title = title;
		  if(props) {
			  const propKeys = Object.keys(props);
				for (let propKey of propKeys) {
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
					//Collect options for selector
					if(props[propKey].hasOwnProperty('enum')) {
						const fieldOptionsKey = [groupKey, propKey, 'options'].join('_');
						const fieldOptions = fields[fieldOptionsKey];
						if( fieldOptions ) {
							for (let fieldOption of fieldOptions) {
								const fieldValue = fieldOption.label+(fieldOption.desc ? ': '+fieldOption.desc : '');
								schemaObj.properties[propKey].enum.push(fieldValue);
							}
						}
					}
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

	renderCreator() {
		return (
			<div id='forms'>
				<Form
					schema={this.translateSchema(Schema)}
					uiSchema={uiSchema}
					formData={this.state.formData}
					onChange={this.onChange}
					onSubmit={this.onSubmit}
					onError={this.onError}>
					<button type='submit' hidden/>
					<button type='button' className='btn'>Add content in another language</button>
	      </Form>
			</div>
		);
	}

	renderEmbed() {
		return (
			<Embed formData={this.state.formData} lang={this.state.lang} />
		);
	}

	renderEmpty() {
		return (
			<div className='loader'/>
		);
	}

	onChange(e) {
		const formData = Object.assign(this.state.formData, e.formData);
		this.setState({formData: formData});
	}

	onSubmit(e) {
		// console.log('Submit', e);
	}

	onError(e) {
		// console.log('Error', e);
	}

	render() {
		let lang = this.state.lang;
		return (
			<div id='creator' className='container'>
				<div className='row'>
					<div className='col-6'>
						{this.state.creator.ID ? this.renderCreator() : this.renderEmpty()}
					</div>
					<div className='col-6'>
						{this.state.creator.ID ? this.renderEmbed() : this.renderEmpty()}
					</div>
				</div>
			</div>
		);
	}
}

export default Creator;