import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

class Backstory extends React.Component {

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

	renderBackstory(panelData) {
		const text = panelData.text;
		const textArray = text?text.split(/\n/g):[];
		let rows = [];		

		rows.push(
			textArray?
			<div className='fc-row' key={-1}>
				{textArray.map((str,i) => {
					return str ? <p key={i}>{str}</p> : <br key={i}/>
				})}
			</div>:''
		);

		panelData.media?
		panelData.media.map((obj,i) => {
			rows.push(
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
		}):'';

		return rows;
	}

	render() {
		const panelData = this.props.panelData;
		return (
			<React.Fragment>
				{panelData ? this.renderBackstory(panelData) : ''}
			</React.Fragment>
		);
	}

}

export default Backstory;