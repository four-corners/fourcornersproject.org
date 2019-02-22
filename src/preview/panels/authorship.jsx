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
		const hasCopyright = panelData.license&&panelData.license.type=='copyright';
		return (

			<React.Fragment>

				<div className="fc-row">
			
					{panelData.caption ?
						<div className="fc-field" data-fc-field="caption">
							<em>{panelData.caption}</em>
						</div>: ''}
					
					{hasCopyright||panelData.credit ?
					<div className="fc-field" data-fc-field="credit">
						<div className="fc-content">
							{hasCopyright ?
								<span className="fc-copyright">
									{panelData.license.year ?
										<span>{panelData.license.year}</span>
									: ''}
									<span>
										{panelData.credit ?
											panelData.credit
										: ''}
										{panelData.license.holder ?
											(panelData.credit ? '/' : '')+(panelData.license.holder)
										: ''}
									</span>

								</span>
							:<span>{panelData.credit}</span>}
						</div>
					</div> : ''}

					{panelData.license &&
					panelData.license.type=='commons' ?
						<div className="fc-field" data-fc-field="license">
							<span className="fc-label">License</span>
							<span className="fc-content">
								{panelData.license.url ?
								<a href={panelData.license.url} target="_blank">
									{panelData.license.label ? panelData.license.label : ''}
								</a> :
								panelData.license.label ? panelData.license.label : ''}
							</span>
						</div> : ''}
					
					{panelData.ethics ?
						<div className="fc-field" data-fc-field="ethics">
							<span className="fc-label">Code of ethics</span>
							<span className="fc-content">
								<div className="fc-sub-caption">{panelData.ethics.desc}</div>
							</span>
						</div> : ''}


					{panelData.bio ?
					<div className="fc-field" data-fc-field="bio">
						<span className="fc-label">Bio</span>
						<div className="fc-content">{panelData.bio}</div>
					</div>: ''}

				<div className="fc-field fc-contact">

					{panelData.website ?
					<div className="fc-field fc-card" data-fc-field="website">
						<div className="fc-label">Website</div>
						<div className="fc-content">{this.createLink(panelData.website)}</div>
					</div>: ''}

					{panelData.contact ? 

						(panelData.contact.info ?
						<div className="fc-field fc-card" data-fc-field="contact-info">
							<div className="fc-label">For more info contact</div>
							<div className="fc-content">{this.createLink(panelData.contact.info)}</div>
						</div>: '')

						(panelData.contact.rights ?
						<div className="fc-field fc-card" data-fc-field="contact-rights">
							<div className="fc-label">For reproduction rights contact</div>
							<div className="fc-content">{this.createLink(panelData.contact.rights)}</div>
						</div>: '')

					: ''}

				</div>

			</div>

			</React.Fragment>
			
		);
	}

}

export default Authorship;