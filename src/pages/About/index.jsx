import React from 'react';
import { render } from 'react-dom';
import ReactHtmlParser from 'react-html-parser';
import i18n from "../../components/_i18n";

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
		return contribs.map((contrib, i) => {
			return (
				<div className="col-content" key={i}>
					<div className="content-block contrib-block">
						<h3>{contrib.name}</h3>
						{contrib.role ?
							<h4>{contrib.role}</h4>
						: ''}
						{ReactHtmlParser(contrib.bio)}
					</div>
				</div>
			);
		});
	}

	render() {
		let lang = this.state.lang;
		const page = this.state.page;
		
		return (
			<main id="about">
				<h1>{ReactHtmlParser(page.post_title)}</h1>
				<div className="container">
					<div className="row">

						<div className="col col-12 col-md-6">
							<div className="col-content">
								{page.post_content ?
									<div className="content-block">
										{ReactHtmlParser(page.post_content)}
									</div>
								: ''}
								<div className="content-block">
									{ReactHtmlParser(this.state.strings.desc)}
								</div>
							</div>
						</div>

						<div className="col col-12 col-md-6">
							{this.renderContribs()}
						</div>

					</div>
				</div>
			</main>
		);
	}
}

export default About;