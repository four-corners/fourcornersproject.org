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
		const props = this.props;
		const setKey = props.setKey;
		const fieldKey = props.fieldKey;
		const strings = props.field.strings;
		const style = props.field.style;
		const name = [setKey, fieldKey].join('_');
		return(
			<div className={'field input '+(style?style:'')}>
				{this.props.hideLabel?'':
				<Label strings={strings} fieldKey={fieldKey} />}
				<input
					name={name}
					placeholder={strings.placeholder}
					defaultValue={props.field.default?strings.placeholder:''}
					className='form-elem'
					onChange={this.onChange.bind(this)} />
			</div>
		);
	}
}

export default Text;