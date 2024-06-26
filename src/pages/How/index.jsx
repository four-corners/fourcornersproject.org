import './how.scss'
import React from 'react'
import ReactHtmlParser from 'react-html-parser'
import { CORNER_SLUGS } from '/src/utils/constants'
import HowRow from './components/HowRow'

const How = () => {
	const embeds = {}
	const embedHtmls = {}
	const page = siteSettings.current
	const strings = siteSettings.current.strings

	return (
		<main id='how'>
			<div className='max-width'>
				<h1>{ReactHtmlParser(page.post_title)}</h1>
				<div id='how-intro' className='row'>
					<div className='col col-12'>
						<div className='col-content'>
							<div className='content-block md-text'>
								{ReactHtmlParser(page.post_content)}
							</div>
						</div>
					</div>
				</div>
				{CORNER_SLUGS.map((slug, i) =>
					<HowRow
						key={i}
						index={i}
						slug={slug}
					/>
				)}
			</div>
		</main>
	)
}

export default How