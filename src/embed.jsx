import React from 'react';
import Form from 'react-jsonschema-form';
import { renderToStaticMarkup } from 'react-dom/server'

import i18n from './i18n.jsx';
import Entry from './entry.jsx';

let placeholderSrc = SiteSettings.url.theme + '/assets/images/placeholder.svg';

class Embed extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			imageLoaded: false,
			imgSrc: placeholderSrc,
			position: 'static',
			includeCSS: false,
			includeJS: false,
		};
		this.inputRef = React.createRef();
		this.outputRef = React.createRef();
		this.includeJSRef = React.createRef();
		this.includeCSSRef = React.createRef();
		this.colInnerRef = React.createRef();
		this.embedderRef = React.createRef();

		
		// this.handleClick = this.handleClick.bind(this);
	}

	componentDidMount() {
		var fc = FourCorners.default.prototype.init();
		this.FourCorners = fc[0];
		this.onScroll = this.onScroll.bind(this);
		window.addEventListener('scroll', this.onScroll);
	}

	componentDidUpdate(prevProps) {
		const activeCorner = this.props.activeCorner;
		if(activeCorner) {
			this.FourCorners.openCorner(activeCorner);
		}
		// if (this.props.imgSrc !== prevProps.imgSrc) {
		// }
	}

	onImageLoad(e) {
		// console.log('Image Loaded');
		// this.setState({ imageLoaded: 'loaded' });
	}

	onImageError(e) {
		// console.log('Image Failed'); 
		// this.setState({ imageLoaded: 'failed' });
	}


	onChangeImage(e) {
		if(e.target.type=='text') {
			let imgSrc = e.target.value;
			let pseudoImg = new Image();
			pseudoImg.onload = (e) => {
				this.setState({
					imgSrc: imgSrc,
					imageLoaded: true
				});
			}
			pseudoImg.onerror = (e) => {
				this.setState({
					imgSrc: placeholderSrc,
					imageLoaded: false
				});
			}
			pseudoImg.src = imgSrc;
		} else if (e.target.type=='file') {
			let imgSrc = URL.createObjectURL(e.target.files[0]);
			this.setState({
				imgSrc: imgSrc,
				imageLoaded: true
			});
		}
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
		
	}

	createEmbedCode(formData) {
		let auxData = {
			lang: i18n.language,
			img: this.state.imageLoaded ? this.state.imgSrc : undefined,
		}
		const jsCDN = 'https://cdn.jsdelivr.net/gh/four-corners/four-corners.js/dist/four-corners.min.js';
		const cssCDN = 'https://cdn.jsdelivr.net/gh/four-corners/four-corners.js/dist/four-corners.min.css';
		Object.assign(formData, auxData);
		const stringData = JSON.stringify(formData);
		let stringHtml = '';
		stringHtml += (this.state.includeJS?'<script src='+jsCDN+' type="text/javascript"></script>':'');
		stringHtml += (this.state.includeCSS?'<link href="'+cssCDN+'" rel="stylesheet" type="text/css">':'');
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
		return(
			<div className='col-inner' ref={this.colInnerRef}>
				<div id='embedder' className={this.state.position} ref={this.embedderRef}>
					<div id='embed' className={this.state.imageLoaded?'card has-image':'card'}>
						<form>
							<div className='form-group'>
								<fieldset>
									<input
										id='img-src-file'
										name='files[]'
										type='file'
										ref={this.inputRef}
										onChange={this.onChangeImage.bind(this)} />
									<label htmlFor='img-src-file'>Drag and drop, or click, here to preview your photo.</label>
									{/*  <input
										className='form-control card'
										id='img-src-url'
										name='image'
										type='text'
										ref={this.inputRef}
										placeholder='https://example.com/images/photo.jpg'
										onChange={this.onChangeImage.bind(this)}
										onFocus={this.onFocus.bind(this)}
										onBlur={this.onBlur.bind(this)} /> */}
								</fieldset>
							</div>
						</form>
						<div className='fc-embed'>
							<img
								src={this.state.imgSrc}
								className='fc-photo'
								onLoad={this.onImageLoad.bind(this)}
								onError={this.onImageError.bind(this)}
							/>
							<div data-slug='backstory' className='fc-panel'>
								<h3>Backstory</h3>
								<div className='fc-inner'>
									{ entries.map((slug, i) => <Entry formData={this.props.formData.backstory} slug={slug} key={i} />) }
								</div>
							</div>
							<div data-slug='copyright' className='fc-panel'>
								<div className='fc-inner'>
									<h3>Copyright & Licensing</h3>
									<div className={this.props.formData.copyright.copyright ? '':'empty'}>
										<span className='label'>Copyright</span>
										<span className='value'>{this.props.formData.copyright.copyright}</span>
									</div>
									<div className={this.props.formData.copyright.credit ? '':'empty'}>
										<span className='label'>Credit</span>
										<span className='value'>{this.props.formData.copyright.credit}</span>
									</div>
									<div className={this.props.formData.copyright.year ? '':'empty'}>
										<span className='label'>Year</span>
										<span className='value'>{this.props.formData.copyright.year}</span>
									</div>
									<div className={this.props.formData.copyright.ethics ? '':'empty'}>
										<span className='label'>Ethics</span>
										<span className='value'>{this.props.formData.copyright.ethics}</span>
									</div>
									<div className={this.props.formData.copyright.caption ? '':'empty'}>
										<span className='label'>Caption</span>
										<span className='value'>{this.props.formData.copyright.caption}</span>
									</div>
								</div>
							</div>
							<div data-slug='media' className='fc-panel'>
								<div className='fc-inner'>
									<h3>Related Media</h3>
								</div>
							</div>
							<div data-slug='links' className='fc-panel'>
								<div className='fc-inner'>
									<h3>Related Links</h3>
								</div>
							</div>
						</div>
					</div>
					<form name='embed'>
						<input className='form-control card'
							name='image-src'
							ref={this.inputRef}
							placeholder='https://example.com/images/photo.jpg'
							onChange={this.onChangeImage.bind(this)}
							onFocus={this.onFocus.bind(this)}
							onBlur={this.onBlur.bind(this)}
							/>
						<textarea className='output form-control'
							id='json'
							readOnly={true}
							ref={this.outputRef}
							rows={5}
							// value={this.createEmbedCode(this.props.formData)}
							value={this.createEmbedCode(this.props.formData)}
							onFocus={this.onFocus.bind(this)}
							onBlur={this.onBlur.bind(this)}
							/>
						<div className='embed-opts checkboxes'>
							<label className='control-label' htmlFor='include-js'>
								<input className='embed-opt'
									id='include-js'
									name='include-js'
									type='checkbox' 
									defaultChecked={this.state.includeJS}
									onChange={this.onChangeOpts.bind(this)} />
								&nbsp;Include JavaScript file
							</label>
							<label className='control-label' htmlFor='include-css'>
								<input className='embed-opt'
									id='include-css'
									name='include-css'
									type='checkbox' 
									defaultChecked={this.state.includeCSS}
									onChange={this.onChangeOpts.bind(this)} />
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
		);
	}
}

export default Embed;