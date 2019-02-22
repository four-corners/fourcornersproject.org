import Text from './text.jsx';
import Textarea from './textarea.jsx';
import File from './file.jsx';
import Select from './select.jsx';
import Blocks from './blocks.jsx';
import Group from './group.jsx';
import Checkbox from './checkbox.jsx';
import Toggle from './toggle.jsx';

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
		// this.setState({
		// 	expand: !this.state.expand
		// });
	}

	onToggle() {
		const setKey = this.props.setKey;
		const newActiveFieldset = setKey==this.props.activeFieldset?null:setKey;
		if(newActiveFieldset) {
			this.props.sendActiveCorner(newActiveFieldset);
		}
		this.props.sendActiveFieldset(newActiveFieldset);
	}

	renderFields() {
		const fields = this.props.data.fields;
		const fieldKeys = Object.keys(fields);
		const fieldElems = [];

		for(let fieldKey of fieldKeys) {
			const field = fields[fieldKey];
			const setKey = this.props.setKey;
			const index = fieldElems.length;
			switch(field.type) {
				case 'text':
					fieldElems.push(
						<Text
							key={index}
							setKey={setKey}
							fieldKey={fieldKey}
							field={field}
							onChange={this.props.onChange} />
					);
					break;
				case 'textarea':
					fieldElems.push(
						<Textarea
							key={index}
							setKey={setKey}
							fieldKey={fieldKey}
							field={field}
							onChange={this.props.onChange} />
					);
					break;
				case 'checkbox':
					fieldElems.push(
						<Checkbox
							key={index}
							setKey={setKey}
							fieldKey={fieldKey}
							field={field}
							onChange={this.props.onChange} />
					);
					break;
				case 'select':
					fieldElems.push(
						<Select
							key={index}
							setKey={setKey}
							fieldKey={fieldKey}
							field={field}
							onChange={this.props.onChange} />
					);
					break;
				case 'file':
					fieldElems.push(
						<File
							key={index}
							setKey={setKey}
							fieldKey={fieldKey}
							field={field}
							onChange={this.props.onChange}
							sendImgData={this.props.sendImgData} />
					);
					break;
				case 'blocks':
					fieldElems.push(
						<Blocks
							setKey={setKey}
							fieldKey={fieldKey}
							field={field}
							key={fieldElems.length}
							onChange={this.props.onChange}
							sendActiveCorner={this.props.sendActiveCorner}
							sendMediaData={this.props.sendMediaData} />
					);
					break;
				case 'group':
					fieldElems.push(
						<Group
							setKey={setKey}
							fieldKey={fieldKey}
							field={field}
							key={fieldElems.length}
							onChange={this.props.onChange}
							sendMediaData={this.props.sendMediaData} />
					);
					break;
				case 'toggle':
					fieldElems.push(
						<Toggle
							setKey={setKey}
							fieldKey={fieldKey}
							field={field}
							key={fieldElems.length}
							onChange={this.props.onChange}
							sendMediaData={this.props.sendMediaData} />
					);
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
		const setKey = this.props.setKey;
		const strings = data.strings;
		const expand = setKey==this.props.activeFieldset;
		return (
			<fieldset id={setKey} className={expand?'expand':'collapse'}>
				<legend onClick={this.onToggle.bind(this)}>
					<span>{strings.title}</span>
				</legend>
				<div className='fieldset-inner'>
					{strings.desc ? <div className='fieldset-desc desc'>{strings.desc}</div> : '' }
					{this.renderFields()}
				</div>
			</fieldset>
		);
	}
}

export default Fieldset;