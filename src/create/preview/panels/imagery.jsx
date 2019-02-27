import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

class Imagery extends React.Component {

	constructor(props) {
		super(props);
	}

	renderMedia(obj, i) {
		const mediaData = this.props.mediaData;
		if(!mediaData||!mediaData[i]){return}
		if(obj.source == 'image') {
			return obj.url ? <div className='fc-media'><img src={obj.url}/></div> : '';
		} else {
			const html = mediaData[i].html;
			return html ? <div className='fc-media' dangerouslySetInnerHTML={{__html: html}}></div> : '';
		}
	}

	renderImagery(panelData) {
		let mediaRows = [];
		panelData.map((obj,i) => {
			mediaRows.push(
				<div className='fc-row' key={i}>
					{this.renderMedia(obj, i)}
					{obj.caption ?
					<div className='fc-sub-caption'>{obj.caption}</div>
					: ''}
					{obj.credit ?
					<div className='fc-sub-credit'>{obj.credit}</div>
					: ''}
				</div>
			);
		});
		return mediaRows;
	}

	render() {
		const panelData = this.props.panelData;
		return (
			<React.Fragment>
				{panelData&&panelData.media ? this.renderImagery(panelData.media) : ''}
			</React.Fragment>
		);
	}

}

export default Imagery;