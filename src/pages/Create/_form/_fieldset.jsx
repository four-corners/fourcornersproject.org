import Text from './_text';
import Textarea from './_textarea';
import Select from './_select';
import Blocks from './_blocks';
import Group from './_group';
import Checkbox from './_checkbox';
import Toggle from './_toggle';

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

	onToggle(e) {
		const setKey = this.props.setKey;
		const newActiveSetKey = setKey==this.props.activeFieldset?null:setKey;
		if(newActiveSetKey) {
			this.props.sendActiveCorner(newActiveSetKey);
		}
		this.props.sendActiveFieldset(newActiveSetKey);
	}

	renderFields() {
		const formData = this.props.formData,
					fields = this.props.data.fields,
					fieldKeys = Object.keys(fields),
					fieldElems = [];

		for(let fieldKey of fieldKeys) {
			const field = fields[fieldKey],
						setKey = this.props.setKey,
						index = fieldElems.length;
			let fieldValue = formData[setKey] ? formData[setKey][fieldKey] : null;
			switch(field.type) {
				case 'text':
					fieldElems.push(
						<Text
							key={index}
							setKey={setKey}
							fieldKey={fieldKey}
							field={field}
							// fieldValue={fieldValue}
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
							// fieldValue={fieldValue}
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
							// fieldValue={fieldValue}
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
							fieldValue={fieldValue}
							onChange={this.props.onChange} />
					);
					break;
				case 'blocks':
					fieldElems.push(
						<Blocks
							key={index}
							setKey={setKey}
							fieldKey={fieldKey}
							field={field}
							fieldValue={fieldValue}
							onChange={this.props.onChange}
							sendActiveCorner={this.props.sendActiveCorner}
							sendMediaData={this.props.sendMediaData} />
					);
					break;
				case 'group':
					fieldElems.push(
						<Group
							key={index}
							setKey={setKey}
							fieldKey={fieldKey}
							field={field}
							// fieldValue={fieldValue}
							onChange={this.props.onChange}
							sendMediaData={this.props.sendMediaData} />
					);
					break;
				case 'toggle':
					fieldElems.push(
						<Toggle
							key={index}
							setKey={setKey}
							fieldKey={fieldKey}
							field={field}
							fieldValue={fieldValue}
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
		const expand = setKey === this.props.activeFieldset;
		return (
			<fieldset id={setKey} className={'toggler '+(expand?'expand':'collapse')}>
				<legend className='toggle-label corner-label' onClick={this.onToggle.bind(this)}>
					<div className="corner-icon"></div>
					<div className="toggle-text">{strings.title}</div>
					<div className="toggle-icon"></div>
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