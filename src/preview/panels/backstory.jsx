import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

class Backstory extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		const panelData = this.props.panelData;	
		const text = panelData.text;
		const textArray = text?text.split(/\n/g):[];
		return (
			textArray&&textArray.length ?
			<div className='fc-row'>
				{textArray.map((str,i) => {
					return (
						str ? <p key={i}>{str}</p> : <br key={i}/>
					);
				})}
			</div> : null
		);
	}

}

export default Backstory;