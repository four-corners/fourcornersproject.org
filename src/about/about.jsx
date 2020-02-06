import React from 'react';
import { render } from 'react-dom';
import ReactHtmlParser from 'react-html-parser';
import i18n from '../i18n.jsx';

class About extends React.Component {
	

	constructor(props) {
		super(props);
		this.state = {
			lang: i18n.language,
			page: siteSettings.current,
			strings: siteSettings.current.strings
		};
		this.onLanguageChanged = this.onLanguageChanged.bind(this);
	}

	componentDidMount() {
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

	renderContribs() {
		const page = this.state.page;
		const contribs = this.state.strings.contributors;
		let contribBlocks = [];
		contribs.forEach((contrib, i) => {
			contribBlocks.push(
				<div className="col col-12 col-md-6" key={i}>
					<div className="col-content">
						<div className="content-block contrib-block">
							<h3>{contrib.name}</h3>
							{contrib.role ?
								<h4>{contrib.role}</h4>
							: ''}
							{ReactHtmlParser(contrib.bio)}
						</div>
					</div>
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
			<main id="about">
				<div className="md-width">
					<h1>{ReactHtmlParser(page.post_title)}</h1>
					<div className="row">
						<div className="col col-12">
							<div className="col-content">
								{page.post_content ?
									<div className="content-block">
										{ReactHtmlParser(page.post_content)}
									</div>
								: ''}
							</div>
						</div>
					</div>
				</div>
				<div className="max-width">
					<div className="row">
						<div className="col col-12 col-md-6">
							<div className="col-content">
								<div className="content-block md-text">
									{ReactHtmlParser(this.state.strings.desc)}
								</div>
							</div>
						</div>
						{contribs?contribs:''}
					</div>
				</div>
			</main>
		);
	}
}

export default About;