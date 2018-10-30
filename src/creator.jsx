import React, { Component } from 'react';
import { render } from 'react-dom';
import Form from 'react-jsonschema-form';

import Header from './header';
import i18n from './i18n.jsx';
import Schema from './schema.jsx';
// import Forms from './forms.jsx';

class Creator extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			creator: {},
			lang: 'en'
		};
		this.onLanguageChanged = this.onLanguageChanged.bind(this)
	}

	componentDidMount() {
		var that = this;
		var url = window.location.href.split('/');
		// var lang = url.pop() || url.pop();
		var lang = i18n.language;
		var req = SiteSettings.url.api + 'creators?lang=' + lang;
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
		 i18n.on('languageChanged', this.onLanguageChanged)
	}

	componentWillUnmount() {
		i18n.off('languageChanged', this.onLanguageChanged)
	}

	componentDidUpdate() {

	}

	onLanguageChanged(lang) {
		this.setState({
			lang: lang
		})
	}

	renderCreator() {
		let creator = this.state.creator;
		let fields = creator.acf;
		// console.log(fields);
		const schemaKeys = Object.keys(Schema);
		for (const schemaKey of schemaKeys) {
			let titleKey = [schemaKey, 'title'].join('_');
			let title = fields[titleKey];
			Schema[schemaKey].title = title;
		  let props = Schema[schemaKey].properties;
		  let propKeys = Object.keys(props);
			for (const propKey of propKeys) {
				let fieldTitleKey = [schemaKey, propKey, 'label'].join('_');
				if(fields.hasOwnProperty(fieldTitleKey)) {
					let fieldTitle = fields[fieldTitleKey];
					Schema[schemaKey].properties[propKey].title = fieldTitle;
				}
				let fieldDescKey = [schemaKey, propKey, 'desc'].join('_');
				if(fields.hasOwnProperty(fieldDescKey)) {
					Schema[schemaKey].properties[propKey].description = fields[fieldDescKey];
				}
				//Collect options for selector
				if(props[propKey].hasOwnProperty('enum')) {
					let fieldOptionsKey = [schemaKey, propKey, 'options'].join('_');
					let fieldOptions = fields[fieldOptionsKey];
					for (const fieldOption of fieldOptions) {
						let fieldValue = fieldOption.label+(fieldOption.desc ? ': '+fieldOption.desc : '');
						Schema[schemaKey].properties[propKey].enum.push(fieldValue);
					}
				}
				if(props[propKey].type == 'array') {
					
				}
			}
		}
		return (
			<div id='Forms'>
				<Form className='media' schema={Schema.media}
					onChange={console.log()}
					onSubmit={console.log()}
					onError={console.log()} />
				<Form className='links' schema={Schema.links}
					onChange={console.log()}
					onSubmit={console.log()}
					onError={console.log()} />
				<Form className='backstory' schema={Schema.backstory}
					onChange={console.log()}
					onSubmit={console.log()}
					onError={console.log()} />
				<Form className='copyright' schema={Schema.copyright}
					onChange={console.log()}
					onSubmit={console.log()}
					onError={console.log()} />
			</div>
		);
	}

	renderEmpty() {
		return (
			<h1>LOADING CREATOR</h1>
		);
	}

	render() {
		let lang = this.state.lang
		return (
			<div className='container' id='creator'>
				{this.state.creator.ID ? this.renderCreator() : this.renderEmpty()}
			</div>
		);
	}
}

export default Creator;