import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server'

import Schema from './schema.jsx';

class Entry extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
	
		};
	}

	render() {
		const value = this.props.formData[this.props.slug];
		console.log(this.props.formData);
		return(
			<div className={value ? '':'empty'}>
				<span className='label'>{this.props.slug}</span>
				<span className='value'>{value}</span>
			</div>
		);
	}
}

export default Entry;