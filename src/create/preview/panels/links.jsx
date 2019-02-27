import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

class Links extends React.Component {

	constructor(props) {
		super(props);
	}

	createLink(href, text, classes = []) {
		if(!text){text=this.extractRootDomain(href)}
		if(href&&href.indexOf('@')>-1){href='mailto:'+href}
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

	renderLinks(links) {
		let linkRows = [];
		links.forEach((link,i) => {
			const rootUrl = this.extractRootDomain(link.url);
			const text = link.url||link.title ?
				<React.Fragment>
					<span>{link.title?link.title:rootUrl}</span>
					<div className='fc-sub-url'>{rootUrl}</div>
				</React.Fragment> : '';
			linkRows.push(
				<div className="fc-row" key={i}>
					{this.createLink(link.url,text,['fc-card'])}
				</div>
			);
		});
		return linkRows;
	}

	render() {
		const panelData = this.props.panelData;	
		const links = panelData.links;
		return (
			<React.Fragment>
				{links ? this.renderLinks(links) : ''}
			</React.Fragment>
			
		);
	}

}

export default Links;