import React from 'react';
import { render } from 'react-dom';
import ReactHtmlParser from 'react-html-parser';
import i18n from './../i18n.jsx';
import { Link, NavLink } from 'react-router-dom';
import NotFound from './../not-found';
import Module from './module';

class Home extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			page: {}
		};
		// this.onLanguageChanged = this.onLanguageChanged.bind(this);
	}

	componentDidMount() {
		let self = this;

		const fourCorners = FourCorners.default.prototype.init();
		if(!fourCorners) {return}
		self.fourCorners = fourCorners[0];


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

	componentWillUnmount() {
		i18n.off('languageChanged', this.onLanguageChanged);
	}

	onLanguageChanged(lang) {
		this.setState({
			lang: lang
		});
	}

	renderHome() {
		if(this.state.page) {
			return (
				<React.Fragment>
					<p className="card-text">
						{ReactHtmlParser(this.state.page.post_content)}
					</p>
				</React.Fragment>
			)
		}
	}

	render() {
		// console.log('this.state.page',this.state.page)
		return (
			<main id='home'>
				<section id="home-intro">
					<div className='max-width'>
						<div className='row'>
							<div className='col col-12'>
								<h2>An initiative to increase authorship and credibility in visual media.</h2>
							</div>
							<div className='col col-12 col-lg-6 left'>
								<div className='col-content'>
									<div className='content-block'>
										<h3>Photographs are made in a fraction of a second, billions everyday. But image-makers know so much more about the circumstances of what occurred as they were making the photograph. <strong>The Four Corners project allows specific information to be embedded in each of the photograph’s four corners, where it is available for an interested reader to explore.</strong> This increased contextualization strengthens both the authorship of the photographer and the credibility of the image.</h3>
									</div>
									
									
									{/*<h2 className='corner-title' id='authorship'>
										<div>Authorship</div>
									</h2>
									<h2 className='corner-title' id='backstory'>
										<div>Backstory</div>
									</h2>
									<h2 className='corner-title' id='imagery'>
										<div>Related imagery</div>
									</h2>
									<h2 className='corner-title' id='links'>
										<div>Links</div>
									</h2>*/}
								</div>
							</div>

							<div className='col col-12 col-lg-6 right'>
								<div className='col-content'>
									<div className='content-block'>
										<img id='corners-preview' src={SiteSettings.url.theme+'/assets/images/corners.svg'}/>
									</div>
									{/*<div className='fc-embed' data-fc='{"authorship":{"caption":"Earthrise was photographed by astronaut William Anders on the first human mission to the moon, Apollo 8, on Christmas Eve, December 24, 1968. It was the first time that earthlings were able to see their fragile planet hovering in space in full color, and is widely credited for sparking the environmental movement.","credit":"William Anders","license":{"type":"commons","label":"Public Domain","url":"","desc":"No Known Copyright","image":false},"bio":"William Anders is a former NASA astronaut, engineer, and US Air Force Major general. He is best known for being one of the three first humans to leave Earth’s orbit to circle the moon, and for his Earthrise photograph. "},"backstory":{"text":"On Christmas Eve, 1968, at the end of an enormously turbulent year that was rife with political upheaval, astronaut Bill Anders photographed the Earth from his perch on an Apollo spacecraft. As they began the fourth of 10 orbits, a view of the planet filled one of the windows. “Oh, my God! Look at that picture over there! Here’s the Earth coming up. Wow, is that pretty!” Anders exclaimed, before photographing it first in black and white, and then again in color.\n\nEarthrise, as the photograph was called, was placed on a U.S. postage stamp and is credited with inspiring Earth Day, celebrated for the first time by millions on April 22, 1970, sixteen months after Anders made the image.\n"},"imagery":{"media":[{"source":"youtube","index":1,"url":"https://www.youtube.com/watch?v=Pu7NUQEHfe4","caption":"Earthrise: The Story Behind William Anders&apos; Apollo 8 Photograph","credit":"Time Magazine"},{"source":"image","index":0,"url":"https://upload.wikimedia.org/wikipedia/commons/6/6e/Scott_1371%2C_Apollo_8.jpg"}]},"links":{"links":[{"source":"link","index":0,"title":"100 Most Influential Images of All Time","url":"http://100photos.time.com/photos/nasa-earthrise-apollo-8#photograph"},{"source":"link","index":1,"title":"Earthrise: how the iconic image changed the world The Guardian","url":"https://www.theguardian.com/science/2018/dec/24/earthrise-how-the-iconic-image-changed-the-world"}]},"opts":{},"lang":"en"}'><img className='fc-img' src='http://dujye7n3e5wjl.cloudfront.net/photographs/1080-tall/time-100-influential-photos-william-anders-nasa-earthrise-62.jpg'/></div>*/}
									{/*<Module photo='https://c1.staticflickr.com/9/8644/16485195465_bbd6234362_b.jpg'/>*/}
								</div>
							</div>

							<div className='col col-12'>
								<div className='content-block'>
									<h3>Are you a photographer or publisher?</h3>
									<h2 className='prompt-link'>
										<Link to={SiteSettings.path+'create'}><u>Try it out!</u></Link>
									</h2>
								</div>
							</div>

						</div>
					</div>
				</section>
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

							<div className='col col-6 col-sm-6 col-lg-3'>
								<div className='col-content'>

									<div className='content-block corner-block'>
										<h2 className='corner-title' id='authorship'>
											<div>Author&shy;ship</div>
										</h2>

										<div>
											In the bottom right corner, you can display your own own caption, credit, copyright,  bio, and code of ethics, and if you are interested you can allow the reader to contact you or your agent for potential sales of the image.
										</div>
									</div>

								</div>
							</div>

							<div className='col col-6 col-sm-6 col-lg-3'>
								<div className='col-content'>

									<div className='content-block corner-block'>
										<h2 className='corner-title' id='backstory'>
											<div>Back&shy;story</div>
										</h2>

										<div>
											In the bottom left corner, you can explain what was going on when you made the image to help the reader to better understand the circumstances when the photograph was made. 
										</div>
									</div>

								</div>
							</div>

							<div className='col col-6 col-sm-6 col-lg-3'>
								<div className='col-content'>

									<div className='content-block corner-block'>
										<h2 className='corner-title' id='imagery'>
											<div>Related imagery</div>
										</h2>

										<div>
											In the top left corner, you can provide context to your image by contextualizing it with other images.
										</div>
									</div>

								</div>
							</div>

							<div className='col col-6 col-sm-6 col-lg-3'>
								<div className='col-content'>

									<div className='content-block corner-block'>
										<h2 className='corner-title' id='links'>
											<div>Links</div>
										</h2>

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
										<h2 className='prompt-link'>
											<Link to={SiteSettings.path+'how'}><u>Learn how it works</u></Link>
										</h2>
									</div>
								</div>
							</div>

							<div className='col col-12 col-lg-6 left'>
								<div className='col-content'>
									<div className='content-block'>
										<h3>Want to see it in action?</h3>
										<h2 className='prompt-link'>
											<Link to={SiteSettings.path+'gallery'}><u>View the gallery</u></Link>
										</h2>
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