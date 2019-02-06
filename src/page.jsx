import React from 'react';
import { render } from 'react-dom';
import i18n from './i18n.jsx';

import NotFound from './not-found';

class Page extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			page: {}
		}
	}

	componentDidMount() {
		var that = this;
		var url = window.location.href.split('/');
		var slug = url.pop() || url.pop();
		fetch(SiteSettings.url.api + "pages?slug=" + slug)
			.then(function (response) {
				if (!response.ok) {
					throw Error(response.statusText);
				}
				return response.json();
			})
			.then(function (res) {
				that.setState({ page: res[0] })
			});
	}

	renderPage() {
		if(this.state.page.title) {
			return (
				<React.Fragment>
					<h1>{this.state.page.title.rendered}</h1>
					<p className="card-text" dangerouslySetInnerHTML={{ __html: this.state.page.content.rendered }}  />
				</React.Fragment>
			)
		}
	}

	render() {
		// console.log('this.state.page',this.state.page)
		return (
			<main id='home'>
				<div className='max-width'>
					{
						this.state.page ?
						this.renderPage() :
						null
					}
				</div>
			</main>
		);
	}
}

export default Page;