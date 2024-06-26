import React, { useEffect, useState } from 'react';
import ReactHtmlParser from 'react-html-parser';
import { CORNER_SLUGS } from '/src/utils/constants'

export default () => {
	const strings = siteSettings.current.strings;
	const [active, setActive] = useState('authorship')
	const [hovered, setHovered] = useState(null)

	const handleHover = e => {
		const slug = e.target.dataset.slug;
		setHovered(slug)
		setActive(slug)
	}

	const handleUnhover = e => {
		setHovered(null)
	}

	const handleClick = e => {

	}

	useEffect(() => {
		const cycleCorner = () => {
			setActive(curr => {
				const index = CORNER_SLUGS.indexOf(curr)
				const newIndex = index + 1 < CORNER_SLUGS.length ? index + 1 : 0
				return CORNER_SLUGS[newIndex]
			})
		}

		const interval = setInterval(cycleCorner, 2000)
		return () => clearInterval(interval)
	}, [hovered])

	return (
		<div className='fc-embed-demo'>
			{CORNER_SLUGS.map((slug, i) =>			
				<div
					key={i}
					className={`demo-corner-icon ${active === slug && !hovered ? 'active' : ''}`}
					// className={`demo-corner-icon ${hovered === slug || (active === slug && !hovered) ? 'active' : ''}`}
					data-slug={slug}
					data-index={i}
					onMouseOver={handleHover}
					onMouseLeave={handleUnhover}
					onClick={handleClick}
				/>
			)}
			{CORNER_SLUGS.map((slug, i) =>
				<div
					key={i}
					className={`demo-corner-title ${hovered === slug || (active === slug && !hovered) ? 'active' : ''}`}
				>
					{ReactHtmlParser(strings.demo[slug])}
				</div>
			)}
		</div>
	)
}