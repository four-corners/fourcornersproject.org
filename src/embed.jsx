import React from 'react';
import Form from 'react-jsonschema-form';
import { renderToStaticMarkup } from 'react-dom/server'

import i18n from './i18n.jsx';
import Schema from './schema.jsx';

let placeholderSrc = SiteSettings.url.theme + '/assets/images/placeholder.svg';

class Embed extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			imageLoaded: false,
			imgSrc: placeholderSrc,
			position: 'static',
		};
		this.inputRef = React.createRef();
		this.outputRef = React.createRef();
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


	onChange(formEvent) {
		let imgSrc = formEvent.target.value;
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
			img: this.state.imageLoaded ? this.state.imgSrc : undefined,
			lang: this.props.lang
		}
		// if(this.state.imageLoaded) {
		// 	formData.img = this.state.imgSrc;
		// }
		Object.assign(formData, auxData);
		const stringData = JSON.stringify(formData);
		const stringHtml = renderToStaticMarkup(
			<div className='four-corners-embedder' data-fc={stringData}/>
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
							<div className={this.props.formData.backstory.story ? '':'empty'}>
								<span className='label'>Story</span>
								<span className='value'>{this.props.formData.backstory.story}</span>
							</div>
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
					<form className='image'>
						<input className='form-control card'
							name='imageSrc'
							ref={this.inputRef}
							onChange={this.onChange.bind(this)}
							onSubmit={this.onChange.bind(this)}
							onError={this.onError.bind(this)}
							onFocus={this.onFocus.bind(this)}
							onBlur={this.onBlur.bind(this)}
							/>
						<textarea className='output form-control card'
							id='json'
							readOnly={true}
							ref={this.outputRef}
							rows={5}
							value={this.createEmbedCode(this.props.formData)}
							onFocus={this.onFocus.bind(this)}
							onBlur={this.onBlur.bind(this)}
							/>
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