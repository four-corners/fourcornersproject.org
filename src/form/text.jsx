import React from 'react';
import PropTypes from 'prop-types';
import Label from './label.jsx';

class Text extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			value: '',
		};
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
		const name = [setKey, fieldKey].join('_');
		return(
			<div className="field input">
				{this.props.hideLabel?'':
				<Label strings={strings} fieldKey={fieldKey} />}
				<input
					name={name}
					className='form-elem'
					onChange={this.onChange.bind(this)} />
			</div>
		);
	}
}

export default Text;