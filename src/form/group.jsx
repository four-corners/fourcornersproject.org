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
		const field = this.props.field;
		if(!field){return}
		const fields = field.fields;
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
		const field = this.props.field;
		const strings = field.strings;
		const name = [fieldset, id, fieldKey].join('_');
		return(
			<div className='field input' key={fieldIndex}>
				{this.props.hideLabel?'':
				<Label strings={fieldData} id={id} />}
				<input
					name={name}
					type={'text'}
					placeholder={fieldData.placeholder}
					className='form-elem'
					onChange={this.onChange.bind(this)}/>
			</div>
		);
	}

	render() {
		const setKey = this.props.setKey;
		const fieldKey = this.props.fieldKey;
		const field = this.props.field;
		const strings = field.strings;
		// const name = [setKey, fieldKey].join('_');
		return(
			<div className='fields-group'>
				<Label strings={strings} setKey={setKey} />
				{this.renderGroup()}
			</div>
		);
	}
}

export default Group;