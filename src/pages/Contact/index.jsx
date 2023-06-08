import React from 'react';
import { render } from 'react-dom';
import ReactHtmlParser from 'react-html-parser';
import i18n from "../../components/_i18n";
import Header from '../../components/_header';

class Contact extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			lang: 'en',
			page: siteSettings.current,
		};
		this.onLanguageChanged = this.onLanguageChanged.bind(this);
	}

	componentDidMount() {
		// let self = this;
		// let lang = i18n.language;
		// let req = siteSettings.url.api+'page?slug=contact&lang='+lang;
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

	}

	onLanguageChanged(lang) {
		this.setState({
			lang: lang
		});
	}

	render() {
		let lang = this.state.lang;
		const page = this.state.page;
		
		return (
			<main id="contact">
				<div className="md-width">
					<h1>{ReactHtmlParser(page.post_title)}</h1>
					<div className='row'>
						<div className='col col-12'>
							<div className='col-content'>
								{page.post_content ?
									<div className='content-block'>
										{ReactHtmlParser(page.post_content)}
									</div>
								: ''}
							</div>
						</div>
					</div>
				</div>
			</main>
		);
	}
}

export default Contact;