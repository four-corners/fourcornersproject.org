import React from 'react';
import { Link, NavLink } from 'react-router-dom';

import i18n from './i18n.jsx';

class Header extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			lang: 'en',
			langs: {},
		};
		this.onLanguageChanged = this.onLanguageChanged.bind(this);
	}

	componentDidMount() {
		let that = this;
		let lang = i18n.language;
		let req = SiteSettings.url.api + 'get_langs';
		fetch(req)
			.then(function(res) {
				if (!res.ok) {
					throw Error(res.statusText);
				}
				// return console.log(res);
				return res.json();
			})
			.then(function(res) {
				that.setState({ langs: JSON.parse(res) });
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
		console.log(e);
	}

	render() {
		let lang = this.state.lang;
		return(
			<header className='header'>
				<div className='max-width'>
					<div className='row'>
						<div className='col col-12 col-sm-12 col-md-6 left'>
							<div className='col-content'>
								<div id='title'>
									{
									// <h1 id="page-title">
									// 	<Link to={SiteSettings.path}>Create your own</Link>
									// </h1>
									}
									<h1 id="site-title">
										<Link to={SiteSettings.path}>Four Corners</Link>
									</h1>
								</div>
							</div>
						</div>
						<div className='col col-12 col-sm-12 col-md-6 right'>
							<div className='col-content'>
								{/*this.state.langs ? this.renderLangList() : this.renderEmpty()*/}
								<nav id='nav'>
									<Link to='#'>About</Link>
									<Link to='#'>How Does It Work</Link>
									<Link to={SiteSettings.path+'creator'}>Create Your Own</Link>
									<Link to='#'>Gallery</Link>
									<Link to='#'>Contact</Link>
								</nav>
							</div>
						</div>
					</div>
				</div>
			</header>
		)
	}

}

export default Header;