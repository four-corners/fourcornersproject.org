import React from 'react';
import PropTypes from 'prop-types';
import Label from './label.jsx';

class File extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			imgSrc: '',
			// srcMode: 'url',
			// urlSrc: '',
			// fileSrc: '',
			imgLoaded: false,
			// imgValid: false
		};
	}

	componentDidUpdate() {
		// console.log(this.state)
	}

	// updateSrcMode(srcMode) {
	// 	const imgData = Object.assign({}, this.state);
	// 	imgData.srcMode = srcMode;
	// 	imgData.imgSrc = imgData[srcMode+'Src'];
	// 	this.setState(imgData);
	// 	this.props.sendImgData(imgData);
	// }

	onChangeSrc(src) {
		let imgData;
		let pseudoImg = new Image();
		pseudoImg.onload = (e) => {
			imgData = {
				imgSrc: src,
				imgLoaded: true,
			}
			this.setState(imgData);
			this.props.sendImgData(imgData);
		}
		pseudoImg.onerror = (e) => {
			imgData = {
				imgLoaded: false
			}
			this.setState(imgData);
			this.props.sendImgData(imgData);
		}
		pseudoImg.src = src;
	}

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
					id={fieldKey}
					name={name}
					type='url'
					className='form-control'
					placeholder='https://sample.org/photo.jpg'
					onChange={(e => {
						this.onChangeSrc(e.target.value);
					})} />
			</div>
		);
	}
}

export default File;