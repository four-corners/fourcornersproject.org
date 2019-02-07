import React from 'react';
import { render } from 'react-dom';
import i18n from './i18n.jsx';

import NotFound from './not-found';

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
				<div className='max-width'>
					<div className='row'>
						<div className='col col-12 col-sm-6 col-md-7'>
							{ this.state.page ?
								this.renderHome() :
								null }
						</div>
					</div>
				</div>
			</main>
		);
	}
}

export default Home;