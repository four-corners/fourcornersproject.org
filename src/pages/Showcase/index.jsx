import './style.scss'
import React from 'react'
import ReactHtmlParser from 'react-html-parser'
import Examples from './components/Examples'
import Gallery from './components/Gallery'

const Showcase = () => {
	const page = siteSettings.current
	return (
		<main id='showcase'>
			<div className='max-width'>
				<h1>{ReactHtmlParser(page.post_title)}</h1>
				<div className='col-content md-text'>
					{page.post_content ? ReactHtmlParser(page.post_content) : ''}
				</div>
				<Examples
					title={page.strings.examples_title}
					examples={page.strings.examples}
				/>
				<Gallery
					title={page.strings.embeds_title}
					embeds={page.strings.embeds}
				/>
			</div>
		</main>
	)
}

export default Showcase