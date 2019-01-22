import React from 'react';
import PropTypes from 'prop-types';

import { asNumber } from 'react-jsonschema-form/lib/utils';

class Select extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			value: '',
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
		const newValue = e.currentTarget.dataset.value;
		this.setState({
			value: newValue,
			// custom: ( newValue=='Write your own' ? true : false )
		});
		const name = this.selectRef.current.name;
		this.props.onChange(name, newValue);
	}

	onChange() {
		
	}

	render() {
		const id = this.props.id;
		const text = this.props.data.text;
		const fieldset = this.props.fieldset;
		const name = [fieldset, id].join('_');
		const options = this.props.data.options;

		return(
			<div className="field select">
				{text && text.label ?
					<label name={id}>
						{text.label}
					</label>
				: ''}
				{text && text.desc ? <div className='desc'>{text.desc}</div> : ''}
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
						return (
							<div
								className={(this.state.value === desc || this.state.value === label) ? 'option selected' : 'option'}
								data-value={desc}
								key={i}
								onClick={this.onClick.bind(this)}>
								<div className='option-label'>{label}</div>
								{ desc ? <div className='option-desc'>{desc}</div> : '' }
							</div>
						);
					})}
				</div>
			</div>
		);
	}
}

export default Select;