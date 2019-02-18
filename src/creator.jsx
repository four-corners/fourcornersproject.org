import React from 'react';
import { render } from 'react-dom';
// import SchemaForm from 'react-jsonschema-form';

import i18n from './i18n.jsx';
import Header from './header.jsx';
import Form from './form/form.jsx';
import Preview from './preview/preview.jsx';

class Creator extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			creator: {},
			lang: 'en',
			formData: {
				'imagery':{},
				'links':{},
				'authorship':{},
				'backstory':{}
			},
			imgData: {},
			mediaData: {imagery:[]},
			activeCorner: null,
			activeFieldset: null
		};
		this.corners = ['imagery','links','authorship','backstory'];
		this.onLanguageChanged = this.onLanguageChanged.bind(this);
		this.outputRef = React.createRef();
	}

	componentDidMount() {
		let that = this;
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
				if(!res.length) {return false}
				that.setState({ creator: res[0] });
			})
			.catch(function(err) {
				console.log(err);
			});
		i18n.on('languageChanged', this.onLanguageChanged);
	}

	componentWillUnmount() {
		i18n.off('languageChanged', this.onLanguageChanged);
	}

	componentDidUpdate() {
		// console.log(this.state.activeCorner);
	}

	onLanguageChanged(lang) {
		this.setState({
			lang: lang
		});
	}

	setFormData(newData) {
		this.setState({
			formData: newData
		});
  }

  setMediaData(mediaData) {
		this.setState({
			mediaData: mediaData
		});
  }
	
  setActiveCorner(slug) {
  	if(!slug) {
  		slug = '';
  	}
		this.setState({
			activeCorner: slug
		});
  }

  setActiveFieldset(slug) {
  	if(!slug) {
  		slug = '';
  	}
		this.setState({
			activeFieldset: slug
		});
  }

  setImgData(imgData) {
  	const newImgData = imgData;
  	this.setState({
  		imgData: newImgData
  	});
  }

	renderFormCol() {
		return (
			<Form
				lang={this.state.lang}
				creator={this.state.creator}
				formData={this.state.formData}
				activeCorner={this.state.activeCorner}
				activeFieldset={this.state.activeFieldset}
				sendActiveCorner={this.setActiveCorner.bind(this)}
				sendActiveFieldset={this.setActiveFieldset.bind(this)}
				sendFormData={this.setFormData.bind(this)}
				sendMediaData={this.setMediaData.bind(this)}
				sendImgData={this.setImgData.bind(this)} />
		);
	}

	renderPreviewCol() {
		return (
			<Preview
				lang={this.state.lang}
				creator={this.state.creator}
				formData={this.state.formData}
				mediaData={this.state.mediaData}
				imgData={this.state.imgData}
				activeCorner={this.state.activeCorner}
				activeFieldset={this.state.activeFieldset}
				sendActiveCorner={this.setActiveCorner.bind(this)}
				sendActiveFieldset={this.setActiveFieldset.bind(this)} />
		);
	}

	render() {
		let lang = this.state.lang;
		const ready = this.state.creator && this.state.creator.ID;
		return (
			<main id='creator'>

				{/*<div className='max-width'>
					<div className='row'>

						<div className='col col-12 col-sm-6 left col-creator'>
							<h2>Create now</h2>
							<h4>Use our creator tool to quickly build a Four Corners to embed on your website</h4>
						</div>

						<div className='col col-12 col-sm-6 left col-plugins'>
							<h2>Create later</h2>
							<h4>Install Four Corners onto your website or CMS</h4>
							<h5>Coming soon</h5>
						</div>

						<div className='col col-12 col-partner'>
							<h4>Would you like to integrate Four Corners into your publishing platform. Contact us!</h4>
						</div>

					</div>
				</div>*/}

				<div className='max-width'>
					<div className='row' data-sticky-container>

						<div className='col col-12 col-sm-6 col-md-5 left col-form'>
							{ ready ? this.renderFormCol() : null }
						</div>

						<div className='col col-12 col-sm-6 col-md-7 right col-preview'>
							{ this.renderPreviewCol() }
						</div>
					
					</div>
				</div>

			</main>
		);
	}
}

export default Creator;