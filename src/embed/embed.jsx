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
			darkMode: false,
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

	onDropLoad(e) {
		// console.log('Image Loaded');
		// this.setState({ imgLoaded: 'loaded' });
	}

	onDropError(e) {
		// console.log('Image Failed'); 
		// this.setState({ imgLoaded: 'failed' });
	}

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
		} else if(e.target.name == 'dark') {
			stateChange.darkMode = e.target.value;
			if(e.target.value === 'true') {
				stateChange.formData[e.target.name] = e.target.value;
			} else {
				delete stateChange.formData[e.target.name];
			}
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

	onScroll(e) {
		const sticky = this.stickyRef.current;
		const parent = sticky.parentElement;
		const rect = parent.getBoundingClientRect();
		const top = rect.top;
		const left = rect.left;
		const width = rect.width;
		const height = window.innerHeight;
		let stickyStyle = {};
		if(top <= 0) {
			stickyStyle = {
				width: width+'px',
				height: '100%',
				position: 'fixed',
				top: 0,
				left: left+'px',
				paddingTop: '0px'
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
		const jsCDN = 'https://cdn.jsdelivr.net/gh/four-corners/four-corners.js/dist/four-corners.min.js';
		const cssCDN = 'https://cdn.jsdelivr.net/gh/four-corners/four-corners.js/dist/four-corners.min.css';

		let safeFormData = Object.assign(formData, auxData);
		let stringData = JSON.stringify(safeFormData)
			.replace(/'/g, '&apos;')
		let stringHtml = "<div class='fc-embed' data-fc='"+stringData+"'></div>";
		stringHtml += (this.state.includeJs?'<script src='+jsCDN+' type="text/javascript"></script>':'');
		stringHtml += (this.state.includeCss?'<link href="'+cssCDN+'" rel="stylesheet" type="text/css">':'');
		return stringHtml;
	}

	render() {
		const fields = this.props.creator.acf;
		const entries = ['story','author','publication','url','date'];
		const inputClass = (this.props.imgLoaded?'has-image':'');
		const formGroupClass = 'form-group card'+(this.props.imgFocus?' focus':'');

		// const dropClass = 'drop'+(this.props.imgLoaded?' under card':' over');
		return(
			<div className='col-inner'>
				<div className='sticky' style={this.state.stickyStyle} ref={this.stickyRef}>
					<div className='col-content'>
					
						<legend>Create your own</legend>
						<div className='field-description'>{fields['photo_desc']}</div>

						<div id='embedder'>
							<fieldset>
								<div className='form-group field field-object'>
									<div id='embed-input' className={inputClass}>
										<div className={formGroupClass}>
											<Module
												creator={this.props.creator}
												imgSrc={this.props.imgSrc}
												imgLoaded={this.props.imgLoaded}
												darkMode={this.state.darkMode}
												formData={this.props.formData}
												mediaData={this.props.mediaData}
												activeCorner={this.props.activeCorner}
												/>
											{
											// <div className={dropClass}>
											// 	<Dropzone
											// 		className='drop-zone'
											// 		ref={this.imgInputRef}
											// 		style={{}}
											// 		accept='image/jpeg, image/png, image/gif'
											// 		multiple={false}
											// 		onDrop={this.onDrop.bind(this)}
											// 		onClick={this.onFocusDrop.bind(this)}
											// 		onMouseEnter={this.onFocusDrop.bind(this)}
											// 		onMouseLeave={this.onBlurDrop.bind(this)}
											// 		onDragEnter={this.onFocusDrop.bind(this)}
											// 		onDragLeave={this.onBlurDrop.bind(this)}
											// 		onFileDialogCancel={this.onBlurDrop.bind(this)}
											// 		onBlur={this.onBlurDrop.bind(this)}
											// 		>
											// 	</Dropzone>
											// 	{this.state.imgLoaded ? <div className='label-text'>{fields['drag_drop']}</div> : ''}
											// </div>
											// {!this.state.imgLoaded ? <div className='label-text'>{fields['drag_drop']}</div> : ''}


										// </div>
										// <div className='form-group image-src'>
										// 	<input className='form-control'
										// 		id='image-src-url'
										// 		name='src'
										// 		placeholder={fields['copy_paste']}
										// 		onChange={this.onChangeDrop.bind(this)}
										// 		onFocus={this.onFocus.bind(this)}
										// 		onBlur={this.onBlur.bind(this)}
										// 		/>
										// </div>
										}
										</div>
									</div>

									<div id='embed-output'>
										
										<legend>{this.props.creator.acf['embed_title']}</legend>

										<textarea className='output form-control'
											id='json'
											readOnly={true}
											ref={this.outputRef}
											rows={3}
											value={this.embedCode(this.props.formData)}
											onFocus={this.onFocus.bind(this)}
											onBlur={this.onBlur.bind(this)}
											/>

										<p className='field-description'>{fields['embed_desc']}</p>
										
										<form className='form-cols' name='embed-opts' onChange={this.onChangeOpts.bind(this)}>
											<div className='form-group form-col'>
												<label className='control-label'>Color Options</label>
												<div className='embed-opts checkboxes'>

													<div className='checkbox-widget form-group'>
														<input className='embed-opt'
															id='lightMode'
															name='dark'
															value={false}
															type='radio' 
															defaultChecked={true}
															/>
														<label className='control-label checkbox' htmlFor='lightMode'>
															<div className='label-inner'>
																<span>Light mode</span>
															</div>
														</label>
													</div>

													<div className='checkbox-widget form-group'>
														<input className='embed-opt'
															id='darkMode'
															name='dark'
															value={true}
															type='radio' 
															defaultChecked={false}
															/>
														<label className='control-label checkbox' htmlFor='darkMode'>
															<div className='label-inner'>
																<span>Dark mode</span>
															</div>
														</label>
													</div>

												</div>
											</div>
											<div className='form-group form-col'>
												<label className='control-label'>Embed Options</label>
												<div className='embed-opts checkboxes'>

													<div className='checkbox-widget form-group'>
														<input className='embed-opt'
															id='includeJs'
															name='includeJs'
															type='checkbox' 
															defaultChecked={this.state.includeJs} />
														<label className='control-label checkbox' htmlFor='includeJs'>
															<div className='label-inner'>
																<span>Include JavaScript file</span>
															</div>
														</label>
													</div>

													<div className='checkbox-widget form-group'>
														<input className='embed-opt'
															id='includeCss'
															name='includeCss'
															type='checkbox' 
															defaultChecked={this.state.includeJs} />
														<label className='control-label checkbox' htmlFor='includeCss'>
															<div className='label-inner'>
																<span>Include CSS file</span>
															</div>
														</label>
													</div>

												</div>
											</div>
										</form>

									</div>
								</div>
							</fieldset>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Embed;