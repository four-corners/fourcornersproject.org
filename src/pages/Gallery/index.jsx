import React from 'react';
import { render } from 'react-dom';
import ReactHtmlParser from 'react-html-parser';
import Masonry from 'masonry-layout';
// import FourCorners from '../../assets/js/fourcorners.min.js';
import FourCorners from '@four-corners/fourcorners.js';

import i18n from "../../components/_i18n";
import Header from '../../components/_header';

import "./style.scss";

class Gallery extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			lang: i18n.language,
			page: siteSettings.current,
			embeds: []
		};
		this.onLanguageChanged = this.onLanguageChanged.bind(this);
	}

	componentDidMount() {
		// let self = this;
		// let lang = i18n.language;
		// let req = siteSettings.url.api+'page?slug=gallery&lang='+lang;
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
		i18n.on('languageChanged', this.onLanguageChanged);
	}

	componentWillUnmount() {
		i18n.off('languageChanged', this.onLanguageChanged);
	}

	componentDidUpdate() {
		const self = this;
		const grid = new Masonry("#gallery-embeds", {
			itemSelector: ".embed-col",
			transitionDuration: 0,
			gutter: 0
		});

		if(!this.state.embeds.length) {
			const fcEmbeds = new FourCorners();
			fcEmbeds.forEach(function(fcEmbed, i) {
				let photo = fcEmbed.elems.photo,
						embed = fcEmbed.elems.embed,
						parent = embed.parentNode;
				if(!embed.classList.contains("loaded")) {
					embed.addEventListener("onImgLoad", function(e) {
						grid.layout();
						embed.classList.add("loaded");
					});
				}
				self.state.embeds.push(embed);
			});
		}

		// window.onresize = function(e) {
			// grid.layout();
		// };
	}

	onLanguageChanged(lang) {
		this.setState({
			lang: lang
		});
	}

	renderEmbed() {
		const page = this.state.page;
		let embeds = [];
		page.strings.embeds.forEach(function(embed, i) {
			const embed_code = <div dangerouslySetInnerHTML={{__html: embed.embed_code}}></div>;
			embeds.push(
				<div className="embed-col col col-12 col-xl-6" key={i}>
					<div className="embed-wrap">
						<h2>{embed.title}</h2>
						{embed_code}
					</div>
				</div>
			);
		});
		return embeds;
	}

	render() {
		let lang = this.state.lang;
		const page = this.state.page;		
		return (
			<main id="gallery">
				<div className="max-width">
					<div className='row'>
						<div className='col col-8 m-auto'>
							<h1>{ReactHtmlParser(page.post_title)}</h1>
							<div className='col-content md-text'>
								{page.post_content ? ReactHtmlParser(page.post_content) : ''}
							</div>
						</div>
					</div>
					<div className='row' id='gallery-embeds'>
						{page.strings ? this.renderEmbed() : ''}
					</div>
				</div>
			</main>
		);
	}
}

export default Gallery;