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
		//   // that.children.props.src = imgSrc;
		}
		pseudoImg.onerror = () => {
			this.setState({
				imgSrc: placeholderSrc,
				imageLoaded: false
			});
		//   // that.children.props.src = '';
		}
		pseudoImg.src = imgSrc;
	}


	onSubmit(e) {
		console.log('Submit', e);
	}

	onError(e) {
		console.log('Error', e);
	}

	onScroll(e) {
		// let embedder = this.embedderRef.current;
		// let colInner = this.colInnerRef.current;
		// let paddingTop = window.pageYOffset - colInner.offsetParent.offsetTop;

		// if(!paddingTop) {
			// paddingTop = 0;
		// }
		// console.log(paddingTop);
	}

	createEmbedCode(jsonData) {
		const stringData = JSON.stringify(jsonData);
		const stringHtml = renderToStaticMarkup(
			<div className='four-corners-embedder' data-json={stringData}>
			</div>
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
							<div>{this.props.jsonData.backstory.story}</div>
							<div>{this.props.jsonData.backstory.author}</div>
							<div>{this.props.jsonData.backstory.publication}</div>
							<div>{this.props.jsonData.backstory.url}</div>
							<div>{this.props.jsonData.backstory.date}</div>
						</div>
						<div id='copyright' className='cornerContent'>
							<h1>Copyright & Licensing</h1>
							<div>{this.props.jsonData.backstory.copyright}</div>
							<div>{this.props.jsonData.backstory.credit}</div>
							<div>{this.props.jsonData.backstory.year}</div>
							<div>{this.props.jsonData.backstory.ethics}</div>
							<div>{this.props.jsonData.backstory.caption}</div>
						</div>
						<div id='media' className='cornerContent'>
							<h1>Related Media</h1>
						</div>
						<div id='links' className='cornerContent'>
							<h1>Related Links</h1>
						</div>
					</div>
					<form className='image'>
						<input name='imageSrc'
							className='form-control card'
							onChange={this.onChange.bind(this)}
							onSubmit={this.onChange.bind(this)}
							onError={this.onError.bind(this)}
							ref={this.inputRef} />
						<input
							readOnly={true}
							className='form-control card'
							value='https://d2w9rnfcy7mm78.cloudfront.net/1380519/original_68cb6b97fa36bad871fb18352de81972.jpeg'/>
					</form>
					<textarea className='card'
						readOnly={true}
						id='json'
						className='output form-control'
						ref={this.outputRef}
						rows={5}
						value={this.createEmbedCode(this.props.jsonData)}
						/>
				</div>
			</div>
		);
	}
}

export default Embed;