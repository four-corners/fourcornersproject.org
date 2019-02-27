import React from 'react';
import { render } from 'react-dom';
import ReactHtmlParser from 'react-html-parser';
// import SchemaForm from 'react-jsonschema-form';

import i18n from '../i18n.jsx';
import Header from '../header.jsx';

class About extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			lang: 'en',
			page: {},
		};
		// this.onLanguageChanged = this.onLanguageChanged.bind(this);
	}

	componentDidMount() {
		let self = this;
		let lang = i18n.language;
		let req = SiteSettings.url.api+'page?slug=about&lang='+lang;
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

	// componentDidUpdate() {

	// }

	onLanguageChanged(lang) {
		this.setState({
			lang: lang
		});
	}

	renderContribs() {
		const page = this.state.page;
		const fields = page.acf;
		if(!fields){return}
		const contribs = fields.contributors;
		let contribBlocks = [];
		contribs.forEach((contrib, i) => {
			contribBlocks.push(
				<div className='content-block contrib-block' key={i}>
					<h3>{contrib.name}</h3>
					{contrib.role ?
						<h4>{contrib.role}</h4>
					: ''}
					{/*contrib.website ?
						<a href='{contrib.website}' target='_blank'>{contrib.website}</a>
					: ''*/}
					{ReactHtmlParser(contrib.bio)}
				</div>
			);
		});
		return contribBlocks;
	}

	render() {
		let lang = this.state.lang;
		const page = this.state.page;
		const contribs = this.renderContribs();
		
		return (
			<main id='about'>
				<div className='max-width'>
					<h1>{ReactHtmlParser(page.post_title)}</h1>

					<div className='row'>
						<div className="col col-12">
							<div className='col-content'>

								{page.post_content ?
									<div className='content-block'>
										<h3>{ReactHtmlParser(page.post_content)}</h3>
									</div>
								: ''}

								{contribs?contribs:''}

							</div>
						</div>
					</div>


				</div>
			</main>
		);
	}
}

export default About;