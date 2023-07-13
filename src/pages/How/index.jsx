import React from "react";
import { render } from "react-dom";
import ReactHtmlParser from "react-html-parser";
import i18n from "../../components/_i18n";
import FourCorners from '@four-corners/fourcorners.js';

class How extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			lang: i18n.language,
			embeds: {},
			embedHtmls: {},
			page: siteSettings.current,
			strings: siteSettings.current.strings,
		};
		this.slugs = ["authorship", "backstory", "imagery", "links"];
		this.onLanguageChanged = this.onLanguageChanged.bind(this);
	}

	componentDidMount() {
		// this.activateEmbeds();
		i18n.on("languageChanged", this.onLanguageChanged);
	}

	componentWillUnmount() {
		i18n.off("languageChanged", this.onLanguageChanged);
	}

	componentDidUpdate() {
		this.slugs.forEach(slug =>
			this.activateEmbed(slug)
		)
	}

	onLanguageChanged(lang) {
		this.setState({
			lang: lang
		});
	}

	activateEmbed(slug) {
		const self = this;
		if(!this.state.embeds[slug]) {
			const fcEmbedContainer = document.querySelector(`.embed-wrapper[data-slug="${slug}"] .fc-embed`);
			const fcEmbed = new FourCorners(fcEmbedContainer);
			setTimeout(() => fcEmbed.openPanel(slug))
			self.state.embeds[slug] = fcEmbed;
		}
	}

	renderIntro() {
		let lang = this.state.lang;
		const page = this.state.page;
		const intro = (
			<div id="how-intro" className="row">
				<div className="col col-12">
					<div className="col-content">
						<div className="content-block md-text">
							{ReactHtmlParser(page.post_content)}
						</div>
					</div>
				</div>
			</div>
		);
		return intro;
	}

	renderRow(slug, i) {
		const side = i % 2 == 0;
		const rowClass = `row how-block ${side ? "" : "reverse"}`;
		const { page } = this.state;
		let rowData = {};

		["title", "desc", "embed"].forEach((key, i) => {
			if(page && page.strings && page.strings[`${slug}_${key}`]) {
				rowData[key] = page.strings[`${slug}_${key}`];
			} else {
				rowData[key] = "";
			}
		});

		return (
			<div className={rowClass} key={i}>
				<div className="col col-12 col-md-5 left">
					<div className="col-content">
						<h2
							dangerouslySetInnerHTML={{ __html: rowData.title }}
						/>
						{ReactHtmlParser(rowData.desc)}
					</div>
				</div>

				<div className="col col-12 col-md-7 right">
					<div className="col-content">
						<div className="embed-wrapper" data-slug={slug} dangerouslySetInnerHTML={{ __html: rowData.embed }}>
							{/*{rowData.embed}*/}
						</div>
					</div>
				</div>
			</div>
		);
	}

	render() {
		let { lang } = this.state;
		const { post_title } = this.state.page;
		return (
			<main id="how">
				<div className="max-width">
					<h1>{ReactHtmlParser(post_title)}</h1>
					{this.renderIntro()}
					{this.slugs.map((slug,i) => this.renderRow(slug,i))}
				</div>
			</main>
		);
	}
}

export default How;