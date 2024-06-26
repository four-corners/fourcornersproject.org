import React, { useEffect } from 'react'
import Masonry from 'masonry-layout'
import FourCorners from '@four-corners/fourcorners.js'

const Gallery = ({ title, embeds = [] }) => {

	useEffect(() => {
		const grid = new Masonry('#gallery-embeds', {
			itemSelector: '.embed-col',
			transitionDuration: 0,
			gutter: 0
		})

		const elems = document.querySelectorAll('.fc-embed')
		elems.forEach(elem => {
			const fc = new FourCorners(elem)
			const img = fc.elems.img
			const embed = fc.elems.embed
			if(!img.classList.contains('loaded')) {
				img.onload = function(e) {
					grid.layout()
					img.classList.add('loaded')
				}
			}
		})
	}, [])

	return (
		<div
			id='gallery'
			className='col-content'
		>
			<h2>
				{title}
			</h2>
			<div
				id='gallery-embeds'
				className='row'
			>
				{embeds.map((embed, i) =>
					<div
						key={i}
						className='embed-col col col-12 col-xl-6'
					>
						<div className='embed-wrap'>
							<h3>{embed.title}</h3>
							<div
								dangerouslySetInnerHTML={{
									__html: embed.embed_code
								}}
							/>
						</div>
					</div>
				)}
			</div>
		</div>
	)
}

export default Gallery