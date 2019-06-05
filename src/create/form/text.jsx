import React from 'react';
import PropTypes from 'prop-types';
import Label from './label.jsx';

class Text extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			value: '',
			warn: false,
			error: false
		};
	}

	componentDidUpdate() {
		// if(this.props.fieldValue != this.state.value) {
		// 	this.setState({
		// 		value: this.props.fieldValue
		// 	});
		// }
	}

	onChange(e) {
		const self = this;
		const props = this.props;
		const name = e.target.name;
		const value = e.target.value;
		if(props.setKey === 'photo') {
			self.setState({
	  		error: false
	  	});
			let pseudoImg = new Image();
			pseudoImg.onload = (e) => { 
				self.setState({
		  		warn: false
		  	});
		  	props.onChange(name, value);
			}
			pseudoImg.onerror = (e) => {
				self.setState({
		  		warn: 'load'
		  	});
		  	props.onChange(name, null);
		  	// console.warn(e);
			}
			pseudoImg.src = e.currentTarget.value;
		} else {
			props.onChange(name, value);
		}
	}

	onBlur(e) {
		const self = this;
		const props = this.props;
		const name = e.target.name;
		const value = e.target.value;
		if(props.setKey === 'photo' && this.state.warn) {
			self.setState({
	  		error: this.state.warn
	  	});
		}
	}

	render() {
		const props = this.props;
		const setKey = props.setKey;
		const fieldKey = props.fieldKey;
		const strings = props.field.strings;
		const style = props.field.style;
		const format = props.field.format || 'text';
		const name = [setKey, fieldKey].join('_');
		let defaultValue = props.field.default?strings.placeholder:'';
		if(this.state.value) {
			defaultValue = this.state.value;
		}
		const className = ['field', 'input'];
		if(style){className.push(style)}
		if(this.state.error){className.push('error')}
		if(this.state.warn){className.push('warn')}
		return(
			<div className={className.join(' ')}>
				{ this.props.hideLabel ? '' :
					<Label strings={strings} fieldKey={fieldKey} /> }
				<input
					className='form-elem'
					name={name}
					type={format}
					// value={this.state.value ? this.state.value : defaultValue}
					placeholder={strings.placeholder}
					onBlur={this.onBlur.bind(this)}
					onChange={this.onChange.bind(this)} />
				{ this.state.error ?
					<div className='desc error-desc'>This is not a proper URL</div> : '' }
			</div>
		);
	}
}

export default Text;