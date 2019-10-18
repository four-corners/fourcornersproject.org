import React from 'react';
import { render } from 'react-dom';
import ReactHtmlParser from 'react-html-parser';
import i18n from './../i18n.jsx';
import { Link, NavLink } from 'react-router-dom';
import NotFound from './../not-found';
import Demo from './demo';
import Subscribe from './subscribe';

class Home extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			page: {},
			info: {},
			options: {}
		};
		this.cornersInfo = [
			{'title': 'Author\u00ADship','slug': 'authorship'},
			{'title': 'Back\u00ADstory','slug': 'backstory'},
			{'title': 'Related Imagery','slug': 'imagery'},
			{'title': 'Links','slug': 'links'}
		];
		// this.onLanguageChanged = this.onLanguageChanged.bind(this);
	}

	componentDidMount() {
		let self = this;
		// const fourCorners = new FourCorners();
		// if(!fourCorners) {return}
		// self.fourCorners = fourCorners[0];
		let lang = i18n.language;
		let pageReq = SiteSettings.url.api+'page?slug=home&lang='+lang;
		fetch(pageReq)
			.then(function(res) {
				if (!res.ok) {
					throw Error(res.statusText);
				}
				return res.json();
			})
			.then(function(res) {
				if(res) {
					self.setState({ page: res });
				}
			});

		let infoReq = SiteSettings.url.api+'info';
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

		let options = SiteSettings.url.api+'options';
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

	renderCornerBlocks() {
		let corners = [];
		const strings = this.state.page.acf || {};
		this.cornersInfo.forEach((corner, i) => {
			const desc = strings[corner.slug+'_desc'];
			corners.push(
				<div className='col col-6 col-sm-6 col-lg-3' key={i}>
					<div className='col-content'>

						<div className='content-block corner-block'>
							<h2 id={corner.slug}>
								<div className='corner-title'>{corner.title}</div>
							</h2>
							<div className='corner-desc'>{desc}</div>
						</div>

					</div>
				</div>
			);
		});
		return corners;
	}

	render() {
		return (
			<main id='home'>
				<section id="home-intro">
					<div className='max-width'>
						<div className='row'>
							<div className='col col-12'>
								<div className='col-content'>
									<h1 id='site-tagline'>{this.state.info.tagline}</h1>
								</div>
							</div>
							<div className='col col-12 col-md-6'>
								<div className='col-content'>
									<Demo cornersInfo={this.cornersInfo} options={this.state.options}/>
									{
										// <div className='border-block'>
										// 	{ReactHtmlParser(this.state.page.post_content)}
										// </div>
									}
								</div>
							</div>
							<div className='col col-12 col-md-6'>
								<div className='col-content'>
									<div className='prompts'>
										<Link to={SiteSettings.path+'create'} className='prompt-button'>
											<u>Try it out</u>
										</Link>
										<Link to={SiteSettings.path+'how'} className='prompt-button'>
											<u>Learn more</u>
										</Link>
									</div>
									<div id='home-subscribe'>
										<Subscribe
											label={<h3><strong>Subscribe to receive updates</strong></h3>}
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

							<div className='col col-12 col-md-6 left'>
								<div className='col-content'>
									<h3>The <strong>Four Corners Project</strong> is meant to <strong>increase the authorship and authority</strong> of the photographer and the photograph itself by providing a fixed template to add context to each of the four corners of the image. By clicking on each of the corners, the interested reader is able to find out more about what is referenced by the photograph.</h3>
								</div>
							</div>

							<div className='col col-12 col-md-6 right'>
								<div className='col-content'>
									<h3>The platform is free and open source. <strong>It is the first major advance in contextualizing the photograph since the caption.</strong> It is also the first time that a photographer can immediately inform the reader of his or her own code of ethics as an image-maker.</h3>
								</div>
							</div>

						</div>
					</div>
				</section>

				<section id="intro-end">
					<div className='max-width'>
						<div className='row'>

							<div className='col col-12 col-lg-6 left'>
								<div className='col-content'>
									<Link to={SiteSettings.path+'how'} className='prompt-button full'>
										<u>How it works</u>
									</Link>
								</div>
							</div>

							<div className='col col-12 col-lg-6 left'>
								<div className='col-content'>
									<Link to={SiteSettings.path+'gallery'} className='prompt-button full'>
										<u>View the gallery</u>
									</Link>
								</div>
							</div>

						</div>
					</div>
				</section>

			</main>
		);
	}
}

export default Home;