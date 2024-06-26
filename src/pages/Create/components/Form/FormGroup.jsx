import React from 'react';
import FormLabel from './FormLabel';

class Group extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			value: '',
			mediaData: []
		};
	}

	onFocus(e) {
		return
	}

	onChange(e) {
		const input = e.target;
		const name = input.name;
		const value = input.value;
		this.props.onChange(name, value);
	}


	renderGroup() {
		const field = this.props.field;
		if(!field){return}
		const subFields = field.fields;
		const subFieldKeys = Object.keys(subFields);
		let subFieldElems = [];
		subFieldKeys.map((subFieldKey, i) => {
			const subFieldData = subFields[subFieldKey];
			const subField = this.renderSubField(subFieldKey, subFieldData, i);
			subFieldElems.push(subField);
		});
		return subFieldElems;
	}

	renderSubField(subFieldKey, subFieldData, subFieldIndex) {
		const setKey = this.props.setKey;
		const fieldKey = this.props.fieldKey;
		const style = subFieldData.style;
		const strings = subFieldData.strings;
		const name = [setKey, fieldKey, subFieldKey].join('_');
		return(
			<div className={'field input '+style} key={subFieldIndex}>
				<FormLabel strings={strings} fieldKey={subFieldKey} />
				<input
					name={name}
					type={'text'}
					defaultValue={subFieldData.default?strings.placeholder:''}
					placeholder={subFieldData.placeholder}
					className='form-elem'
					onFocus={this.onFocus.bind(this)}
					onChange={this.onChange.bind(this)}/>
			</div>
		);
	}

	render() {
		const setKey = this.props.setKey;
		const fieldKey = this.props.fieldKey;
		const field = this.props.field;
		const strings = field.strings;
		return(
			<div className='field fields-group'>
				{this.props.hideLabel?'':
				<FormLabel strings={strings} setKey={setKey} />}
				{this.renderGroup()}
			</div>
		);
	}
}

export default Group;