import React from 'react'

import i18n from '/src/utils/i18n'
import Form from './components/Form'
import Preview from './components/Preview'
import Popup from './components/Popup'

import './style.scss';

class Creator extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			// creator: {},
			page: siteSettings.current,
			// lang: 'en',
			// imgLoaded: false,
			formData: {
				authorship: {},
				backstory: {},
				imagery: {},
				links: {},
				opts: {},
				photo: {}
			},
			mediaData: {
				imagery: [],
				backstory: []
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
	}

	clearFormData() {
		this.setState({
			formData: {}
		});
	}

	setFormData(newData) {
		if(!newData){return}
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

	setMediaData(newMediaData) {
		const mediaData = Object.assign(this.state.mediaData, newMediaData);
		this.setState({
			mediaData: mediaData
		});
}
	
	setActiveCorner(slug = '') {
		this.setState({
			activeCorner: slug
		});
	}

 	setActiveFieldset(slug = '') {
		this.setState({
			activeFieldset: slug
		});
	}

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
				<div className='max-width'>
					<div className='row' id='head-cols'>
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
							: ''}
						</div>
					</div>
					<div className='row' id='form-cols'>
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