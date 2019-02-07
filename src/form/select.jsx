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

	componentDidMount() {

	}

	componentWillUnmount() {
		
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		
	}

	onClick(e) {
		const custom = e.currentTarget.classList.contains('custom');
		const newValue = e.currentTarget.dataset.value;
		this.setState({
			value: newValue,
			custom: custom
		});
		const name = this.selectRef.current.name;
		this.props.onChange(name, newValue);
	}

	onChange() {
		
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
		const id = this.props.id;
		const strings = this.props.data.text;
		const fieldset = this.props.fieldset;
		const name = [fieldset, id].join('_');
		const options = this.props.data.options;
		const value = this.state.value;
		const customize = this.props.data.customize;

		return(
			<div className='field select'>
				<Label strings={strings} fieldId={id} />
				<select
					name={name}
					className='form-elem'
					value={this.state.value}
					ref={this.selectRef}
					onChange={this.onChange}>
					{options.map(({ desc, label }, i) => {
						return(
							<option key={i} value={desc}>{label+(desc ? ': '+desc : '')}</option>
						);
					})}
				</select>

				<div
					data-id={id}
					className='select-widget form-elem'
					data-value={typeof value === 'undefined' ? '' : value}>
					{options.map(({ desc, label }, i) => {
						const canCustomize = customize && i == 0;
						if(canCustomize) { desc = this.state.customText }
						let optClassName = value === desc ? 'option selected' : 'option';
						optClassName += canCustomize ? ' custom' : '';
						return (
							<div
								key={i}
								className={optClassName}
								data-value={desc}
								onClick={this.onClick.bind(this)}>
								<div className='option-label'>{label}</div>
								{ desc ? <div className='option-desc'>{desc}</div> : '' }
								{ canCustomize ?
									<textarea
									name={name+'Custom'}
									className='form-elem desc'
									onChange={this.onChangeCustom.bind(this)}/> 
								: '' }
							</div>
						);
					})}
				</div>

			</div>
		);
	}
}

export default Select;