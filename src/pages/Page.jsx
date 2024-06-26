import React from 'react'
import ReactHtmlParser from 'react-html-parser'

// import i18n from '/src/utils/i18n'

const Page = () => {
	const page = siteSettings.current

	return (
		<main id={page.post_name}>
			<div className='max-width'>
				<h1>{ReactHtmlParser(page.post_title)}</h1>
				<div className='row'>
					<div className='col col-12'>
						<div className='col-content'>
							{page.post_content ? ReactHtmlParser(page.post_content) : ''}
						</div>
					</div>
				</div>
			</div>
		</main>
	)
}

export default Page