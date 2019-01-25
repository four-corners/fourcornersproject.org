import React from 'react';
import SchemaForm from 'react-jsonschema-form';
import Dropzone from 'react-dropzone';
import { renderToStaticMarkup } from 'react-dom/server'

import i18n from '../i18n.jsx';
import Module from '../embed/module.jsx';

// let placeholderSrc = SiteSettings.url.theme + '/assets/images/placeholder.svg';
// placeholderSrc = 'https://i.guim.co.uk/img/media/fe09d503213527013ae12c489ad7b473f35e7a8c/0_0_6720_4480/master/6720.jpg?width=1020&quality=45&auto=format&fit=max&dpr=2&s=c23858bc511a0bc8ec8c6ab52687b6b2';

class Embed extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			// imgLoaded: false,
			// imgFocus: false,
			// imgSrc: placeholderSrc,
			includeCss: false,
			includeJs: false,
			stickyStyle: {},
			expand: false
			// activeCorner: this.props.activeCorner
		};
		this.imgInputRef = React.createRef();
		this.outputRef = React.createRef();
		this.includeJSRef = React.createRef();
		this.includeCSSRef = React.createRef();
		this.stickyRef = React.createRef();
	}

	componentDidMount() {
		document.body.addEventListener('scroll', this.onScroll.bind(this));
		window.addEventListener('resize', this.onScroll.bind(this));
	}

	componentWillUnmount() {
		document.body.removeEventListener('scroll', this.onScroll.bind(this));
		window.removeEventListener('resize', this.onScroll.bind(this));
	}

	shouldComponentUpdate(nextProps, nextState) {
		return true;
	}

	componentDidUpdate(prevProps) {

	}

	// onDropLoad(e) {
	// 	// console.log('Image Loaded');
	// 	// this.setState({ imgLoaded: 'loaded' });
	// }

	// onDropError(e) {
	// 	// console.log('Image Failed'); 
	// 	// this.setState({ imgLoaded: 'failed' });
	// }

	// onChangeDrop(e) {
	// 	let imgSrc = e.target.value;
	// 	let pseudoImg = new Image();
	// 	pseudoImg.onload = (e) => {
	// 		this.setState({
	// 			imgSrc: imgSrc,
	// 			imgLoaded: true
	// 		});
	// 	}
	// 	pseudoImg.onerror = (e) => {
	// 		this.setState({
	// 			imgSrc: placeholderSrc,
	// 			imgLoaded: false
	// 		});
	// 	}
	// 	pseudoImg.src = imgSrc;
	// }

	// onDrop(file) {
	// 	let imgSrc = URL.createObjectURL(file[0]);
	// 	this.setState({
	// 		imgSrc: imgSrc,
	// 		imgLoaded: true,
	// 		imgFocus: false
	// 	});
	// }

	// onFocusDrop(e) {
	// 	this.setState({
	// 		imgFocus: true
	// 	});
	// }

	// onBlurDrop(e) {
	// 	this.setState({
	// 		imgFocus: false
	// 	});
	// }

	onChangeOpts(e) {
		let stateChange = {
			formData: this.props.formData
		};
		if(e.target.type == 'checkbox') {
			stateChange[e.target.name] = e.target.checked;
		}
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

	toggleExpand(e) {
		e.preventDefault();
		const currentState = this.state.expand;
		const newState = !currentState;
		this.setState({
			expand: newState
		});
	}

	onScroll(e) {
		const sticky = this.stickyRef.current;
		const parent = sticky.parentElement;
		const rect = parent.getBoundingClientRect();
		const top = rect.top;
		const left = rect.left;
		const width = rect.width;
		const height = rect.height;
		const winHeight = window.innerHeight;
		let stickyStyle = {};
		if(top <= 0 && height >= winHeight) {
			stickyStyle = {
				width: width+'px',
				height: '100%',
				position: 'fixed',
				top: 0,
				left: left+'px',
			};	
		}
		this.setState({
			stickyStyle: stickyStyle
		});
	}

	embedCode(formData) {
		let auxData = {
			lang: i18n.language,
			img: this.props.imgLoaded ? this.props.imgSrc : undefined,
		}
		const cssCDN = 'https://cdn.jsdelivr.net/gh/four-corners/four-corners.js/dist/four-corners.min.css';
		const jsCDN = 'https://cdn.jsdelivr.net/gh/four-corners/four-corners.js/dist/four-corners.min.js';
		// const jsInit = 'window.onload=function(){FourCorners.default.prototype.init()}';

		let safeFormData = Object.assign(formData, auxData);
		let stringData = JSON.stringify(safeFormData)
			.replace(/'/g, '&apos;')
		let stringHtml = "<div class='fc-embed' data-fc='"+stringData+"'></div>";
		stringHtml += (this.state.includeCss?'<link href="'+cssCDN+'" rel="stylesheet" type="text/css">':'');
		stringHtml += (this.state.includeJs?'<script src="'+jsCDN+'" type="text/javascript"></script>':'');
		// stringHtml += (this.state.includeJs?'<script type="text/javascript">'+jsInit+'</script>':'');
		return stringHtml;
	}

	render() {
		const fields = this.props.creator.acf;
		const entries = ['story','author','publication','url','date'];
		const inputClass = (this.props.imgLoaded?'has-image':'');
		// this.props.imgFocus?' focus':''
		// const dropClass = 'drop'+(this.props.imgLoaded?' under card':' over');
		return(
			<div className='col-inner'>
				<div className='sticky' style={this.state.stickyStyle} ref={this.stickyRef}>
					<div className='col-content'>

						<div id='embedder' className={inputClass}>
							<Module
								creator={this.props.creator}
								imgLoaded={this.props.imgLoaded}
								formData={this.props.formData}
								mediaData={this.props.mediaData}
								activeCorner={this.props.activeCorner}
								sendActiveCorner={this.props.sendActiveCorner}
								/>

							<div id='embed-output'>
								
								<form name='embed' onChange={this.onChangeOpts.bind(this)}>

									<fieldset className={this.state.expand ? 'expand' : 'collapse'}>
										{ !this.state.expand ?
											<button onClick={this.toggleExpand.bind(this)}>
												<strong>{this.props.creator.acf['embed_title']}</strong>
											</button>
										: '' }
										<div className="fieldset-inner">
											<div className="field">
												<textarea className='output form-elem'
													id='json'
													readOnly={true}
													ref={this.outputRef}
													rows={3}
													value={this.embedCode(this.props.formData)}
													onFocus={this.onFocus.bind(this)}
													onBlur={this.onBlur.bind(this)} />
											</div>
											
											<div className='desc'>Paste this into your website.</div>

										</div>
									</fieldset>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Embed;