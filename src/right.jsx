import React from 'react';
import Form from 'react-jsonschema-form';
import Dropzone from 'react-dropzone';
import { renderToStaticMarkup } from 'react-dom/server'

import i18n from './i18n.jsx';
import Embed from './embed.jsx';

import Sticky from 'sticky-js';

let placeholderSrc = SiteSettings.url.theme + '/assets/images/placeholder.svg';
// placeholderSrc = 'https://i.guim.co.uk/img/media/fe09d503213527013ae12c489ad7b473f35e7a8c/0_0_6720_4480/master/6720.jpg?width=1020&quality=45&auto=format&fit=max&dpr=2&s=c23858bc511a0bc8ec8c6ab52687b6b2';

class Right extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			imgLoaded: false,
			imgFocus: false,
			imgSrc: placeholderSrc,
			includeCss: false,
			includeJs: false,
			stickyStyle: {}
			// activeCorner: this.props.activeCorner
		};
		this.imgInputRef = React.createRef();
		this.outputRef = React.createRef();
		this.includeJSRef = React.createRef();
		this.includeCSSRef = React.createRef();
		this.stickyRef = React.createRef();
	}

	componentDidMount() {
		window.addEventListener('scroll', this.onScroll.bind(this));
		window.addEventListener('resize', this.onScroll.bind(this));
	}

	componentWillUnmount() {
		window.removeEventListener('scroll', this.onScroll.bind(this));
		window.removeEventListener('resize', this.onScroll.bind(this));
	}

	shouldComponentUpdate(nextProps, nextState) {
		// console.log(nextProps);
		return true;
	}

	componentDidUpdate(prevProps) {

	}

	onImageLoad(e) {
		// console.log('Image Loaded');
		// this.setState({ imgLoaded: 'loaded' });
	}

	onImageError(e) {
		// console.log('Image Failed'); 
		// this.setState({ imgLoaded: 'failed' });
	}

	onChangeImage(e) {
		let imgSrc = e.target.value;
		let pseudoImg = new Image();
		pseudoImg.onload = (e) => {
			// window.FOURCORNERS[0].closeCorner(this.state.activeCorner);
			this.setState({
				imgSrc: imgSrc,
				imgLoaded: true,
				// activeCorner: null
			});
		}
		pseudoImg.onerror = (e) => {
			this.setState({
				imgSrc: placeholderSrc,
				imgLoaded: false,
				// activeCorner: null
			});
		}
		pseudoImg.src = imgSrc;
	}

	onDropImage(file) {
		let imgSrc = URL.createObjectURL(file[0]);
		this.setState({
			imgSrc: imgSrc,
			imgLoaded: true,
			imgFocus: false
		});
	}

	onFocusImage(e) {
		this.setState({
			imgFocus: true
		});
	}

	onBlurImage(e) {
		this.setState({
			imgFocus: false
		});
	}

	onChangeOpts(e) {
		let stateChange = {
			formData: this.props.formData
		};
		stateChange[e.target.id] = e.target.checked;
		this.setState(stateChange);
	}

	onFocus(e) {
		e.target.setSelectionRange(0, e.target.value.length);
	}

	onBlur(e) {

	}

	onError(e) {
		console.log('Error', e);
	}

	onScroll(e) {
		const sticky = this.stickyRef.current;
		const col = sticky.parentElement;
		const rect = col.getBoundingClientRect();
		const width = rect.width-15;
		const height = window.innerHeight;
		const top = rect.top;
		// const left = rect.left;
		let stickyStyle = {};
		if(top <= 60) {
			stickyStyle = {
				width: width+'px',
				height: '100%',
				position: 'fixed',
				top: 0,
				right: 0,
				paddingTop: '60px',
				paddingLeft: '15px'
			};	
		}
		this.setState({
			stickyStyle: stickyStyle
		});
		// ;
		// console.log(position);
	}

	embedCode(formData) {
		let auxData = {
			lang: i18n.language,
			img: this.state.imgLoaded ? this.state.imgSrc : undefined,
		}
		const jsCDN = 'https://cdn.jsdelivr.net/gh/four-corners/four-corners.js/dist/four-corners.min.js';
		const cssCDN = 'https://cdn.jsdelivr.net/gh/four-corners/four-corners.js/dist/four-corners.min.css';
		Object.assign(formData, auxData);
		const stringData = JSON.stringify(formData);
		let stringHtml = '';
		stringHtml += (this.state.includeJs?'<script src='+jsCDN+' type="text/javascript"></script>':'');
		stringHtml += (this.state.includeCss?'<link href="'+cssCDN+'" rel="stylesheet" type="text/css">':'');
		stringHtml += renderToStaticMarkup(
			<div className='fc-embed' data-fc={stringData}/>
		);
		const decodedHtml = stringHtml
			.replace(/(&quot\;)/g,"\'")
			.replace(/(&amp\;)/g,"&");
		return decodedHtml;
	}

	render() {
		const entries = ['story','author','publication','url','date'];
		const inputClass = (this.state.imgLoaded?'has-image':'');
		const formGroupClass = 'form-group'+(this.state.imgLoaded?'':' card')+(this.state.imgFocus?' focus':'');
		const dropClass = 'drop'+(this.state.imgLoaded?' under card':' over');
		return(
			<div className='sticky' style={this.state.stickyStyle} ref={this.stickyRef}>
				<div className='col-inner'>
					<div id='embedder'>
						<div id='embed-input' className={inputClass}>
							<div className={formGroupClass}>
								<Embed
									creator={this.props.creator}
									imgSrc={this.state.imgSrc}
									imgLoaded={this.state.imgLoaded}
									formData={this.props.formData}
									activeCorner={this.props.activeCorner}
									/>
								<div className={dropClass}>
									<Dropzone
										className='drop-zone'
										ref={this.imgInputRef}
										style={{}}
										accept='image/jpeg, image/png, image/gif'
										multiple={false}
										onDrop={this.onDropImage.bind(this)}
										onClick={this.onFocusImage.bind(this)}
										onMouseEnter={this.onFocusImage.bind(this)}
										onMouseLeave={this.onBlurImage.bind(this)}
										onDragEnter={this.onFocusImage.bind(this)}
										onDragLeave={this.onBlurImage.bind(this)}
										onFileDialogCancel={this.onBlurImage.bind(this)}
										onBlur={this.onBlurImage.bind(this)}
										>
									</Dropzone>
									{this.state.imgLoaded ? <div className='label-text'>Drag and drop an image here to upload.</div> : ''}
								</div>
								{!this.state.imgLoaded ? <div className='label-text'>Drag and drop an image here to upload.</div> : ''}
							</div>
							<input className='form-control card'
								id='image-src-url'
								name='image-src'
								placeholder='Copy and paste the URL of your image.'
								onChange={this.onChangeImage.bind(this)}
								onFocus={this.onFocus.bind(this)}
								onBlur={this.onBlur.bind(this)}
								/>
						</div>
						<div id='embed-output'>
							<legend>Embed</legend>
							<p className='field-description'>Copy and paste this code onto your site to embed this Four Corners module.</p>
							<textarea className='output form-control'
								id='json'
								readOnly={true}
								ref={this.outputRef}
								rows={5}
								value={this.embedCode(this.props.formData)}
								onFocus={this.onFocus.bind(this)}
								onBlur={this.onBlur.bind(this)}
								/>
							<form name='embed-opts' onChange={this.onChangeOpts.bind(this)}>
								<label>Embed Options</label>
								<div className='embed-opts checkboxes'>
									<label className='control-label' htmlFor='includeJs'>
										<input className='embed-opt'
											id='includeJs'
											name='includeJs'
											type='checkbox' 
											defaultChecked={this.state.includeJs} />
										&nbsp;Include JavaScript file
									</label>
									<label className='control-label' htmlFor='includeCss'>
										<input className='embed-opt'
											id='includeCss'
											name='includeCss'
											type='checkbox' 
											defaultChecked={this.state.includeCss} />
										&nbsp;Include CSS file
									</label>
								</div>
								<input className='form-control card'
									readOnly={true}
									value='https://i.guim.co.uk/img/media/fe09d503213527013ae12c489ad7b473f35e7a8c/0_0_6720_4480/master/6720.jpg?width=1020&quality=45&auto=format&fit=max&dpr=2&s=c23858bc511a0bc8ec8c6ab52687b6b2'
									// value='https://d2w9rnfcy7mm78.cloudfront.net/1380519/original_68cb6b97fa36bad871fb18352de81972.jpeg'
									onFocus={this.onFocus.bind(this)}
									onBlur={this.onBlur.bind(this)}
									/>
							</form>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Right;