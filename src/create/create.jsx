import React from 'react';
import { render } from 'react-dom';

import i18n from '../i18n.jsx';
import Header from '../header.jsx';
import Form from './form/form.jsx';
import Preview from './preview/preview.jsx';
import Popup from './popup/popup.jsx';

class Creator extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			// creator: {},
			page: JSON.parse(siteSettings.current),
			lang: 'en',
			// imgLoaded: false,
			formData: {
				authorship:{},
				backstory:{},
				imagery:{},
				links:{},
				opts: {},
				photo: {}
			},
			mediaData: {
				imagery:[],
				backstory:[]
			},
			activeCorner: null,
			activeFieldset: 'photo',
			saveHistory: true
		};
		this.timestamp = Date.now();
		this.corners = ['imagery','authorship','backstory','links'];
		this.outputRef = React.createRef();
	}

	componentDidMount() {
		// let that = this;
		// let lang = i18n.language;
		// let req = siteSettings.url.api+'page?slug=create&lang='+lang;
		// fetch(req)
		// 	.then(function(res) {
		// 		if (!res.ok) {
		// 			throw Error(res.statusText);
		// 		}
		// 		return res.json();
		// 	})
		// 	.then(function(res) {
		// 		that.setState({ creator: res });
		// 	})
		// 	.catch(function(err) {
		// 		console.warn(err);
		// 	});

		const settings = localStorage.getItem('FourCornersSettings');
		let settingsObj = JSON.parse(settings) || {};
		const saveHistory = settingsObj.saveHistory;
		if(typeof saveHistory == 'boolean') {
			this.setState({
				saveHistory: saveHistory
			})
		} else {
			settingsObj.saveHistory = this.state.saveHistory;
			const settingsStr = JSON.stringify(settingsObj);
			localStorage.setItem('FourCornersSettings', settingsStr);
		}

		i18n.on('languageChanged', this.onLanguageChanged);
	}

	componentWillUnmount() {
		i18n.off('languageChanged', this.onLanguageChanged);
	}

	onLanguageChanged(lang) {
		this.setState({
			lang: lang
		});
	}

	clearFormData() {
		this.setState({
			formData: {}
		});
	}

	setFormData(newData) {
		if(!newData){return}
		// this.loadImage(newData.photo);
		this.setState({
			formData: newData
		});

		if(!this.state.saveHistory) {return}
		const history = localStorage.getItem('FourCornersHistory');
		const historyObj = JSON.parse(history) || {};
		let sortedHistory = Object.keys(historyObj).sort(function(a, b) {
			return b - a;
		});

		sortedHistory.forEach(function(timestamp, i) {
			if(i >= 10) {
				delete historyObj[timestamp];
			}
		});

		const objIsObj = historyObj && typeof historyObj == 'object' && !Array.isArray(historyObj);
		let newHistory = objIsObj ? historyObj : {};
		newHistory[this.timestamp] = {
			lang: this.state.lang,
			dateCreated: new Date(),
			formData: newData
		};
		localStorage.setItem('FourCornersHistory', JSON.stringify(newHistory));
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

  setActiveFieldset(slug = '') {
		this.setState({
			activeFieldset: slug
		});
  }

 //  loadImage(photo) {
	// 	let pseudoImg = new Image();
	// 	pseudoImg.onload = (e) => { 
	// 		this.setState({
	//   		imgLoaded: true
	//   	});
	// 	}
	// 	pseudoImg.onerror = (e) => {
	// 		this.setState({
	//   		imgLoaded: false
	//   	});
	// 	}
	// 	if(photo && photo.src) {
	// 		pseudoImg.src = photo.src;
	// 	}
	// }

	toggleSave() {
		const newVal = !this.state.saveHistory;
		const settings = localStorage.getItem('FourCornersSettings');
		let settingsObj = JSON.parse(settings);
		settingsObj.saveHistory = newVal;
		const settingsStr = JSON.stringify(settingsObj);
		localStorage.setItem('FourCornersSettings', settingsStr);
		this.setState({
			saveHistory: newVal
		});
	}

	renderFormCol() {
		return (
			<Form
				lang={this.state.lang}
				creator={this.state.page}
				formData={this.state.formData}
				// imgLoaded={this.state.imgLoaded}
				activeCorner={this.state.activeCorner}
				activeFieldset={this.state.activeFieldset}
				sendActiveCorner={this.setActiveCorner.bind(this)}
				sendActiveFieldset={this.setActiveFieldset.bind(this)}
				sendFormData={this.setFormData.bind(this)}
				sendMediaData={this.setMediaData.bind(this)} />
		);
	}

	renderPreviewCol() {
		return (
			<Preview
				lang={this.state.lang}
				creator={this.state.page}
				formData={this.state.formData}
				mediaData={this.state.mediaData}
				// imgLoaded={this.state.imgLoaded}
				activeCorner={this.state.activeCorner}
				activeFieldset={this.state.activeFieldset}
				sendActiveCorner={this.setActiveCorner.bind(this)}
				sendActiveFieldset={this.setActiveFieldset.bind(this)} />
		);
	}

	render() {
		let lang = this.state.lang;
		const ready = this.state.page && this.state.page.ID;
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
					<div className='row'>
						<div className='col col-auto'>
							<h2>{this.state.page.post_title}</h2>
						</div>
						<div className='col'>
							{ready ?
								<Popup
									lang={this.state.lang}
									creator={this.state.page}
									timestamp={this.timestamp}
									saveHistory={this.state.saveHistory}
									toggleSave={this.toggleSave.bind(this)}
									clearFormData={this.clearFormData.bind(this)}
									sendFormData={this.setFormData.bind(this)} />
							: '' }
						</div>
					</div>
					<div className='row' data-sticky-container>
						<div className='col col-12 col-md-6 col-lg-5 left col-form'>
							{ ready ? this.renderFormCol() : null }
						</div>

						<div className='col col-12 col-md-6 col-lg-7 right col-preview'>
							{ this.renderPreviewCol() }
						</div>
					
					</div>
				</div>

			</main>
		);
	}
}

export default Creator;