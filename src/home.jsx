import React from 'react';
import { render } from 'react-dom';
// import SchemaForm from 'react-jsonschema-form';

import i18n from './i18n.jsx';
import Header from './header.jsx';
import StaticModule from './home/static-module.jsx';
import FourCorners from '../assets/js/four-corners.min.js';

class Home extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			lang: 'en',
		};
		this.onLanguageChanged = this.onLanguageChanged.bind(this);
	}

	componentDidMount() {
		let that = this;
		setTimeout(function() {
			FourCorners.prototype.init({
				cutline: false,
				interactive: false,
				active: 'authorship'
			});
		},20);
		// let url = window.location.href.split('/');
		// let lang = i18n.language;
		// let req = SiteSettings.url.api + 'creators?lang=' + lang;
		// fetch(req)
		// 	.then(function(res) {
		// 		if (!res.ok) {
		// 			throw Error(res.statusText);
		// 		}
		// 		return res.json();
		// 	})
		// 	.then(function(res) {
		// 		that.setState({ creator: res[0] });
		// 	});
		// i18n.on('languageChanged', this.onLanguageChanged);
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

	renderRow(slug, i) {
		const side = i%2==0;
		const rowClass = 'row explainer'+(side?'':' reverse')
		return (
			<div className={rowClass} key={i}>
				<div className="col col-5">
					<div className="col-content">
						<h2>Declare your <strong>authorship</strong></h2>

						<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi suscipit lorem ipsum, sed convallis tellus interdum vel. Phasellus ac egestas felis. Cras sodales semper pharetra. Praesent mattis sapien a ultrices condimentum. Donec laoreet ligula ac augue venenatis, a posuere nibh tempus. Duis et posuere mauris.</p>
					</div>
				</div>

				<div className="col col-7">
					<div className="col-content">
						<div className='fc-embed' data-fc='{"lang":"en","photo":{"file":"https://i.guim.co.uk/img/media/aa06488c4757b267f6c6c96f27da476f97ac1ade/0_130_5760_3456/master/5760.jpg?width=1920&quality=85&auto=format&fit=max&s=adfe866d19eb26e25a35fd62d0cddf56"},"authorship":{"credit":"Credit credit credit credit credit credit credit credit credit credit credit credit credit credit credit credit credit","license":"coreytegeler@gmail.com"},"backstory":{},"context":{},"links":{}}'></div>
					</div>
				</div>
			</div>
		);
	}

	render() {
		let lang = this.state.lang;
		let corners = ['authorship', 'backstory', 'context', 'links'];
		let rows = [];
		corners.forEach((slug,i) => {
			rows.push(this.renderRow(slug,i));
		});
		return (
			<main id="home">
				<div className="max-width">
					{rows}
				</div>
			</main>
		);
	}
}

export default Home;