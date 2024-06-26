import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import ReactHtmlParser from 'react-html-parser';

import i18n from '/src/utils/i18n';

class Header extends React.Component {

	constructor(props) {
		let lang = i18n.language;
		super(props);
		this.state = {
			lang: lang,
			langs: {},
			menu: []
		};
		// this.onLanguageChanged = this.onLanguageChanged.bind(this);
	}

	componentDidMount() {
		let that = this;
		let lang = i18n.language;

		let langReq = siteSettings.url.api + 'get_langs';
		fetch(langReq)
			.then(function(res) {
				if (!res.ok) {
					throw Error(res.statusText);
				}
				return res.json();
			})
			.then(function(res) {
				that.setState({ langs: JSON.parse(res) });
			});

		let menuReq = siteSettings.url.api + 'menu';
		fetch(menuReq)
			.then(function(res) {
				if (!res.ok) {
					throw Error(res.statusText);
				}
				return res.json();
			})
			.then(function(res) {
				console.log(menu);
				that.setState({ menu: res });
			});

		let optionsReq = siteSettings.url.api + 'options';
		fetch(optionsReq)
			.then(function(res) {
				if (!res.ok) {
					throw Error(res.statusText);
				}
				return res.json();
			})
			.then(function(res) {
				that.setState({ options: res });
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

	renderLangList() {
		const langs = this.state.langs;
		const self = this;
		return(
			<div onChange={this.changeLang.bind(this)} className='form-control'>
				{Object.keys(this.state.langs).map(function( slug, index ){
					const lang = langs[slug];
          return(
          	<option key={slug} value={slug}>{lang.name}</option>
          );
        })}
			</div>
		);
	}

	changeLang(e) {
		// console.log(e);
	}

	renderMenu() {
		let linkElems = [];
		const links = this.state.menu;
		const lang = this.state.lang;
		return (
			<nav id='main-nav'>
				{links ? links.map((link, i) => <Link to={siteSettings.path+link.slug} key={i}>{link.title}</Link>) : null}
			</nav>
		);
	}

	render() {
		let lang = this.state.lang;
		return(
			<React.Fragment>
				
				<header className='header'>
					<div className='max-width'>
						<div className='row'>
							
							<div className='col col-12 col-md-4 left'>
								<div className='col-content'>
									<div id='site-title'>
											<Link to={siteSettings.path}>
											</Link>
									</div>
								</div>
							</div>

							<div className='col col-12 col-md-8 right'>
								<div className='col-content'>
									{this.state ? this.renderMenu() : null}
								</div>
							</div>

						</div>
					</div>
				</header>
				{this.state.options&&this.state.options.alert ?
				<div id='alert'>
					<div className='alert-inner'>
						{ReactHtmlParser(this.state.options.alert)}
					</div>
				</div>
				: ''}
				
			</React.Fragment>
		)
	}

}

export default Header;