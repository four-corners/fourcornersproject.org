import React from 'react';
import PropTypes from 'prop-types';
import Label from './label.jsx';

import { asNumber } from 'react-jsonschema-form/lib/utils';

class Select extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			custom: false,
			customText: ''
		};
		this.selectRef = React.createRef();
	}

	onClick(e) {
		e.preventDefault();
		if(e.target.parentElement.classList.contains('toggle-desc')) {
			return;
		}
		const custom = e.currentTarget.classList.contains('custom');
		let newValue = e.currentTarget.dataset.value;

		try {
			newValue = JSON.parse(newValue);
		} catch(err) {
			console.warn(err);
		}

		this.setState({
			value: newValue,
			custom: custom
		});
		const name = this.selectRef.current.name;
		this.props.onChange(name, newValue);
	}

	onChangeCustom(e) {
		const newValue = e.currentTarget.value;
		this.setState({
			customText: newValue,
			value: newValue
		});
		const name = this.selectRef.current.name;
		this.props.onChange(name, newValue);
	}

	render() {
		const fieldKey = this.props.fieldKey;
		const strings = this.props.field.strings;
		const setKey = this.props.setKey;
		const name = [setKey, fieldKey].join('_');
		const options = this.props.field.options;
		const value = this.state.value;
		const customize = this.props.field.customize;
		return(
			<div className='field select'>
				{this.props.hideLabel?'':
				<Label strings={strings} fieldKey={fieldKey} />}
				<select
					name={name}
					className='form-elem'
					value={this.state.value}
					ref={this.selectRef}>
					{options ? options.map(({ desc, label }, i) => {
						const value = JSON.stringify(options[i]);
						return(
							<option key={i} value={value}>{label+(desc ? ': '+desc : '')}</option>
						);
					}) : ''}
				</select>

				<div
					data-field={fieldKey}
					className='select-widget form-elem'
					data-value={typeof value === 'undefined' ? '' : value}>
					{options ? options.map(({ desc, label }, i) => {
						const value = JSON.stringify(options[i]);
						const canCustomize = customize && i == 0;
						if(canCustomize) { desc = this.state.customText }
						let optClassName = value === desc ? 'option selected' : 'option';
						optClassName += canCustomize ? ' custom' : '';
						return (
							<div
								key={i}
								className={optClassName}
								data-value={value}
								onClick={this.onClick.bind(this)}>
								{canCustomize ?
									<React.Fragment>
										<label>{label}</label>
										{desc?<div className='option-desc desc'>{desc}</div>:''}
										<textarea
											name={name+'Custom'}
											className='form-elem desc'
											onChange={this.onChangeCustom.bind(this)}/>
									</React.Fragment>
								: <Label strings={options[i]} fieldKey={fieldKey}/>}
							</div>
						);
					}) : ''}
				</div>

			</div>
		);
	}
}

export default Select;