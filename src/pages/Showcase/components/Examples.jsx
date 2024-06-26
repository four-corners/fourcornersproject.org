import React from 'react'
import ReactHtmlParser from 'react-html-parser'

const Examples = ({ title, examples = [] }) => {

	return (
		<div
			id='examples'
			className='col-content'
		>
			<h2>
				{title}
			</h2>
			<ul>
				{examples.map((example, i) =>
					<li
						key={i}
						className='example'
					>
						<div>
							<strong>{example.source}</strong>
						</div>
						<a
							href={example.url}
							target='_blank'
							className='md-text'
						>
							<strong>{example.title}</strong>
						</a>
						<div>
							{ReactHtmlParser(example.desc)}
						</div>
					</li>
				)}
			</ul>
		</div>
	)
}

export default Examples