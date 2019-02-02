import React from 'react';
import PropTypes from 'prop-types';

const placeholderSrc = SiteSettings.url.theme + '/assets/images/placeholder.svg';

class File extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			imgSrc: '',
			srcMode: 'url',
			urlSrc: '',
			fileSrc: '',
			imgLoaded: false,
			imgValid: false
		};
	}

	componentDidUpdate() {
		// console.log(this.state)
	}

	updateSrcMode(srcMode) {
		const imgData = Object.assign({}, this.state);
		imgData.srcMode = srcMode;
		imgData.imgSrc = imgData[srcMode+'Src'];
		this.setState(imgData);
		this.props.sendImgData(imgData);
	}

	onChangeSrc(value, srcMode) {
		let imgData;
		if(srcMode == 'url') {
			let pseudoImg = new Image();
			const urlSrc = value;
			pseudoImg.onload = (e) => {
				imgData = {
					srcMode: 'url',
					urlSrc: urlSrc,
					imgSrc: urlSrc,
					imgLoaded: true,
					imgValid: true
				}
				this.setState(imgData);
				this.props.sendImgData(imgData);
			}
			pseudoImg.onerror = (e) => {
				imgData = {
					srcMode: 'url',
					urlSrc: placeholderSrc,
					imgSrc: placeholderSrc,
					imgLoaded: false,
					imgValid: false
				}
				this.setState(imgData);
				this.props.sendImgData(imgData);
			}
			pseudoImg.src = urlSrc;
		} else if(srcMode == 'file') {
			const fileSrc = URL.createObjectURL(value);
			imgData = {
				srcMode: 'file',
				fileSrc: fileSrc,
				imgSrc: fileSrc,
				imgLoaded: true,
				imgValid: false
			}
			this.setState(imgData);
			this.props.sendImgData(imgData);
		}
	}

	render() {
		const id = this.props.id;
		const text = this.props.data.text;
		const fieldset = this.props.fieldset;
		const name = [fieldset, id].join('_');
		const checkboxId = [fieldset, id, 'check'].join('_');
		const urlId = [fieldset, id, 'url'].join('_');
		const fileId = [fieldset, id, 'file'].join('_');
		return(
			<div className="field file">
				{text && text.label ?
					<label name={id}>
						{text.label}
					</label>
				: ''}
				{text && text.desc ? <div className='desc'>{text.desc}</div> : ''}

				<div className="field">
					<label className='control-label' htmlFor='url'>
						From a URL
					</label>
					<div className='checkbox-widget'>
						<input
							id='url'
							name={name}
							type='radio'
							className='form-elem'
							checked={this.state.srcMode=='url'}
							onChange={(e => {
								this.updateSrcMode('url');
							})}
							/>
						<label className='control-label checkbox' htmlFor='url'></label>
						<div className='checkbox-content'>
							<input
								id={urlId}
								name={urlId}
								type='url'
								className='form-control'
								placeholder='https://sample.org/photo.jpg'
								onChange={(e => {
									this.onChangeSrc(e.target.value, 'url');
								})} />
						</div>
					</div>
				</div>


				<div className="field">
					<label className='control-label' htmlFor='file'>
						From a file (temporary)
					</label>

					<div className='checkbox-widget'>
						<input className=''
							id='file'
							name={name}
							type='radio' 
							checked={this.state.srcMode=='file'}
							onChange={(e => {
								this.updateSrcMode('file');
							})}
							/>
						<label className='control-label checkbox' htmlFor='file'></label>

						<div className='checkbox-content'>
							<label className='control-label button' htmlFor={fileId}>Browse file</label>
							<input
								id={fileId}
								name={fileId}
								type='file'
								className='form-control'
								onChange={(e => {
									this.onChangeSrc(e.target.files?e.target.files[0]:null, 'file');
								})} />
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default File;