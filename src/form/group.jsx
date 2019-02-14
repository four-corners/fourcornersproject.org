import React from 'react';
import PropTypes from 'prop-types';
import Label from './label.jsx';

class Group extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			value: '',
			mediaData: []
		};
	}

	onChange(e) {
		const input = e.target;
		const name = input.name;
		const value = input.value;
		const nameArr = name.split('_');
		const fieldsetKey = nameArr[0];
		const fieldKey = [nameArr[2],nameArr[1]].join('-');
		const fieldName = [fieldsetKey, fieldKey].join('_');
		this.props.onChange(fieldName, value);
	}


	renderGroup() {
		const data = this.props.data;
		if(!data){return}
		const fields = data.fields;
		const fieldKeys = Object.keys(fields);
		let fieldElems = [];
		fieldKeys.map((fieldKey, i) => {
			const fieldData = fields[fieldKey];
			const field = this.renderField(fieldKey, fieldData, i);
			fieldElems.push(field);
		});
		return fieldElems;
	}

	renderField(fieldKey, fieldData, fieldIndex) {
		const fieldset = this.props.fieldset;
		const id = this.props.id;
		const data = this.props.data;
		const strings = data.text;
		const name = [fieldset, id, fieldKey].join('_');
		return(
			<div className='field input' key={fieldIndex}>
				<Label strings={fieldData} id={id} />
				<input
					name={name}
					type={'text'}
					// data-index={fieldIndex}
					placeholder={fieldData.placeholder}
					className='form-elem'
					onChange={this.onChange.bind(this)}/>
			</div>
		);
	}

	render() {
		const id = this.props.id;
		const data = this.props.data;
		const strings = data.text;
		const fieldset = this.props.fieldset;
		const name = [fieldset, id].join('_');
		return(
			<div className='fields-group'>
				<div className='field-desc desc opened'>
					{strings.desc}
				</div>
				{this.renderGroup()}
			</div>
		);
	}
}

export default Group;