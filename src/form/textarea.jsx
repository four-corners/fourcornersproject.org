import React from 'react';
import PropTypes from 'prop-types';

class Textarea extends React.Component {

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
		const id = this.props.id;
		const text = this.props.data.text;
		const placeholder = text.placeholder;
		const fieldset = this.props.fieldset;
		const rows = this.props.data.rows;
		const name = [fieldset, id].join('_');
		return(
			<div className="field input">
				{text && text.label ?
					<label name={id}>
						{text.label}
					</label>
				: ''}
				{text && text.desc ? <div className='desc'>{text.desc}</div> : ''}
				<textarea
					name={name}
					className='form-elem'
					rows={rows ? rows : 6}
					placeholder={placeholder}
					onChange={this.onChange.bind(this)} />
			</div>
		);
	}
}

export default Textarea;