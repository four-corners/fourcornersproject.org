import React from 'react';
import PropTypes from 'prop-types';
import Text from './text.jsx';
import Textarea from './textarea.jsx';
import Select from './select.jsx';
import Label from './label.jsx';

class Toggle extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			value: '',
			values: {},
			checked: null,
			mediaData: []
		};
	}

	onChange(name, subValue) {
		const formData = this.state.formData;
		const nameArr = name.split('_');
		let fieldsetSlug = nameArr[0];
		let fieldKey = nameArr[1];
		let subFieldKey = nameArr[2];
		let value = {
			type: subFieldKey
		};
		if(typeof subValue == 'object') {
			value = Object.assign(value, subValue);
		} else {
			value.label = subValue;
		}

		let values = Object.assign({},this.state.values);
		values[subFieldKey] = value;
		this.setState({
			values: values,
			value: value
		});
		this.props.onChange(name, value);
	}

	onToggle(e) {
		const input = e.target;
		const name = input.name;
		const id = input.id;
		const checked = this.state.checked;
		let subFieldKey = id.split('_')[1];
		let newChecked, newValue;
		if(checked != subFieldKey) {
			newChecked = subFieldKey;
			newValue = this.state.values[subFieldKey];
		}
		
		this.setState({
			checked: newChecked,
			value: newValue
		});

		this.props.onChange(name, newValue);
	}

	renderCheckboxes() {
		const field = this.props.field;
		if(!field){return}
		const subFields = field.fields;
		const subFieldKeys = Object.keys(subFields);
		let subFieldElems = [];
		subFieldKeys.map((subFieldKey, i) => {
			const subFieldData = subFields[subFieldKeys];
			const subField = this.renderCheckbox(subFieldKey, subFieldData, i);
			subFieldElems.push(subField);
		});
		return subFieldElems;
	}

	renderCheckbox(subFieldKey, subFieldData, subFieldIndex) {
		const setKey = this.props.setKey;
		const fieldKey = this.props.fieldKey;
		const field = this.props.field;
		const strings = field.fields[subFieldKey].strings;
		const name = [setKey, fieldKey].join('_');
		const subFieldName = [fieldKey, subFieldKey].join('_');
		const checked = this.state.checked;
		return(
			<div className='field checkbox' key={subFieldIndex}>
				<div className='checkbox-widget'>
					<input className='toggle'
						id={subFieldName}
						name={name}
						type='checkbox'
						checked={checked == subFieldKey}
						onChange={this.onToggle.bind(this)}
						/>
					<label className='checkbox' htmlFor={subFieldName}>
						<div className='label-inner'>
							{strings && strings.label ?
								<span>{strings.label}</span>
							: ''}
						</div>
					</label>
				</div>
				
			</div>
		);
	}

	renderFields() {
		const field = this.props.field;
		if(!field){return}
		const subFields = field.fields;
		const subFieldKeys = Object.keys(subFields);
		let subFieldElems = [];
		subFieldKeys.map((subFieldKey, i) => {
			const subFieldData = subFields[subFieldKey];
			const subField = this.renderField(subFieldKey, subFieldData, i);
			subFieldElems.push(subField);
		});
		return subFieldElems;
	}

	renderField(subFieldKey, subFieldData, i) {
		const setKey = this.props.setKey;
		const fieldKey = this.props.fieldKey;
		const field = this.props.field;
		const subField = field.fields[subFieldKey];
		const subStrings = subField.strings;
		const name = [setKey, subFieldKey].join('_');
		const subFieldName = [fieldKey, subFieldKey].join('_');
		const checked = this.state.checked;
		const show = checked == subFieldKey;
		const className = 'field-toggle-field'+(show?' active':'');
		let fieldElem;
		switch(subField.type) {
			case 'text':
				fieldElem = <Text
						key={i}
						setKey={setKey}
						fieldKey={subFieldName}
						field={subField}
						hideLabel={true}
						onChange={this.onChange.bind(this)} />
				break;
			case 'textarea':
				fieldElem = <Textarea
						key={i}
						setKey={setKey}
						fieldKey={subFieldName}
						field={subField}
						hideLabel={true}
						onChange={this.onChange.bind(this)} />
				break;
			case 'select':
				fieldElem = <Select
						key={i}
						setKey={setKey}
						fieldKey={subFieldName}
						field={subField}
						hideLabel={true}
						onChange={this.onChange.bind(this)} />
				break;
			default:
				break;
		}
		return (
			<div className={className} key={i}>
				{subStrings&&subStrings.desc?
				<div
					className='desc'
					dangerouslySetInnerHTML={ { __html: subStrings.desc } }>
				</div> : ''}

				{fieldElem}
			</div> 
		);
	}

	render() {
		const id = this.props.id;
		const field = this.props.field;
		const strings = field.strings;
		const setKey = this.props.setKey;
		const name = [setKey, id].join('_');
		return (
			<div className='field field-toggle'>
				<Label strings={strings} fieldId={id} />
				<div className='field-toggle-checkboxes'>
					{this.renderCheckboxes()}
				</div>
				<div className='field-toggle-fields'>
					{this.renderFields()}
				</div>
			</div>
		);
	}
}

export default Toggle;