import React from 'react';
import { render } from 'react-dom';
import ReactHtmlParser from 'react-html-parser';
// import SchemaForm from 'react-jsonschema-form';

import i18n from '../i18n.jsx';
import FourCorners from '../../assets/js/fourcorners.min.js';

class How extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			lang: i18n.language,
			embeds: {},
			embedHtmls: {},
			page: siteSettings.current,
			strings: siteSettings.current.strings
		};
		this.slugs = ['authorship', 'backstory', 'imagery', 'links'];
		this.onLanguageChanged = this.onLanguageChanged.bind(this);
	}

	componentDidMount() {
		// let self = this;
		// let lang = i18n.language;
		// let req = siteSettings.url.api+'page?slug=how&lang='+lang;
		// fetch(req)
		// 	.then(function(res) {
		// 		if (!res.ok) {
		// 			throw Error(res.statusText);
		// 		}
		// 		return res.json();
		// 	})
		// 	.then(function(res) {
		// 		if(res) {
		// 			self.setState({ page: res });
		// 		}
		// 	});
		this.activateEmbeds();

		i18n.on('languageChanged', this.onLanguageChanged);
	}

	componentWillUnmount() {
		i18n.off('languageChanged', this.onLanguageChanged);
	}

	componentDidUpdate() {
		this.activateEmbeds();
	}

	onLanguageChanged(lang) {
		this.setState({
			lang: lang
		});
	}

	activateEmbeds() {
		var strings = this.state.strings;
		if(this.state.page && strings) {
			this.slugs.forEach((slug, i) => {
				if(!this.state.embedHtmls[slug]) {
					const embedHtml = ReactHtmlParser(strings[slug+'_embed']);
					let embedHtmls = this.state.embedHtmls;
					embedHtmls[slug] = <div className='embed-wrapper' data-slug={slug}>{embedHtml}</div>;
					this.setState({
						embedHtmls: embedHtmls
					});
				} else if(!this.state.embeds[slug]) {
					const embedHtml = this.state.embedHtmls[slug];
					const embed = new FourCorners({
						elem: '.embed-wrapper[data-slug="'+slug+'"] .fc-embed',
						active: slug,
						static: true
					});
					let embeds = this.state.embeds;
					embeds[slug] = embed;
					this.setState({
						embeds: embeds
					});
				}
			});
		}
	}

	renderIntro() {
		let lang = this.state.lang;
		const page = this.state.page;
		const intro = (
			<div id='how-intro' className='row'>
				<div className='col col-12'>
					<div className='col-content'>
						<div className='content-block md-text'>
							{ReactHtmlParser(page.post_content)}
						</div>
					</div>
				</div>
			</div>
		);
		return intro;
	}

	renderEmbed(slug, i) {
		if(!this.state.page, !this.state.strings){return}
		const strings = this.state.strings;
		const embedHtml = ReactHtmlParser(strings[slug+'_embed']);
		return (
			<div key={i}
				className='embed-wrapper'
				data-slug={slug}>
				{embedHtml}
			</div>
		);
	}

	renderRow(slug, i) {
		const side = i%2==0;
		const rowClass = 'row how-block'+(side?'':' reverse');
		const page = this.state.page;
		let rowData = {}
		let keys = ['title', 'desc', 'embed'];

		keys.forEach((key,i) => {
			if(page&&page.strings&&page.strings[slug+'_'+key]) {
				rowData[key] = ReactHtmlParser(page.strings[slug+'_'+key]);
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