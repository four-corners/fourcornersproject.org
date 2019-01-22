// items: {
// 	'image': 'Image',
// 	'youtube': 'YouTube',
// 	'vimeo': 'Vimeo',
// 	'soundcloud':  'SoundCloud'
// }

import React from 'react';
import PropTypes from 'prop-types';

import { asNumber } from 'react-jsonschema-form/lib/utils';

class SelectWidget extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			value: '',
			isCustom: false,
			customText: ''
		};
	}

	// processValue({ type, items }, value) {
	// 	const nums = new Set(['number', 'integer']);
	// 	if (value === '') {
	// 		return undefined;
	// 	} else if (value === 'empty') {
	// 		return undefined;
	// 	} else if (type === 'array' && items && nums.has(items.type)) {
	// 		return value.map(asNumber);
	// 	} else if (type === 'boolean') {
	// 		return value === 'true';
	// 	} else if (type === 'number') {
	// 		return asNumber(value);
	// 	}
	// 	return value;
	// }

	getValue(e, multiple) {
		return e.target.value;
	}

	onChange(e) {
		
	}

	render() {
		// const { options, enumDisabled } = this.props.options;
		const options = this.props.options;
		const emptyValue = '';
		const id = this.props.id;
		// const schema = this.props.schema;
		return (
			<div className='select-widget'>
				<select
					id={id}
					name={id}
					required={this.props.required}
					value={this.state.value}
					onChange={
						(e => {
							const newValue = e.currentTarget.value;
							this.setState({
								value: newValue
							});
							this.props.onChange(newValue);
						})
					}>
					{options.map(({ value, label }, i) => {
						return(
							<option key={i} value={value}>{label+(value&&value!='empty' ? ': '+value : '')}</option>
						);
					})}
				</select>

				<div
					data-id={id}
					className='select-widget-dropdown form-control'
					data-value={typeof value === 'undefined' ? emptyValue : value}>
					{options.map(({ value, label }, i) => {
						return (
							<div
								className={(this.state.value === value || this.state.value === label) ? 'option selected' : 'option'}
								data-value={value}
								key={i}
								onClick={
									(e => {
										// console.log(e.currentTarget.dataset.value);
										const newValue = e.currentTarget.dataset.value;
										this.setState({
											value: newValue,
											isCustom: ( newValue=='Write your own' ? true : false )
										});
										this.props.onChange(newValue);
									})
								}>
								<div className='option-label'>{label}</div>
								{ value&&value!='empty' ? <div className='option-desc'>{value}</div> : '' }
							</div>
						);
					})}
				</div>

				<textarea
					className={this.state.isCustom ? 'form-control' : 'hidden'}
					onChange={e => {
						const newValue = e.target.value;
						this.setState({
							customText: newValue
						})
						this.props.onChange(newValue);
					}}></textarea>
			</div>
		);
	}
}

// CustomSelectWidget.defaultProps = {
// 	autofocus: false,
// };

// if (process.env.NODE_ENV !== 'production') {
// 	CustomSelectWidget.propTypes = {
// 		schema: PropTypes.object.isRequired,
// 		id: PropTypes.string.isRequired,
// 		options: PropTypes.shape({
// 			options: PropTypes.array,
// 		}).isRequired,
// 		value: PropTypes.any,
// 		required: PropTypes.bool,
// 		disabled: PropTypes.bool,
// 		readonly: PropTypes.bool,
// 		autofocus: PropTypes.bool,
// 		onChange: PropTypes.func,
// 		onBlur: PropTypes.func,
// 		onFocus: PropTypes.func,
// 		onClick: PropTypes.func,
// 	};
// }

export default CustomSelectWidget;