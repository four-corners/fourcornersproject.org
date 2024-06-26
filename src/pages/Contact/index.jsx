import React from 'react'
import ReactHtmlParser from 'react-html-parser'

const Contact = () => {
	const page = siteSettings.current
	return (
		<main id='contact'>
			<h1>
				{ReactHtmlParser(page.post_title)}
			</h1>
			<div className='md-width'>
				<div className='row'>
					<div className='col col-12'>
						<div className='col-content'>
							{page.post_content ?
								<div className='content-block'>
									{ReactHtmlParser(page.post_content)}
								</div>
							: ''}
						</div>
					</div>
				</div>
			</div>
		</main>
	)
}

export default Contact