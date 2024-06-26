import React, { useEffect, useState } from 'react';
import ReactHtmlParser from 'react-html-parser';
import { render } from 'react-dom';
import { Link, NavLink } from 'react-router-dom';
import i18n from '/src/utils/i18n';
import NotFound from '/src/pages/NotFound';
import Demo from './components/Demo';
import Subscribe from './components/Subscribe';

import "./style.scss";

const Home = () => {
	const [lang, setLang] = useState(i18n.language)
	const [info, setInfo] = useState({})
	// const [page, setPage] = useState({})
	const [options, setOptions] = useState({})
	const page = siteSettings.current;
	const strings = siteSettings.current.strings;

	const get = async type =>
		await fetch(siteSettings.url.api+type)
			.then(function(res) {
				if (!res.ok) {
					throw Error(res.statusText);
				}
				return res.json();
			})

			

	// const updatePage = async () => {
	// 	const pageRes = await get(`page?slug=home&lang=${lang}`)
	// 	setPage(pageRes)
	// }

	const updateInfo = async () => {
		const infoRes = await get('info')
		setInfo(infoRes)
	}

	const updateOptions = async () => {
		const optionsRes = await get('options')
		setInfo(optionsRes)
	}

	const handleLanguageChanged = lang => {
		setLang(lang)
	}

	useEffect(() => {
		updateInfo()
		updateOptions()
		i18n.on('languageChanged', handleLanguageChanged)
		return () => i18n.off('languageChanged', handleLanguageChanged)
	}, [])


	return (
		<main id='home'>
			<section id="home-intro">
				<div className='max-width'>
					<div className='row'>
						<div className='col col-12'>
							<div className='col-content'>
								<h1 id='site-tagline'>
									{strings.tagline}
								</h1>
							</div>
						</div>
						<div className='col col-12 col-md-6'>
							<div className='col-content'>
								<Demo />
							</div>
						</div>
						<div className='col col-12 col-md-6'>
							<div className='col-content'>
								<div className='actions'>
									{strings.top_action_buttons.map((button, i) =>
										<a
											key={i}
											href={button.link}
											className='action-button'
										>
											<div className='action-text'>
												{button.text}
											</div>
										</a>
									)}
								</div>
								<div id='home-subscribe'>
									<Subscribe
										label={
											<h3>
												<strong>
													{strings.newsletter_title}
												</strong>
											</h3>
										}
										formUrl={options.subscribe}
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
			<section id='home-about'>
				<div className='max-width'>
					<div className='row'>
						<div className="col col-12">
							{ReactHtmlParser(page.post_content)}
						</div>
					</div>
				</div>
			</section>

			<section id='intro-end'>
				<div className='max-width'>
					<div className='row'>
						{strings.bottom_action_buttons.map((button, i) =>
							<div
								key={i}
								className='col col-12 col-sm-6 left'
							>
								<div className='col-content'>
									<a
										href={button.link}
										className='action-button full'
									>
										<div className='action-text'>
											{button.text}
										</div>
									</a>
								</div>
							</div>
						)}
					</div>
				</div>
			</section>
		</main>
	)
};

export default Home;