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
		this.onScroll = this.onScroll.bind(this);
		window.addEventListener('scroll', this.onScroll);
	}

	componentDidUpdate(prevProps) {
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
		let imgSrc = e.target.value;
		let pseudoImg = new Image();
		pseudoImg.onload = () => {
			this.setState({
				imgSrc: imgSrc,
				imageLoaded: true
			});
		}
		pseudoImg.onerror = () => {
			this.setState({
				imgSrc: placeholderSrc,
				imageLoaded: false
			});
		}
		pseudoImg.src = imgSrc;
	}

	onChangeOpts(e) {
		console.log(e.target.id);
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

	onSubmit(e) {
		console.log('Submit', e);
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
			<div className='fc_embed' data-fc={stringData}/>
		);
		const decodedHtml = stringHtml
			.replace(/(&quot\;)/g,"\'")
			.replace(/(&amp\;)/g,"&");
		return decodedHtml;
	}

	render() {
		return(
			<div className='col-inner' ref={this.colInnerRef}>
				<div id='embedder' className={this.state.position} ref={this.embedderRef}>
					<div id='embed' className='card'>
						<img
							src={this.state.imgSrc}
							onLoad={this.onImageLoad.bind(this)}
							onError={this.onImageError.bind(this)}
						/>
						<div data-id='backstory' className='corner tl'></div>
						<div data-id='copyright' className='corner tr'></div>
						<div data-id='media' className='corner br'></div>
						<div data-id='links' className='corner bl'></div>
						<div id='backstory' className='cornerContent'>
							<h1>Backstory</h1>
							<Entry formData={this.props.formData.backstory} slug='story' />
							<div className={this.props.formData.backstory.author ? '':'empty'}>
								<span className='label'>Author</span>
								<span className='value'>{this.props.formData.backstory.author}</span>
							</div>
							<div className={this.props.formData.backstory.publication ? '':'empty'}>
								<span className='label'>Publication</span>
								<span className='value'>{this.props.formData.backstory.publication}</span>
							</div>
							<div className={this.props.formData.backstory.url ? '':'empty'}>
								<span className='label'>URL</span>
								<span className='value'>{this.props.formData.backstory.url}</span>
							</div>
							<div className={this.props.formData.backstory.date ? '':'empty'}>
								<span className='label'>Date</span>
								<span className='value'>{this.props.formData.backstory.date}</span>
							</div>
						</div>
						<div id='copyright' className='cornerContent'>
							<h1>Copyright & Licensing</h1>
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
						<div id='media' className='cornerContent'>
							<h1>Related Media</h1>
						</div>
						<div id='links' className='cornerContent'>
							<h1>Related Links</h1>
						</div>
					</div>
					<form name='embed'>
						<input className='form-control card'
							name='imageSrc'
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
							<label className='control-label' htmlFor='includeJS'>
								<input className='embed-opt'
									id='includeJS'
									name='includeJS'
									type='checkbox' 
									defaultChecked={this.state.includeJS}
									onChange={this.onChangeOpts.bind(this)} />
								&nbsp;Include JavaScript file
							</label>
							<label className='control-label' htmlFor='includeCSS'>
								<input className='embed-opt'
									id='includeCSS'
									name='includeCSS'
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