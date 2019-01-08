import React from 'react';
import PropTypes from 'prop-types';

import { asNumber } from 'react-jsonschema-form/lib/utils';

class CustomToggleWidget extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			value: '',
			isTrue: true,
			customText: ''
		};
		const {
			schema,
			id,
			options,
			value,
			required,
			disabled,
			readonly,
			autofocus,
			onChange,
			onBlur,
			onFocus,
			onClick,
			placeholder,
		} = props;
	}

	processValue({ type, items }, value) {
		const nums = new Set(['number', 'integer']);
		if (value === '') {
			return undefined;
		} else if (type === 'array' && items && nums.has(items.type)) {
			return value.map(asNumber);
		} else if (type === 'boolean') {
			return value === 'true';
		} else if (type === 'number') {
			return asNumber(value);
		}
		return value;
	}

	render() {
		const schema = this.props.schema;
		const checkboxId = this.props.id+'Check';
		return (
			<div className='toggle-widget'>
				<div className='toggle-checkbox'>
					<input className='toggle'
						id={checkboxId}
						name={checkboxId}
						type='checkbox'
						noValidate={true}
						defaultChecked={true}
						onClick={
							(e => {
								this.setState({
									isTrue: e.target.checked
								});
								// this.props.onChange(e.target.checked);
							})
						} />
					<label className='control-label checkbox' htmlFor={checkboxId}></label>
				</div>
				<div className='toggle-input'>
					<input
						id={this.props.id}
						name={this.props.id}
						className='form-control'
						disabled={!this.state.isTrue}
						onChange={
							(e => {
								const newValue = e.target.value;
								this.setState({
									value: newValue,
								});
								this.props.onChange(this.processValue(schema, newValue));
							})
						}
						onFocus={
							(e => {
								const newValue = e.target.value;
								this.setState({
									value: newValue,
								});
								this.props.onChange(this.processValue(schema, newValue));
							})
						} />
				</div>
					
			</div>
		);
	}
}

CustomToggleWidget.defaultProps = {
	autofocus: false,
};

if (process.env.NODE_ENV !== 'production') {
	CustomToggleWidget.propTypes = {
		schema: PropTypes.object.isRequired,
		id: PropTypes.string.isRequired,
		value: PropTypes.any,
		required: PropTypes.bool,
		disabled: PropTypes.bool,
		readonly: PropTypes.bool,
		autofocus: PropTypes.bool,
		onChange: PropTypes.func,
		onBlur: PropTypes.func,
		onFocus: PropTypes.func,
		onClick: PropTypes.func,
	};
}

export default CustomToggleWidget;