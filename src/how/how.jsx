import React from 'react';
import { render } from 'react-dom';
import ReactHtmlParser from 'react-html-parser';
// import SchemaForm from 'react-jsonschema-form';

import i18n from '../i18n.jsx';
import Header from '../header.jsx';
import FourCorners from '../../assets/js/four-corners.min.js';

class How extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			lang: 'en',
			page: {},
			embeds: {},
			embedHtmls: {}
		};
		this.slugs = ['authorship', 'backstory', 'imagery', 'links'];
		this.onLanguageChanged = this.onLanguageChanged.bind(this);
	}

	componentDidMount() {
		let self = this;
		let lang = i18n.language;
		let req = SiteSettings.url.api+'page?slug=how&lang='+lang;
		fetch(req)
			.then(function(res) {
				if (!res.ok) {
					throw Error(res.statusText);
				}
				return res.json();
			})
			.then(function(res) {
				if(res) {
					self.setState({ page: res });
					self.initEmbeds();
				}
			});
		i18n.on('languageChanged', this.onLanguageChanged);
	}

	componentWillUnmount() {
		i18n.off('languageChanged', this.onLanguageChanged);
	}

	componentDidUpdate() {
		// let self = this;
		// setTimeout(function() {
		// 	const fourCorners = FourCorners.prototype.init({
		// 		cutline: false,
		// 		active: 'authorship'
		// 	});
		// 	// console.log(fourCorners);
		// });
	}

	onLanguageChanged(lang) {
		this.setState({
			lang: lang
		});
	}

	initEmbeds() {
		this.slugs.forEach((slug, i) => {
			if(this.state.page&&this.state.page.acf) {
				const fields = this.state.page.acf;
				const embedHtml = ReactHtmlParser(fields[slug+'_embed']);
				let embedHtmls = this.state.embedHtmls;
				embedHtmls[slug] = embedHtml;
				this.setState({
					embedHtmls: embedHtmls
				});
				const fourCorners = FourCorners.prototype.init({
					cutline: false,
					active: slug
				});

			}
		});
	}

	renderIntro() {
		let lang = this.state.lang;
		const page = this.state.page;
		const intro = (
			<div className='row'>
				<div className='col col-12 col-lg-6 left'>
					<div className='col-content'>
						<div className='content-block'>
							<h4>By using Four Corners you are able to add contextualizing information so that it is embedded into each of the four corners of your image. When a viewer hovers his or her mouse over the image, the Four Corners symbols appear and each corner is then clickable.</h4>
						</div>
						{/*page.post_content ?
						(<div className='content-block'>
							<h4>{ReactHtmlParser(page.post_content)}</h4>
						</div>) : ''*/}
					</div>
				</div>
				<div className='col col-12 col-lg-6 right'>
					<div className='col-content'>
						<div className='content-block'>
							<h4>You can create your own Four Corners image with our online form. This provides fields you can fill in with various types of text and media. Once you fill in the provided fields, it automatically generates an embeddable code that you can copy and paste into your site.</h4>
						</div>
					</div>
				</div>
			</div>
		);
		return intro;
	}

	renderRow(slug, i) {
		const side = i%2==0;
		const rowClass = 'row how-block'+(side?'':' reverse');
		const page = this.state.page;
		let rowData = {}
		let keys = ['title', 'desc', 'embed'];

		keys.forEach((key,i) => {
			if(page&&page.acf&&page.acf[slug+'_'+key]) {
				rowData[key] = ReactHtmlParser(page.acf[slug+'_'+key]);
			} else {
				rowData[key] = '';
			}
		});

		return (
			<div className={rowClass} key={i}>
				<div className="col col-12 col-md-5 left">
					<div className="col-content">
						<h2>{rowData.title}</h2>
						{rowData.desc}
					</div>
				</div>

				<div className="col col-12 col-md-7 right">
					<div className="col-content">
						<div className="embed-wrapper">
							{this.state.embedHtmls[slug]}
						</div>
					</div>
				</div>
			</div>
		);
	}

	render() {
		let lang = this.state.lang;
		const page = this.state.page;
		const intro = this.renderIntro();

		let rows = [];
		this.slugs.forEach((slug,i) => {
			rows.push(this.renderRow(slug,i));
		});
		return (
			<main id="how">
				<div className="max-width">
					<h1>{ReactHtmlParser(page.post_title)}</h1>
					{intro?intro:''}
					{rows?rows:''}
				</div>
			</main>
		);
	}
}

export default How;