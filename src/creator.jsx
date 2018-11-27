import React from 'react';
import { render } from 'react-dom';
import Form from 'react-jsonschema-form';

import i18n from './i18n.jsx';
import Header from './header.jsx';
import Left from './left.jsx';
import Right from './right.jsx';

class Creator extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			creator: {},
			lang: 'en',
			formData: {},
			activeCorner: null
		};
		this.onLanguageChanged = this.onLanguageChanged.bind(this);
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

	setFormData(formData) {
		this.setState({
			formData: formData
		});
  }
	
  setActiveCorner(slug) {
		this.setState({
			activeCorner: slug
		});
  }

	renderLeft() {
		return (
			<Left
				lang={this.state.lang}
				creator={this.state.creator}
				formData={this.state.formData}
				sendActiveCorner={this.setActiveCorner.bind(this)}
				sendFormData={this.setFormData.bind(this)} />
		);
	}

	renderRight() {
		return (
			<Right
				lang={this.state.lang}
				creator={this.state.creator}
				formData={this.state.formData}
				activeCorner={this.state.activeCorner} />
		);
	}

	render() {
		let lang = this.state.lang;
		return (
			// <div id='creator' className='container'>
			<div id='creator'>
				<div className='row' data-sticky-container>
					<div className='col-12 col-sm-6 left'>
						{this.state.creator && this.state.creator.ID ? this.renderLeft() : null}
					</div>
					<div className='col-12 col-sm-6 right'>
						{this.state.creator && this.state.creator.ID ? this.renderRight() : null}
					</div>
				</div>
			</div>
		);
	}
}

export default Creator;