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
		const id = this.props.id;
		const text = this.props.data.text;
		const fieldset = this.props.fieldset;
		const name = [fieldset, id].join('_');
		return(
			<div className="field input">
				<div className='checkbox-widget'>
					<input className='toggle'
						id={id}
						name={name}
						type='checkbox'
						defaultChecked={false}
						onChange={this.onChange.bind(this)} />
					<label className='control-label checkbox' htmlFor={id}>
						<div className='label-inner'>
							{text && text.label ?
								<span>{text.label}</span>
							: ''}
						</div>
					</label>
				</div>
				{text && text.desc ? <div className='desc'>{text.desc}</div> : ''}
			</div>
		);
	}
}

export default Checkbox;