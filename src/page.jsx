import React from 'react';
import { render } from 'react-dom';
import ReactHtmlParser from 'react-html-parser';

import i18n from './i18n.jsx';
import Loading from './loading';
import NotFound from './not-found';

class Page extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			slug: null,
			page: null
		}
	}

	componentDidMount() {
		let url = window.location.href.split('/');
		let slug = url.pop() || url.pop();
		this.getPage(slug);
		i18n.on('languageChanged', this.onLanguageChanged);
	}

	componentWillReceiveProps(props) {
		let path = props.location.pathname.split('/');
		let slug = path.pop() || path.pop();
		if(slug === this.state.slug){return}
		this.setState({
			slug: null,
			page: null
		})
		this.getPage(slug);
	}

	componentWillUnmount() {
		i18n.off('languageChanged', this.onLanguageChanged);
	}

	onLanguageChanged(lang) {
		this.setState({
			lang: lang
		});
	}

	getPage(slug) {
		let self = this;
		let lang = i18n.language;
		let req = siteSettings.url.api+'page?slug='+slug+'&lang='+lang;
		this.setState({
			slug: slug
		});
		fetch(req)
			.then(function (response) {
				if (!response.ok) {
					throw Error(response.statusText);
				}
				return response.json();
			})
			.then(function (res) {
				if(res) {
					self.setState({ page: res })
				}
			});
	}

	render() {
		let lang = this.state.lang;
		const page = this.state.page;
		return (
			<main id={this.state.slug}>
				{page ?
					<div className="md-width">
						<h1>{ReactHtmlParser(page.post_title)}</h1>
						<div className='row'>
							<div className='col col-12'>
								<div className='col-content'>
									{page.post_content ? ReactHtmlParser(page.post_content) : ''}
								</div>
							</div>
						</div>
					</div>
				: ''}
			</main>
		);
	}
}

export default Page;