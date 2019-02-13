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
		return <div className='fc-row'>{paragraphs}</div>;
	}

	renderMedia() {
		const rows = [];
		const fieldsetKey = this.props.cornerSlug;
		const fieldKey = this.props.fieldSlug;
		if(!this.props.fieldData){return}
		this.props.fieldData.forEach((obj, i) => {

			if(obj.deleted) {return}
			
			let mediaWrap = '';
			if(obj.source == 'image' || !obj.source) {
				mediaWrap = obj.url ? <div className='fc-media'><img src={obj.url} alt=''/></div> : null;
			} else {
				const media = this.props.mediaData[i];
				mediaWrap = media ? <div className='fc-media' dangerouslySetInnerHTML={{__html: media.html}} /> : null;
			}
			const mediaCaption = obj.caption ? <div className='fc-sub-caption'>{obj.caption}</div> : null;
			if(mediaWrap||mediaCaption) {
				const row = <div className='fc-row' key={i}>{mediaWrap}{mediaCaption}</div>;
				rows.push(row);
			}
		});
		return rows.length ? rows : null;
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
		const rows = [];
		this.props.fieldData.forEach((obj, i) => {
			const row = obj.title||obj.url ?
				<div className='fc-row' key={i}>
					<a href={obj.url} target='_blank' className='fc-card'>
						{obj.title}
						{obj.url ? <div className='fc-sub-url'>{this.extractRootDomain(obj.url)}</div> : ''}
					</a>
				</div> : null;
			if(row) { rows.push(row) }
		});
		return rows;
	}

	// renderLinks() {
	// 	const rows = [];
	// 	const fieldsetKey = this.props.cornerSlug;
	// 	const fieldKey = this.props.fieldSlug;
	// 	if(!this.props.fieldData){return}
	// 	this.props.fieldData.forEach((obj, i) => {
	// 		let mediaWrap = '';
	// 		const row = <div className='fc-sub-row' key={i}>
	// 			{obj.title ? <div className='fc-sub-title'>{obj.title}</div> : ''}
	// 			<div className='fc-sub-url'>{this.wrapUrls(obj.url)}</div>
	// 		</div>;
	// 		rows.push(row);
	// 	});
	// 	return <div className='fc-row-inner'>{rows}</div>;
	// }


	renderEntry() {
		switch(this.props.fieldSlug) {
			case 'media':
				return this.renderMedia();
				break;
			case 'links':
				return this.renderLinks();
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
		return entry ? entry : null;
	}
}

export default Entry;