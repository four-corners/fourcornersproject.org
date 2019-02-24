import React from 'react';
import { render } from 'react-dom';
import i18n from './../i18n.jsx';
import { Link, NavLink } from 'react-router-dom';
import NotFound from './../not-found';
import Module from './module';

class Home extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			page: {}
		}
	}

	componentDidMount() {
		let self = this;
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
					self.setState({ page: res });
				}
			});
		i18n.on('languageChanged', this.onLanguageChanged);
	}

	renderHome() {
		if(this.state.page) {
			return (
				<React.Fragment>
					<p className="card-text" dangerouslySetInnerHTML={{ __html: this.state.page.post_content }}  />
				</React.Fragment>
			)
		}
	}

	render() {
		// console.log('this.state.page',this.state.page)
		return (
			<main id='home'>
				<section id="intro">
					<div className='max-width'>
						<div className='row'>

							<div className='col col-12 col-lg-6 left'>
								<div className='col-content'>
									<h1>An initiative to increase authorship and credibility in visual media.</h1>
									<br/>
									<div className='content-block'>
										<h3>Photographs are made in a fraction of a second, billions everyday. But image-makers know so much more about the circumstances of what occurred as they were making the photograph. <strong>The Four Corners project allows specific information to be embedded in each of the photograph’s four corners, where it is available for an interested reader to explore.</strong> This increased contextualization strengthens both the authorship of the photographer and the credibility of the image.</h3>
									</div>
									<br/><br/>
									<div className='content-block'>
										<h3>Are you a photographer or publisher?</h3>
										<h1 className='prompt-link'>
											<Link to={SiteSettings.path+'create'}><u>Try it out!</u></Link>
										</h1>
									</div>
									{/*<h1 className='corner-title' id='authorship'>
										<div>Authorship</div>
									</h1>
									<h1 className='corner-title' id='backstory'>
										<div>Backstory</div>
									</h1>
									<h1 className='corner-title' id='imagery'>
										<div>Related imagery</div>
									</h1>
									<h1 className='corner-title' id='links'>
										<div>Links</div>
									</h1>*/}
								</div>
							</div>

							<div className='col col-12 col-lg-6 right'>
								<div className='col-content'>
									<Module photo='https://c1.staticflickr.com/9/8644/16485195465_bbd6234362_b.jpg'/>
								</div>
							</div>

						</div>
					</div>
				</section>
				<section id="about">
					<div className='max-width'>
						<div className='row'>

							<div className='col col-12 col-md-6 left'>
								<div className='col-content'>
									<h3>The <strong>Four Corners Project</strong> is meant to <strong>increase the authorship and authority</strong> of the photographer and the photograph itself by providing a fixed template to add context to each of the four corners of the image. By clicking on each of the corners, the interested reader is able to find out more about what is referenced by the photograph.</h3>
								</div>
							</div>

							<div className='col col-12 col-md-6 right'>
								<div className='col-content'>
									<h3>The platform is free and open source. It is the first major advance in contextualizing the photograph since the caption. It is also the first time that a photographer can immediately inform the reader of his or her own code of ethics as an image-maker.</h3>
									{/*this.state.page ?
										this.renderHome() :
									''*/}
								</div>
							</div>

						</div>
					</div>
				</section>

				<section id="corners">
					<div className='max-width'>
						<div className='row corner-blocks'>

							<div className='col col-6 col-md-3'>
								<div className='col-content'>

									<div className='content-block corner-block'>
										<h1 className='corner-title' id='authorship'>
											<div>Author&shy;ship</div>
										</h1>

										<div>
											In the bottom right corner, you can display your own own caption, credit, copyright,  bio, and code of ethics, and if you are interested you can allow the reader to contact you or your agent for potential sales of the image.
										</div>
									</div>

								</div>
							</div>

							<div className='col col-6 col-md-3'>
								<div className='col-content'>

									<div className='content-block corner-block'>
										<h1 className='corner-title' id='backstory'>
											<div>Back&shy;story</div>
										</h1>

										<div>
											In the bottom left corner, you can explain what was going on when you made the image to help the reader to better understand the circumstances when the photograph was made. 
										</div>
									</div>

								</div>
							</div>

							<div className='col col-6 col-md-3'>
								<div className='col-content'>

									<div className='content-block corner-block'>
										<h1 className='corner-title' id='imagery'>
											<div>Related imagery</div>
										</h1>

										<div>
											In the top left corner, you can provide context to your image by contextualizing it with other images.
										</div>
									</div>

								</div>
							</div>

							<div className='col col-6 col-md-3'>
								<div className='col-content'>

									<div className='content-block corner-block'>
										<h1 className='corner-title' id='links'>
											<div>Links</div>
										</h1>

										<div>
											In the top right corner, you can include links to websites with a related article or video, historical explanation, or any other information that helps to deepen the reader’s understanding of the image. 
										</div>
									</div>

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
									<div className='content-block'>
										<h3>Want to learn more?</h3>
										<h1 className='prompt-link'>
											<Link to={SiteSettings.path+'how'}><u>Learn how it works</u></Link>
										</h1>
									</div>
								</div>
							</div>

							<div className='col col-12 col-lg-6 left'>
								<div className='col-content'>
									<div className='content-block'>
										<h3>Want to see it in action?</h3>
										<h1 className='prompt-link'>
											<Link to={SiteSettings.path+'gallery'}><u>View the gallery</u></Link>
										</h1>
									</div>
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