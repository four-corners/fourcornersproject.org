import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

class Entry extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			// mediaData: {}
		};
	}

	componentDidMount() {
		
	}

	componentWillUnmount() {
		
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		// console.log(prevProps, this.props);
	}

	renderText(val) {
		const fieldsetKey = this.props.cornerSlug;
		const fieldKey = this.props.fieldSlug;
		if(!this.props.fieldData){return}
		let array = this.props.fieldData.split(/\n/g);
		let paragraphs = [];
		array.forEach(function(str, i) {
			paragraphs.push(<p key={i}>{str}</p>);
		});
		return <div className='fc-row-inner'>{paragraphs}</div>;
	}

	renderMedia() {
		const subRows = [];
		const fieldsetKey = this.props.cornerSlug;
		const fieldKey = this.props.fieldSlug;
		if(!this.props.fieldData){return}
		this.props.fieldData.forEach((obj, i) => {
			let subRowInner = '';
			if(obj.source == 'image' || !obj.source) {
				subRowInner = obj.url ? <img src={obj.url} alt=''/> : null;
			} else {
				const media = this.props.mediaData[i];
				subRowInner = media ? <div className='fc-media' dangerouslySetInnerHTML={{__html: media.html}} /> : null;
			}
			const mediaCaption = obj.caption ? <div className='fc-sub-caption'>{obj.caption}</div> : null;
			if(subRowInner||mediaCaption) {
				const subRow = <div className='fc-sub-row' key={i}>{subRowInner}{mediaCaption}</div>;
				subRows.push(subRow);
			}
		});
		return subRows.length ? <div className='fc-row-inner'>{subRows}</div> : null;
	}

	extractHostname(url) {
		let hostname;
		if(!url){return false}
		if(url.indexOf('//') > -1) {
		  hostname = url.split('/')[2];
		} else {
		  hostname = url.split('/')[0];
		}
		hostname = hostname.split(':')[0];
		hostname = hostname.split('?')[0];
		return hostname;
	}


	extractRootDomain(url) {
		if(!url){return false}
		let domain = this.extractHostname(url);
		let splitArr = domain.split('.');
		let arrLen = splitArr.length;
		if (arrLen > 2) {
			domain = splitArr[arrLen - 2] + '.' + splitArr[arrLen - 1];
			if (splitArr[arrLen - 2].length == 2 && splitArr[arrLen - 1].length == 2) {
				domain = splitArr[arrLen - 3] + '.' + domain;
			}
		}
		return domain;
	}

	renderLinks() {
		const subRows = [];
		this.props.fieldData.forEach((obj, i) => {
			const subRow = <div className='fc-sub-row' key={i}>
					<a href={obj.url} target='_blank'>{obj.title}</a>
					{obj.url ? <div className='fc-sub-url'>{this.extractRootDomain(obj.url)}</div> : ''}
				</div>;
			subRows.push(subRow);
		});
		return <div className='fc-row-inner'>{subRows}</div>;
	}

	// renderLinks() {
	// 	const subRows = [];
	// 	const fieldsetKey = this.props.cornerSlug;
	// 	const fieldKey = this.props.fieldSlug;
	// 	if(!this.props.fieldData){return}
	// 	this.props.fieldData.forEach((obj, i) => {
	// 		let subRowInner = '';
	// 		const subRow = <div className='fc-sub-row' key={i}>
	// 			{obj.title ? <div className='fc-sub-title'>{obj.title}</div> : ''}
	// 			<div className='fc-sub-url'>{this.wrapUrls(obj.url)}</div>
	// 		</div>;
	// 		subRows.push(subRow);
	// 	});
	// 	return <div className='fc-row-inner'>{subRows}</div>;
	// }

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
			case 'text':
				return this.renderText();
				break;
			default:
				return this.props.fieldData;
				break;
		}
	}

	render() {
		const cornerKey = this.props.cornerSlug;
		const fieldKey = this.props.fieldSlug;
		const entry = (this.props.fieldData ? this.renderEntry() : null);
		return entry ? <div className={'fc-row fc-'+fieldKey}>{entry}</div> : null;
	}
}

export default Entry;