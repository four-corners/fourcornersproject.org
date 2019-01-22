import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

class Entry extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			mediaData: {}
		};
	}

	componentDidMount() {
		
	}

	componentWillUnmount() {
		
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		// console.log(prevProps, this.props);
	}

	getMediaData(obj, fieldsetKey, index) {
		console.log(obj, fieldsetKey, index);
		const url = obj.url;
		const source = obj.source;
		// if(!isUrl(url)) {return}
		const that = this;
		const uri = encodeURIComponent(url);
		const mediaData = Object.assign({},this.state.mediaData);
		let req = '';
		mediaData[fieldsetKey] = [];
		switch(source) {
			case 'youtube':
				// req = 'https://www.youtube.com/oembed?url='+uri;
				req = 'https://noembed.com/embed?url='+uri;
				break;
			case 'vimeo':
				req = 'https://vimeo.com/api/oembed.json?url='+uri;
				break;
			case 'soundcloud':
				req = 'https://soundcloud.com/oembed?format=json&url='+uri;
				break;
			default:
				return false;
				break;
		}
		const headers = new Headers();
		console.log(req);
		fetch(req, {
				method: 'GET',
				headers: headers,
	      mode: 'cors',
	      cache: 'default'
	    })
			.then(res => {
				if (!res.ok) {throw Error(res.statusText)}
				return res.json();
			})
			.then(res => {
				// let mediaData = this.state.mediaData;
				mediaData[fieldsetKey][index] = {
					html:res.html,
					width: res.width,
					height: res.height
				}
				this.setState({mediaData: mediaData});
				// this.props.sendMediaData(mediaData);
			})
			.catch(function(err) {
				console.log(err);
			});
	}

	renderMedia() {
		const subRows = [];
		const fieldsetKey = this.props.cornerSlug;
		const fieldKey = this.props.fieldSlug;
		// const mediaData = Object.assign({}, this.props.mediaData);
		const mediaData = this.state.mediaData;
		if(!this.props.fieldData){return}
		this.props.fieldData.forEach((obj, i) => {
			let subRowInner = '';
			if(obj.source == 'image') {
				subRowInner = obj.url ? <img src={obj.url} alt=''/> : false;
			} else {
				subRowInner = this.getMediaData(obj, fieldsetKey, i);
			}
			//  else if(mediaData&&mediaData[i]) {
			// 	const media = mediaData[i];
			// 	subRowInner = media ? <div className='fc-media' dangerouslySetInnerHTML={{__html: media.html}} /> : false;
			// }
			const mediaCaption = obj.caption ? <div className='fc-sub-caption'>{obj.caption}</div> : '';
			const subRow = <div className='fc-sub-row' key={i}>{subRowInner}{mediaCaption}</div>;
			
			subRows.push(subRow);
		});
		return <div className='fc-sub-rows'>{subRows}</div>;
	}

	renderLinks() {
		const subRows = [];
		this.props.fieldData.forEach((obj, i) => {
			if(!obj.url){return;}
			const subRow = <div className='fc-sub-row' key={i}>
				{obj.title ? <div className='fc-sub-title'>{obj.title}</div> : ''}
				<div className='fc-sub-url'>{obj.url}</div>
			</div>;
			subRows.push(subRow);
		});
		return <div className='fc-sub-rows'>{subRows}</div>;
	}

	renderLicense() {
		const url = this.props.fieldData;
		let text = 'License this photo';
		let link = <span>{text} <a href={url} target='_blank'>{url}</a></span>
		return link;
	}

	renderEntry() {
		switch(this.props.fieldSlug) {
			case 'media':
				return this.renderMedia();
				break;
			case 'links':
				return this.renderLinks();
				break;
			case 'license':
				return this.renderLicense();
				break;
			default:
				return this.props.fieldData;
				break;
		}
	}

	render() {
		const cornerKey = this.props.cornerSlug;
		const fieldKey = this.props.fieldSlug;
		return(
			<div className={'fc-row fc-'+fieldKey}>
				{this.props.fieldData ? this.renderEntry() : ''}
			</div>
		);
	}
}

export default Entry;