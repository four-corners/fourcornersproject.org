import React from 'react';
import PropTypes from 'prop-types';

const placeholderSrc = SiteSettings.url.theme + '/assets/images/placeholder.svg';

class File extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			value: '',

			imgSrc: '',

			srcMode: 'urlMode',
			urlSrc: '',
			fileSrc: '',
			properSrc: false,
			isLoaded: false,
		};
	}

	updateSrcMode(srcMode) {
		const srcKey = srcMode.replace('Mode','Src');
		if(!srcKey) {return}
		const imgSrc = this.state[srcKey];
		this.setState({
			srcMode: srcMode,
			imgSrc: imgSrc,
			properSrc: (srcMode=='urlMode'&&imgSrc)
		});
		// this.props.onChange(srcVal);
		this.props.onChange('photo_file', imgSrc);
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
				this.updateSrcMode(srcMode);
				this.props.onChange('photo_file', imgSrc);
			}
			pseudoImg.onerror = (e) => {
				this.setState({
					urlSrc: placeholderSrc,
					imgSrc: placeholderSrc,
					isLoaded: false
				});
				this.props.onChange('photo_file', placeholderSrc);
			}
			pseudoImg.src = imgSrc;
		} else if(srcMode == 'fileMode') {
			imgSrc = URL.createObjectURL(value);
			this.updateSrcMode(srcMode);
			this.setState({
				fileSrc: imgSrc,
				imgSrc: imgSrc,
				isLoaded: true
			});

			this.props.onChange('photo_file', imgSrc);
		}
	}

	onChange(e) {
		const srcMode = e.target.id;
		this.updateSrcMode(srcMode);
	}

	render() {
		const id = this.props.id;
		const text = this.props.data.text;
		const fieldset = this.props.fieldset;
		const name = [fieldset, id].join('_');
		const checkboxId = id+'Check';
		const urlId = id+'Url';
		const fileId = id+'File';
		return(
			<div className="field file">
				{text && text.label ?
					<label name={id}>
						{text.label}
					</label>
				: ''}
				{text && text.desc ? <div className='desc'>{text.desc}</div> : ''}

				<div className="field">
					<label className='control-label' htmlFor='urlMode'>
						From a URL
					</label>
					<div className='checkbox-widget'>
						<input
							name={name}
							type='radio'
							className='form-elem'
							id='urlMode'
							checked={(this.state.srcMode=='urlMode')}
							onChange={this.onChange.bind(this)}
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
				</div>


				<div className="field">
					<label className='control-label' htmlFor='fileMode'>
						From a file (temporary)
					</label>

					<div className='checkbox-widget'>
						<input className=''
							id='fileMode'
							name='photo'
							value={''}
							type='radio' 
							checked={(this.state.srcMode=='fileMode')}
							onChange={(e => {
								this.updateSrcMode('fileMode');
							})}
							/>
						<label className='control-label checkbox' htmlFor='fileMode'></label>

						<div className='checkbox-content'>
							<label className='control-label button' htmlFor={fileId}>Browse file</label>
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
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default File;