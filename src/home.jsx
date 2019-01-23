import React from 'react';
import { render } from 'react-dom';
import ReactHtmlParser from 'react-html-parser';
// import SchemaForm from 'react-jsonschema-form';

import i18n from './i18n.jsx';
import Header from './header.jsx';
import StaticModule from './home/static-module.jsx';
import FourCorners from '../assets/js/four-corners.min.js';

class Home extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			lang: 'en',
			homeData: {},
			embeds: {},
			embedHtmls: {}
		};
		this.slugs = ['authorship', 'backstory', 'context', 'links'];
		this.onLanguageChanged = this.onLanguageChanged.bind(this);
	}

	componentDidMount() {
		let self = this;
		let url = window.location.href.split('/');
		let lang = i18n.language;
		let req = SiteSettings.url.api+'page?slug=home&lang='+lang;
		fetch(req)
			.then(function(res) {
				if (!res.ok) {
					throw Error(res.statusText);
				}
				return res.json();
			})
			.then(function(res) {
				if(res) {
					self.setState({ homeData: res });
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
			if(this.state.homeData&&this.state.homeData.acf) {
				const fields = this.state.homeData.acf;
				const embedHtml = ReactHtmlParser(fields[slug+'_embed']);
				let embedHtmls = this.state.embedHtmls;
				embedHtmls[slug] = embedHtml;
				this.setState({
					embedHtmls: embedHtmls
				});
				console.log(slug);
				const fourCorners = FourCorners.prototype.init({
					cutline: false,
					active: slug
				});

			}
		});
	}

	renderRow(slug, i) {
		const side = i%2==0;
		const rowClass = 'row explainer'+(side?'':' reverse');
		const homeData = this.state.homeData;
		let rowData = {}
		let keys = ['title', 'desc', 'embed'];

		keys.forEach((key,i) => {
			if(homeData&&homeData.acf&&homeData.acf[slug+'_'+key]) {
				rowData[key] = ReactHtmlParser(homeData.acf[slug+'_'+key]);
			} else {
				rowData[key] = '';
			}
		});

		return (
			<div className={rowClass} key={i}>
				<div className="col col-5">
					<div className="col-content">
						<h2>{rowData.title}</h2>
						{rowData.desc}
					</div>
				</div>

				<div className="col col-7">
					<div className="col-content">
						{this.state.embedHtmls[slug]}
					</div>
				</div>
			</div>
		);
	}

	render() {
		let lang = this.state.lang;
		const homeData = this.state.homeData;

		// let intro = '';
		// if(homeData.post_content) {
			// intro = <div className="intro-text">{ReactHtmlParser(homeData.post_content)}</div>;
		// }

		let rows = [];
		this.slugs.forEach((slug,i) => {
			rows.push(this.renderRow(slug,i));
		});
		return (
			<main id="home">
				<div className="max-width">
					{/*intro*/}
					{rows}
				</div>
			</main>
		);
	}
}

export default Home;