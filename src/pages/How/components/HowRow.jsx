import React, { useEffect } from 'react'
import FourCorners from '@four-corners/fourcorners.js';
import ReactHtmlParser from 'react-html-parser';

const HowRow = ({ index, slug }) => {
	const page = siteSettings.current
	const strings = siteSettings.current.strings

	const side = index % 2 == 0;
	const rowClass = `row how-block ${side ? '' : 'reverse'}`;
	const rowData = {};
	['title', 'desc', 'embed'].forEach((key, i) => {
		if(page && page.strings && page.strings[`${slug}_${key}`]) {
			rowData[key] = page.strings[`${slug}_${key}`];
		} else {
			rowData[key] = '';
		}
	});

	useEffect(() => {
		const fcEmbedContainer = document.querySelector(`.embed-wrapper[data-slug="${slug}"] .fc-embed`);
		const fcEmbed = new FourCorners(fcEmbedContainer);
		setTimeout(() => fcEmbed.openPanel(slug))
	}, [])

	return (
		<div
			className={rowClass}
		>
			<div className='col col-12 col-md-5 left'>
				<div className='col-content'>
					<h2
						dangerouslySetInnerHTML={{
							__html: rowData.title
						}}
					/>
					{ReactHtmlParser(rowData.desc)}
				</div>
			</div>

			<div className='col col-12 col-md-7 right'>
				<div className='col-content'>
					<div
						className='embed-wrapper'
						data-slug={slug}
						dangerouslySetInnerHTML={{
							__html: rowData.embed
						}}
					/>
				</div>
			</div>
		</div>
	)
}

export default HowRow