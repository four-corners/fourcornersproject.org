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
						placeholder={this.props.placeholder}
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

export default CustomToggleWidget;