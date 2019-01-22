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

	renderMedia() {
		const subRows = [];
		const fieldsetKey = this.props.cornerSlug;
		const fieldKey = this.props.fieldSlug;
		// const mediaData = Object.assign({}, this.props.mediaData);
		// const mediaData = this.state.mediaData;
		if(!this.props.fieldData){return}
		this.props.fieldData.forEach((obj, i) => {
			let subRowInner = '';
			if(obj.source == 'image') {
				subRowInner = obj.url ? <img src={obj.url} alt=''/> : false;
			} else {
				const media = this.props.mediaData[i];
				subRowInner = media ? <div className='fc-media' dangerouslySetInnerHTML={{__html: media.html}} /> : false;
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