import React from 'react';
import PropTypes from 'prop-types';
import Label from './label.jsx';

class File extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			value: ''
		}
	}

	componentDidUpdate() {
		const imgSrc = this.props.fieldValue.imgSrc;
		if(imgSrc && imgSrc != this.state.value) {
			this.setState({
				value: imgSrc
			});
		}
	}

	onChange(e) {
		this.props.sendImgSrc(e.target.value);
	}


	// onChangeSrc(src) {
	// 	let imgData;
	// 	let pseudoImg = new Image();
	// 	pseudoImg.onload = (e) => {
	// 		imgData = {
	// 			imgSrc: src,
	// 			imgLoaded: true,
	// 		}
	// 		this.setState(imgData);
	// 		this.props.sendImgData(imgData);
	// 	}
	// 	pseudoImg.onerror = (e) => {
	// 		imgData = {
	// 			imgLoaded: false
	// 		}
	// 		this.setState(imgData);
	// 		this.props.sendImgData(imgData);
	// 	}
	// 	pseudoImg.src = src;
	// }

	render() {
		const setKey = this.props.setKey;
		const fieldKey = this.props.fieldKey;
		const strings = this.props.field.strings;
		const name = [setKey, fieldKey].join('_');
		return(
			<div className="field file">
				{this.props.hideLabel?'':
				<Label strings={strings} feildKey={fieldKey} />}
				<input
					className='form-control'
					id={fieldKey}
					name={name}
					type='url'
					value={this.state.value}
					placeholder='https://sample.org/photo.jpg'
					onChange={this.onChange.bind(this)} />
			</div>
		);
	}
}

export default File;