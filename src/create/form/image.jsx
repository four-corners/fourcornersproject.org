import React from 'react';
import PropTypes from 'prop-types';
import Label from './label.jsx';

class Image extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			value: ''
		};
	}

	componentDidUpdate() {
		if(this.props.fieldValue !== this.state.value) {
			this.setState({
				value: this.props.fieldValue
			});
		}
	}

	onChange(e) {
		const name = e.target.name;
		const value = e.target.value;
		this.props.onChange(name, value);
	}

	render() {
		const setKey = this.props.setKey;
		const fieldKey = this.props.fieldKey;
		const strings = this.props.field.strings;
		const name = [setKey, fieldKey].join('_');
		return(
			<div className="field image">
				{this.props.hideLabel?'':
				<Label strings={strings} feildKey={fieldKey} />}
				<input
					className='form-control'
					id={fieldKey}
					name={name}
					type='url'
					placeholder='https://sample.org/photo.jpg'
					onChange={this.onChange.bind(this)} />
			</div>
		);
	}
}

export default Image;