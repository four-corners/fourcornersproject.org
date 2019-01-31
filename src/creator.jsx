import React from 'react';
import { render } from 'react-dom';
// import SchemaForm from 'react-jsonschema-form';

import i18n from './i18n.jsx';
import Header from './header.jsx';
import Form from './form/form.jsx';
import Embed from './embed/embed.jsx';

class Creator extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			creator: {},
			lang: 'en',
			formData: {
				'context':{},
				'links':{},
				'authorship':{},
				'backstory':{}
			},
			mediaData: {backstory:[]},
			activeCorner: null
		};
		this.corners = ['context','links','authorship','backstory'];
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

	getEmbedId(url, type) {
		const that = this;

		if(!url||!isUrl(url)){return}

		// let endpoint = '';
		// switch(type) {
		// 	case 'youtube':
		// 		endpoint = 'https://www.youtube.com/oembed';
		// 		break;
		// 	case 'vimeo':
		// 		endpoint = 'https://vimeo.com/api/oembed.json';
		// 		break;
		// 	case 'soundcloud':
		// 		endpoint = 'https://soundcloud.com/oembed';
		// 		break;
		// 	default:
		// 		return false;
		// 		break;
		// }
		// const callback = 'embedVideo';
	 //  let req = endpoint+'?url='+encodeURIComponent(url);
		// fetch(req)
		// 	.then(res => {
		// 		if (!res.ok) {throw Error(res.statusText)}
		// 		return res.json();
		// 	})
		// 	.then(res => {
		// 		console.log(that.state.formData);
		// 		console.log(res.video_id);

		// 		// that.setState({ creator: res[0] });
		// 	});
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
  	// else if(!this.corners.includes(slug)) {
  	// 	slug = this.state.activeCorner;
  	// }
		this.setState({
			activeCorner: slug
		});
  }

	renderFormCol() {
		return (
			<Form
				lang={this.state.lang}
				creator={this.state.creator}
				formData={this.state.formData}
				activeCorner={this.state.activeCorner}
				sendActiveCorner={this.setActiveCorner.bind(this)}
				sendFormData={this.setFormData.bind(this)}
				sendMediaData={this.setMediaData.bind(this)} />
		);
	}

	renderEmbedCol() {
		return (
			<Embed
				lang={this.state.lang}
				creator={this.state.creator}
				formData={this.state.formData}
				mediaData={this.state.mediaData}
				activeCorner={this.state.activeCorner}
				sendActiveCorner={this.setActiveCorner.bind(this)} />
		);
	}

	render() {
		let lang = this.state.lang;
		if(this.state.creator && this.state.creator.ID) {
			return (
				<main id='creator'>
					<div className='max-width'>
						<div className='row' data-sticky-container>
						{
							// <div className='col col-12 col-sm-6'>
							// 	<div className='col-content'>
							// 		<div className='intro-text desc'>
							// 		</div>
							// 	</div>
							// </div>
							// <div className='col col-12 col-sm-6'>
							// 	<div className='col-content'>
									
							// 	</div>
							// </div>
						}
							<div className='col col-12 col-sm-6 left col-embed'>
								<div className='desc'>
									Fill in the content for each of the Four Corners below. You can begin working on whichever corner that you prefer. Although it is not required to fill in information for all of the Four Corners, it is highly recommended for a better experience by the reader.  Only the corners that are utilized will appear to the viewer.
								</div>
								{this.renderEmbedCol()}
							</div>
							<div className='col col-12 col-sm-6 right col-form'>
								{this.renderFormCol()}
							</div>
						</div>
					</div>
				</main>
			);
		} else {
			return null;
		}
	}
}

export default Creator;