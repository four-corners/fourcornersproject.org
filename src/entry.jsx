import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

class Entry extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
	
		};
	}

	getYouTubeUrl(url) {
	  var ID = '';
	  url = url.replace(/(>|<)/gi,'').split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
	  if(url[2] !== undefined) {
	    ID = url[2].split(/[^0-9a-z_\-]/i);
	    ID = ID[0];
	  } else {
	    ID = url;
	  }
	  const embedUrl = 'https://www.youtube.com/embed/'+ID;
	  return embedUrl;
	}

	renderMedia() {
		const subRows = [];
		this.props.fieldData.forEach((obj, i) => {
			if(!obj.url){return;}
			let media = '';
			switch(obj.type) {
				case 'image':
					media = <img src={obj.url} alt=''/>
					break;
				case 'youtube':
					media = <iframe src={this.getYouTubeUrl(obj.url)} frameBorder='0' allow='accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture' allowFullScreen></iframe>
					break;
				case 'vimeo':
					
					break;
				case 'soundcloud':
					
					break;
				default:
					return false;
					break;
			}
			const subRow = <div className='fc-sub-row' key={i}>
				{media}
				{obj.credit ? <div className='fc-sub-credit'>{obj.credit}</div> : ''}
			</div>;
			subRows.push(subRow);
		});
		return <div className='fc-sub-rows'>{subRows}</div>;
	}

	renderLinks() {
		const subRows = [];
		this.props.fieldData.forEach((obj, i) => {
			if(!obj.url){return;}
			let link = <img src={obj.url} alt=''/>
			const subRow = <div className='fc-sub-row' key={i}>
				{obj.title ? <div className='fc-sub-title'>{obj.title}</div> : ''}
				<div className='fc-sub-url'>{obj.url}</div>
			</div>;
			subRows.push(subRow);
		});
		return <div className='fc-sub-rows'>{subRows}</div>;
	}

	renderEntry() {
		switch(this.props.fieldSlug) {
			case 'media':
				return this.renderMedia();
				break;
			case 'links':
				return this.renderLinks();
				break;
			default:
				return this.props.fieldData;
				break;
		}
	}

	render() {
		return(
			<div className={this.props.fieldData ? 'fc-row' : 'fc-row fc-empty'}>
				{this.props.fieldLabel ? <div className='fc-label'>{this.props.fieldLabel}</div> : '' }
				{this.props.fieldData ? <div className='fc-value'>{this.renderEntry()}</div> : '' }
			</div>
		);
	}
}

export default Entry;