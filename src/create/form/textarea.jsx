import React from 'react';
import PropTypes from 'prop-types';
import Label from './label.jsx';

class Textarea extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			value: '',
		};
	}

	componentDidUpdate() {
		if(this.props.fieldValue != this.state.value) {
			this.setState({
				value: this.props.fieldValue
			});
		}
	}

	onChange(e) {
		const name = e.target.name;
		const value = e.target.value;
		this.props.onChange(name, value);
	}

	render() {
		const setKey = this.props.setKey;
		const fieldKey = this.props.fieldKey;
		const strings = this.props.field.strings;
		const placeholder = strings.placeholder;
		const rows = this.props.field.rows;
		const name = [setKey, fieldKey].join('_');
		return(
			<div className="field input">
				{this.props.hideLabel?'':
				<Label strings={strings} fieldId={fieldKey} />}
				<textarea
					name={name}
					className='form-elem'
					rows={rows ? rows : 6}
					value={this.state.value}
					placeholder={placeholder}
					onChange={this.onChange.bind(this)} />
			</div>
		);
	}
}

export default Textarea;