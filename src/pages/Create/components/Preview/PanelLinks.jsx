import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { extractRootDomain } from '/src/utils/helpers';

class Links extends React.Component {

	constructor(props) {
		super(props);
	}

	createLink(href, text, classes = []) {
		if(!text){text=extractRootDomain(href)}
		if(href&&href.indexOf('@')>-1){href='mailto:'+href}
		return (
			<a href={href} target="_blank" className={classes.join(' ')}>{text}</a>
		);
	}

	renderLinks(links) {
		let linkRows = [];
		links.forEach((link,i) => {
			const rootUrl = extractRootDomain(link.url);
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