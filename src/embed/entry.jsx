import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

class Entry extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			embedData: {
				authorship:{},
				backstory:{},
				context:{},
				links:{}
			}
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
		const cornerSlug = this.props.cornerSlug;
		const fieldSlug = this.props.fieldSlug;
		const cornerData = Object.assign({}, this.state.embedData[cornerSlug]);
		const mediaData = Object.assign({}, this.props.mediaData);
		if(!this.props.fieldData){return}
		this.props.fieldData.forEach((obj, i) => {
			let subRowInner = '';
			if(obj.type == 'image') {
				subRowInner = obj.url ? <img src={obj.url} alt=''/> : false;
			} else if(mediaData&&mediaData[i]) {
				const media = mediaData[i];
				// if(Number.isInteger(media.width*media.height)) {
					// console.log(media.width/media.height);
				// }
				subRowInner = media ? <div className='fc-media' dangerouslySetInnerHTML={{__html: media.html}} /> : false;
			}
			const mediaCredit = obj.credit ? <div className='fc-sub-credit'>{obj.credit}</div> : '';
			const subRow = <div className='fc-sub-row' key={i}>{subRowInner}{mediaCredit}</div>;
			
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
		const cornerSlug = this.props.cornerSlug;
		const fieldSlug = this.props.fieldSlug;

		return(
			<div className='fc-row'>
				{this.props.fieldData ? <div className='fc-value'>{this.renderEntry()}</div> : ''}
			</div>
		);
	}
}

export default Entry;