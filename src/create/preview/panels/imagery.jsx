import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { extractRootDomain } from './../../../utils';

class Imagery extends React.Component {

	constructor(props) {
		super(props);
	}

	renderMedia(obj, i) {
		const mediaData = this.props.mediaData;
		if(!mediaData){return}
		const mediaObj = mediaData[i];
		if(!mediaObj){return}
		let className = 'fc-media', style;
		if(mediaObj.source == 'image' || mediaObj.source == 'instagram') {
			const url = mediaObj.url;
			return url ? <div className={className}><img src={url}/></div> : '';
		} else {
			if(Number.isInteger(mediaObj.width, mediaObj.height)) {
				const ratio = mediaObj.height/mediaObj.width;
				className += ' fc-responsive';
				style = {paddingBottom:(ratio*100)+'%'};
			}
			let htmlObj = mediaObj.html ? <div className={className} style={style} dangerouslySetInnerHTML={{__html: mediaObj.html}}></div> : <React.Fragment></React.Fragment>;
			return htmlObj ? htmlObj : '';
		}
	}

	renderImagery(panelData) {
		const mediaData = this.props.mediaData;
		let mediaRows = [];
		panelData.map((obj,i) => {
			const mediaHtml = this.renderMedia(obj, i),
						isExternal = ['instagram', 'youtube', 'vimeo'].includes(obj.source),
						mediaObj = mediaData ? mediaData[i] : null,
						isLoaded = mediaObj ? mediaObj.loaded : false;
			if(obj.url || obj.caption || obj.credit) {
				mediaRows.push(
					<div className='fc-row' key={i}>
						{mediaHtml}
						{obj.caption ?
							<div className='fc-sub-caption'>{obj.caption}</div>
						: ''}
						{obj.credit || isExternal ?
							<div className='fc-sub-credit'>
								{isLoaded && isExternal && obj.url ?
									<a href={obj.url} target="_blank">{obj.credit || 'View on '+extractRootDomain(obj.url)}</a>
								: obj.credit}
							</div>
						: ''}
					</div>
				);
			}
		});
		return mediaRows;
	}

	render() {
		const panelData = this.props.panelData;
		return (
			<React.Fragment>
				{panelData && panelData.media ? this.renderImagery(panelData.media) : ''}
			</React.Fragment>
		);
	}

}

export default Imagery;