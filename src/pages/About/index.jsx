import React from 'react'
import ReactHtmlParser from 'react-html-parser'

const About = () => {
	const page = siteSettings.current

	return (
		<main id='about'>
			<div className='max-width'>
				<h1>
					{ReactHtmlParser(page.post_title)}
				</h1>
				<div className='row'>

					<div className='col col-12 col-md-6'>
						<div className='col-content'>
							{page.post_content ?
								<div className='content-block'>
									{ReactHtmlParser(page.post_content)}
								</div>
							: ''}
							<div className='content-block'>
								{ReactHtmlParser(page.strings.desc)}
							</div>
						</div>
					</div>

					<div className='col col-12 col-md-6'>
						<div className='col-content'>
							{page.strings.contributors.map((contrib, i) =>
								<div
									key={i}
									className='contrib-block'
								>
									<h3>{contrib.name}</h3>
									{contrib.role ?
										<h4>{contrib.role}</h4>
									: ''}
									{ReactHtmlParser(contrib.bio)}
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</main>
	)
}

export default About