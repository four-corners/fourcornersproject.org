import React from 'react';
import PropTypes from 'prop-types';
import Dropzone from 'react-dropzone';

import { asNumber } from 'react-jsonschema-form/lib/utils';

const placeholderSrc = SiteSettings.url.theme + '/assets/images/placeholder.svg';

class CustomUploadWidget extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			imgSrc: '',
			srcMode: 'urlMode',
			urlSrc: '',
			fileSrc: '',
			properSrc: false,
			isLoaded: false,
		};
		const {
			schema,
			id,
			options,
			value,
			required,
			disabled,
			readonly,
			autofocus,
			onChange,
			onBlur,
			onFocus,
			onClick,
			placeholder,
		} = props;
	}

	changeSrcMode(srcMode) {
		const srcKey = srcMode.replace('Mode','Src');
		if(!srcKey) {return}
		const srcVal = this.state[srcKey];
		this.setState({
			srcMode: srcMode,
			imgSrc: srcVal,
			properSrc: (srcMode=='urlMode'&&srcVal)
		});
		this.props.onChange(srcVal);
	}

	onChangeSrc(value, srcMode) {
		// if(this.state.srcMode!=srcMode){return}
		let imgSrc = null;
		if(srcMode == 'urlMode') {
			let pseudoImg = new Image();
			imgSrc = value;
			pseudoImg.onload = (e) => {
				this.setState({
					urlSrc: imgSrc,
					imgSrc: imgSrc,
					isLoaded: true
				});
				this.changeSrcMode(srcMode);
				this.props.onChange(imgSrc);
			}
			pseudoImg.onerror = (e) => {
				this.setState({
					urlSrc: placeholderSrc,
					imgSrc: placeholderSrc,
					isLoaded: false
				});
				this.props.onChange(placeholderSrc);
			}
			pseudoImg.src = imgSrc;
		} else if(srcMode == 'fileMode') {
			imgSrc = URL.createObjectURL(value);
			this.changeSrcMode(srcMode);
			this.setState({
				fileSrc: imgSrc,
				imgSrc: imgSrc,
				isLoaded: true
			});
			this.props.onChange(imgSrc);
		}
	}

	render() {
		const schema = this.props.schema;
		const id = this.props.id;
		const checkboxId = id+'Check';
		const urlId = id+'Url';
		const fileId = id+'File';
		return (
			<div className='upload-widget'>

				<input className=''
					id={id}
					name='imgSrc'
					value={this.state.imgSrc}
					type='hidden'
					onChange={(e => {
						this.props.onChange();
					})}
					/>

				<label className='control-label' htmlFor='urlMode'>
					From a URL
				</label>
				<div className='checkbox-widget form-group'>
					<input className=''
						id='urlMode'
						name='photo'
						value={''}
						type='radio' 
						checked={(this.state.srcMode=='urlMode')}
						onChange={(e => {
							const srcMode = e.target.id;
							this.changeSrcMode(srcMode);
						})}
						/>
					<label className='control-label checkbox' htmlFor='urlMode'></label>

					<div className='checkbox-content'>
						<input
							id={urlId}
							name={urlId}
							type='url'
							className='form-control'
							placeholder='https://sample.org/photo.jpg'
							onChange={(e => {
								this.onChangeSrc(e.target.value, 'urlMode');
							})} />
					</div>

				</div>

				<label className='control-label' htmlFor='fileMode'>
					From a file (temporary)
				</label>
				<div className='checkbox-widget form-group'>
					<input className=''
						id='fileMode'
						name='photo'
						value={''}
						type='radio' 
						checked={(this.state.srcMode=='fileMode')}
						onChange={(e => {
							this.changeSrcMode('fileMode');
						})}
						/>
					<label className='control-label checkbox' htmlFor='fileMode'></label>


					<div className='checkbox-content'>
						<label className='control-label btn' htmlFor={fileId}>Browse file</label>
						<input
							id={fileId}
							name={fileId}
							type='file'
							className='form-control'
							onChange={(e => {
								if(e.target.files) {
									this.onChangeSrc(e.target.files[0], 'fileMode');
								}
							})} />

						<p className='field-description'>
							{/*fields['embed_desc']*/}
							Four Corners does not host files, this upload is just for preview. Before embedding on your site, please paste a URL to your image.
						</p>
					</div>


				</div>
			</div>
		);
	}
}

CustomUploadWidget.defaultProps = {
	autofocus: false,
};

if (process.env.NODE_ENV !== 'production') {
	CustomUploadWidget.propTypes = {
		schema: PropTypes.object.isRequired,
		id: PropTypes.string.isRequired,
		value: PropTypes.any,
		required: PropTypes.bool,
		disabled: PropTypes.bool,
		readonly: PropTypes.bool,
		autofocus: PropTypes.bool,
		onChange: PropTypes.func,
		onBlur: PropTypes.func,
		onFocus: PropTypes.func,
		onClick: PropTypes.func,
	};
}

export default CustomUploadWidget;