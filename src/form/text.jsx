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
		const id = this.props.id;
		const strings = this.props.data.text;
		const fieldset = this.props.fieldset;
		const name = [fieldset, id].join('_');
		return(
			<div className="field input">
				<Label strings={strings} fieldId={id} />
				<input
					name={name}
					className='form-elem'
					onChange={this.onChange.bind(this)} />
			</div>
		);
	}
}

export default Text;