import React from 'react';
import PropTypes from 'prop-types';

class Text extends React.Component {

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
		const fieldset = this.props.fieldset;
		const name = [fieldset, id].join('_');
		return(
			<div className="field input">
				{text && text.label ?
					<label name={id}>
						{text.label}
					</label>
				: ''}
				{text && text.desc ? <div className='desc'>{text.desc}</div> : ''}
				<input
					name={name}
					className='form-elem'
					onChange={this.onChange.bind(this)}
					onFocus={
						(e => {
							// const newValue = e.target.value;
							// this.setState({
							// 	value: newValue,
							// });
							// this.props.onChange(this.processValue(schema, newValue));
						})
					} />
			</div>
		);
	}
}

export default Text;