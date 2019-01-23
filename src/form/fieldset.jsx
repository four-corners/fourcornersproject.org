import Text from './text.jsx';
import Textarea from './textarea.jsx';
import File from './file.jsx';
import Select from './select.jsx';
import Blocks from './blocks.jsx';

import React from 'react';
// import PropTypes from 'prop-types';

// import { asNumber } from 'react-jsonschema-form/lib/utils';

class Fieldset extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			expand: false
		};
	}

	componentDidMount() {

	}

	componentWillUnmount() {

	}

	componentDidUpdate() {

	}

	toggleExpand() {
		this.setState({
			expand: !this.state.expand
		});
	}

	renderFields() {
		// const components = [
		// 	'text': Text,
		// 	'textarea': Textarea,
		// 	'toggle': Toggle,
		// 	'select': Select,
		// 	'file': File,
		// 	'blocks': Blocks
		// ];

		const fields = this.props.data.fields;
		const fieldKeys = Object.keys(fields);
		const fieldElems = [];

		for(let fieldKey of fieldKeys) {
			const field = fields[fieldKey];
			switch(field.type) {
				case 'text':
					fieldElems.push(
						<Text
							id={fieldKey}
							fieldset={this.props.id}
							data={field}
							key={fieldElems.length}
							onChange={this.props.onChange} />
					)
					break;
				case 'textarea':
					fieldElems.push(
						<Textarea
							id={fieldKey}
							fieldset={this.props.id}
							data={field}
							key={fieldElems.length}
							onChange={this.props.onChange} />
					)
					break;
				case 'toggle':
					// fieldElems.push(<Toggle id={'1'} data={field} key={fieldElems.length}/>)
					break;
				case 'select':
					fieldElems.push(
						<Select
							id={fieldKey}
							fieldset={this.props.id}
							data={field}
							key={fieldElems.length}
							onChange={this.props.onChange} />
					)
					break;
				case 'file':
					fieldElems.push(
						<File
							id={fieldKey}
							fieldset={this.props.id}
							data={field}
							key={fieldElems.length}
							onChange={this.props.onChange} />
					)
					break;
				case 'blocks':
					fieldElems.push(
						<Blocks
							id={fieldKey}
							fieldset={this.props.id}
							data={field}
							key={fieldElems.length}
							onChange={this.props.onChange}
							sendMediaData={this.props.sendMediaData}/>
					)
					break;
				default:
					break;
			}
			// const field = <Field id={fieldKey} key={fieldKey}/>;
		}
		return fieldElems;
	}

	render() {
		const data = this.props.data;
		const text = data.text;
		return (
			<fieldset id={this.props.id} className={this.state.expand ? 'expand' : 'collapse'}>
				<legend onClick={this.toggleExpand.bind(this)}>
					<span>{text.title}</span>
				</legend>
				<div className='fieldset-inner'>
					{this.renderFields()}
				</div>
			</fieldset>
		);
	}
}

export default Fieldset;