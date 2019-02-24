import React from 'react';
import { Link, NavLink } from 'react-router-dom';

import i18n from './i18n.jsx';

class Header extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			lang: 'en',
			langs: {},
			menu: []
		};
		this.onLanguageChanged = this.onLanguageChanged.bind(this);
	}

	componentDidMount() {
		let that = this;
		let lang = i18n.language;

		let langReq = SiteSettings.url.api + 'get_langs';
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

		let menuReq = SiteSettings.url.api + 'menu';
		fetch(menuReq)
			.then(function(res) {
				if (!res.ok) {
					throw Error(res.statusText);
				}
				return res.json();
			})
			.then(function(res) {
				that.setState({ menu: res });
			});


		// i18n.on('languageChanged', this.onLanguageChanged);
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
			// <ul>
				// {Object.keys(this.state.langs).map(function( slug, index ){
					// const lang = langs[slug];
          // return(
          	// <li key={slug}>
          		// <a href={lang.url}>{lang.name}</a>
          		// {/*<NavLink
          			// to={ '/'+slug }
          			// activeClassName='active'
          			// onClick={self.onLanguageChanged().bind(this)}>
          			// {lang.name}
          		// </NavLink>*/}
	          // </li>
          // );
        // })}
			// </ul>


			<select onChange={this.changeLang.bind(this)} className='form-control'>
				{Object.keys(this.state.langs).map(function( slug, index ){
					const lang = langs[slug];
          return(
          	<option key={slug} value={slug}>{lang.name}</option>
          );
        })}
			</select>
		);
	}

	changeLang(e) {
		// console.log(e);
	}

	renderMenu() {
		let linkElems = [];
		const links = this.state.menu;
		const lang = this.state.lang;
		if(links) {
			linkElems = links.map( (link, i) => {
				return (
					<Link to={SiteSettings.path+link.slug} key={i}>{link.title}</Link>
				);
			});
		}
		return (
			<nav id='nav'>
				{linkElems}
			</nav>
		);
	}

	render() {
		let lang = this.state.lang;
		return(
			<header className='header'>
				<div className='max-width'>
					<div className='row'>
						
						<div className='col col-12 col-sm-6 col-md-5 left'>
							<div className='col-content'>
								<div id='title'>
									<h2 id="site-title">
										<Link to={SiteSettings.path}>Four Corners</Link>
									</h2>
								</div>
							</div>
						</div>

						<div className='col col-12 col-sm-6 col-md-7 right'>
							<div className='col-content'>
								{/*this.state.langs ? this.renderLangList() : this.renderEmpty()*/}
								{this.state ? this.renderMenu() : null}
							</div>
						</div>

					</div>
				</div>
			</header>
		)
	}

}

export default Header;