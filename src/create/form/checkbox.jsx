import React from 'react';
import PropTypes from 'prop-types';

class Checkbox extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			value: false,
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
		const value = e.target.checked;
		this.props.onChange(name, value);
	}

	render() {
		const props = this.props;
		const fieldKey = props.fieldKey;
		const strings = props.field.strings;
		const style = props.field.style;
		const setKey = props.setKey;
		const name = [setKey, fieldKey].join('_');
		const value = this.state.value;
		return(
			<div className={'field checkbox '+(style?style:'')}>
				<div className='checkbox-widget'>
					<input className='toggle'
						id={fieldKey}
						name={name}
						type='checkbox'
						checked={value ? value : false}
						onChange={this.onChange.bind(this)} />
					<label className='checkbox' htmlFor={fieldKey}>
						<div className='label-inner'>
							{strings && strings.label ?
								<span>{strings.label}</span>
							: ''}
						</div>
					</label>
				</div>
				{strings && strings.desc ? <div className='desc'>{strings.desc}</div> : ''}
			</div>
		);
	}
}

export default Checkbox;