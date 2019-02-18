import React from 'react';
import PropTypes from 'prop-types';

class Checkbox extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			value: '',
		};
	}

	onChange(e) {
		const name = e.target.name;
		const value = e.target.checked;
		this.props.onChange(name, value);
	}

	render() {
		const props = this.props;
		const id = props.id;
		const strings = props.field.strings;
		const style = props.field.style;
		const fieldset = props.fieldset;
		const name = [fieldset, id].join('_');
		return(
			<div className={'field checkbox '+(style?style:'')}>
				<div className='checkbox-widget'>
					<input className='toggle'
						id={id}
						name={name}
						type='checkbox'
						defaultChecked={false}
						onChange={this.onChange.bind(this)} />
					<label className='checkbox' htmlFor={id}>
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