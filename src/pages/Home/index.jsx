import React from 'react';
import ReactHtmlParser from 'react-html-parser';
import { render } from 'react-dom';
import { Link, NavLink } from 'react-router-dom';
import i18n from "../../components/_i18n";
import NotFound from '../NotFound';
import Demo from './_demo';
import Subscribe from './_subscribe';

import "./style.scss";

class Home extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			lang: i18n.language,
			page: siteSettings.current,
			strings: siteSettings.current.strings,
			info: {},
			options: {}
		};
		// this.cornersInfo = [
		// 	{'title': 'Author\u00ADship','slug': 'authorship'},
		// 	{'title': 'Back\u00ADstory','slug': 'backstory'},
		// 	{'title': 'Related Imagery','slug': 'imagery'},
		// 	{'title': 'Links','slug': 'links'}
		// ];
		// this.onLanguageChanged = this.onLanguageChanged.bind(this);
	}

	componentDidMount() {
		let self = this;
		// let pageReq = siteSettings.url.api+'page?slug=home&lang='+lang;
		// fetch(pageReq)
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

		let infoReq = siteSettings.url.api+'info';
		fetch(infoReq)
			.then(function(res) {
				if (!res.ok) {
					throw Error(res.statusText);
				}
				return res.json();
			})
			.then(function(res) {
				if(res) {
					self.setState({ info: res });
				}
			});

		let options = siteSettings.url.api+'options';
		fetch(options)
			.then(function(res) {
				if (!res.ok) {
					throw Error(res.statusText);
				}
				return res.json();
			})
			.then(function(res) {
				if(res) {
					self.setState({ options: res });
				}
			});

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

	renderTopActions() {
		const actions = this.state.strings.top_action_buttons || [];
		let buttons = [];
		actions.forEach((action, i) => {
			buttons.push(
				<a href={action.link} className='action-button' key={i}>
					<div className='action-text'>{action.text}</div>
				</a>
			);
		});
		return buttons;
	}

	renderBottomActions() {
		const actions = this.state.strings.bottom_action_buttons || [];
		let buttons = [];
		actions.forEach((action, i) => {
			buttons.push(
				<div className='col col-12 col-sm-6 left' key={i}>
					<div className='col-content'>
						<a href={action.link} className='action-button full'>
							<div className='action-text'>{action.text}</div>
						</a>
					</div>
				</div>
			);
		});
		return buttons;
	}

	render() {
		return (
			<main id='home'>
				<section id="home-intro">
					<div className='max-width'>
						<div className='row'>
							<div className='col col-12'>
								<div className='col-content'>
									<h1 id='site-tagline'>{this.state.strings.tagline}</h1>
								</div>
							</div>
							<div className='col col-12 col-md-6'>
								<div className='col-content'>
									<Demo strings={this.state.strings} />
									{
										// <div className='border-block'>
										// 	{ReactHtmlParser(this.state.page.post_content)}
										// </div>
									}
								</div>
							</div>
							<div className='col col-12 col-md-6'>
								<div className='col-content'>
									<div className='actions'>
										{ this.renderTopActions() }
									</div>
									<div id='home-subscribe'>
										<Subscribe
											label={<h3><strong>{this.state.strings.newsletter_title}</strong></h3>}
											formUrl={this.state.options.subscribe}/>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>



				{/*<section id="corners">
					<div className='max-width'>
						<div className='row corner-blocks'>

							{this.renderCornerBlocks()}

						</div>
					</div>
				</section>*/}

				{/*ReactHtmlParser(this.state.page.post_content)*/}

				<section id="home-about">
					<div className='max-width'>
						<div className='row'>

							<div className="col col-12">

								{ReactHtmlParser(this.state.page.post_content)}

							</div>

							{/*<div className='col col-12 col-md-6 left'>
								<div className='col-content'>
									<h3>The <strong>Four Corners Project</strong> is meant to <strong>increase the authorship and authority</strong> of the photographer and the photograph itself by providing a fixed template to add context to each of the four corners of the image. By clicking on each of the corners, the interested reader is able to find out more about what is referenced by the photograph.</h3>
								</div>
							</div>

							<div className='col col-12 col-md-6 right'>
								<div className='col-content'>
									<h3>The platform is free and open source. <strong>It is the first major advance in contextualizing the photograph since the caption.</strong> It is also the first time that a photographer can immediately inform the reader of his or her own code of ethics as an image-maker.</h3>
								</div>
							</div>*/}

						</div>
					</div>
				</section>

				<section id="intro-end">
					<div className='max-width'>
						<div className='row'>

							{ this.renderBottomActions() }

						</div>
					</div>
				</section>

			</main>
		);
	}
}

export default Home;