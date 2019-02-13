import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

class Authorship extends React.Component {

	constructor(props) {
		super(props);
	}

	createLink(href, text, classes = []) {
		if(!text){text=this.extractRootDomain(href)}
		if(href.indexOf('@')>-1){href='mailto:'+href}
		return (
			<a href={href} target="_blank" className={classes.join(' ')}>{text}</a>
		);
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

	extractRootDomain(url)  {
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

	render() {
		const panelData = this.props.panelData;	
		return (

			<React.Fragment>

				{panelData['caption']||panelData['credit']||panelData['ethics'] ?
				<div className="fc-row">
			
					{panelData['caption'] ?
						<div className="fc-field">
							<em>{panelData['caption']}</em>
						</div>: ''}
					
					{panelData['credit'] ?
						<div className="fc-field">
							<span className="fc-label">Photograph by</span>
							{panelData['credit']}
						</div>: ''}
					
					{panelData['ethics'] ?
						<div className="fc-field">
							<span className="fc-label">Code of ethics</span>
							{panelData['ethics']}
						</div>: ''}

				</div> : ''}

				{panelData['bio']||panelData['website']||panelData['info-contact']||panelData['rights-contact'] ?
				<div className="fc-row fc-about">

					<div className="fc-about-label">About the photographer</div>
						{panelData['bio'] ?
						<div className="fc-field">
							{panelData['bio']}
						</div>: ''}

					<div className="fc-field fc-contact">

						{panelData['website'] ?
						<div className="fc-field fc-card fc-half">
							<div className="fc-label">Website</div>
							{this.createLink(panelData['website'])}
						</div>: ''}

						{panelData['info-contact'] ?
						<div className="fc-field fc-card fc-half">
							<div className="fc-label">For more info contact</div>
							{this.createLink(panelData['info-contact'])}
						</div>: ''}

						{panelData['rights-contact'] ?
						<div className="fc-field fc-card fc-half">
							<div className="fc-label">For reproduction rights contact</div>
							{this.createLink(panelData['rights-contact'])}
						</div>: ''}

					</div>

				</div> : ''}

			</React.Fragment>
			
		);
	}

}

export default Authorship;