import React from 'react';
import SchemaForm from 'react-jsonschema-form';
import Dropzone from 'react-dropzone';
import { renderToStaticMarkup } from 'react-dom/server'

import i18n from '../../i18n.jsx';
import Module from './module.jsx';

// let placeholderSrc = SiteSettings.url.theme + '/assets/images/placeholder.svg';
// placeholderSrc = 'https://i.guim.co.uk/img/media/fe09d503213527013ae12c489ad7b473f35e7a8c/0_0_6720_4480/master/6720.jpg?width=1020&quality=45&auto=format&fit=max&dpr=2&s=c23858bc511a0bc8ec8c6ab52687b6b2';

class Preview extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			includeCss: false,
			includeJs: false,
			stickyStyle: {},
			expand: false
		};
		this.imgInputRef = React.createRef();
		this.outputRef = React.createRef();
		this.includeJSRef = React.createRef();
		this.includeCSSRef = React.createRef();
		this.stickyRef = React.createRef();
		this.cdnVer = '1.1.2';
		this.cssURL = 'https://cdn.jsdelivr.net/gh/four-corners/four-corners.js@'+this.cdnVer+'/dist/four-corners.min.css';
		this.jsURL = 'https://cdn.jsdelivr.net/gh/four-corners/four-corners.js@'+this.cdnVer+'/dist/four-corners.min.js';
		this.cssCDN = '<link href="'+this.cssURL+'" rel="stylesheet" type="text/css">';
		this.jsCDN = '<script src="'+this.jsURL+'" type="text/javascript"></script>';
		this.jsInit = '<script type="text/javascript">new FourCorners()</script>';
	}

	componentDidMount() {
		document.body.addEventListener('scroll', this.onScroll.bind(this));
		window.addEventListener('resize', this.onScroll.bind(this));
	}

	componentWillUnmount() {
		document.body.removeEventListener('scroll', this.onScroll.bind(this));
		window.removeEventListener('resize', this.onScroll.bind(this));
	}

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

	onToggle(e) {
		e.preventDefault();
		let id = e.currentTarget.parentElement.id;
		if(id==this.state.expand) {id = null}
		this.setState({
			expand: id
		});
	}

	onScroll(e) {
		// const sticky = this.stickyRef.current;
		// if(!sticky){return}
		// const parent = sticky.parentElement;
		// const rect = parent.getBoundingClientRect();
		// const top = rect.top;
		// const left = rect.left;
		// const width = rect.width;
		// const height = rect.height;
		// const winHeight = window.innerHeight;
		// let stickyStyle = {};
		// if(top <= 0 && height >= winHeight) {
		// 	stickyStyle = {
		// 		width: width+'px',
		// 		height: '100%',
		// 		position: 'fixed',
		// 		top: 0,
		// 		left: left+'px',
		// 	};	
		// }
		// this.setState({
		// 	stickyStyle: stickyStyle
		// });
	}

	embedCode(formData) {
		const imgData = this.props.imgData;
		let auxData = {
			lang: i18n.language,
		}
		// const cssCDN = 'https://cdn.jsdelivr.net/gh/four-corners/four-corners.js/dist/four-corners.min.css';
		// const jsCDN = 'https://cdn.jsdelivr.net/gh/four-corners/four-corners.js/dist/four-corners.min.js';

		let safeFormData = Object.assign(formData, auxData);
		let stringData = JSON.stringify(safeFormData)
			.replace(/'/g, '&apos;');
		let imgHtml = imgData.imgLoaded ? "<img class='fc-img' src='"+imgData.imgSrc+"'/>":'';
		let stringHtml = "<div class='fc-embed' data-fc='"+stringData+"'>"+imgHtml+"</div>";
		// stringHtml += (this.state.includeCss?'<link href="'+cssCDN+'" rel="stylesheet" type="text/css">':'');
		// stringHtml += (this.state.includeJs?'<script src="'+jsCDN+'" type="text/javascript"></script>':'');
		return stringHtml;
	}

	render() {
		const creator = this.props.creator;
		const inputClass = (this.props.imgLoaded?'has-image':'');
		return(
			<div className='col-inner'>
				<div className='sticky' style={this.state.stickyStyle} ref={this.stickyRef}>
					<div className='col-content'>

						<div id='preview' className={inputClass}>
						
							<Module
								creator={creator}
								formData={this.props.formData}
								imgData={this.props.imgData}
								mediaData={this.props.mediaData}
								activeCorner={this.props.activeCorner}
								activeFieldset={this.props.activeFieldset}
								sendActiveCorner={this.props.sendActiveCorner}
								sendActiveFieldset={this.props.sendActiveFieldset}
								/>

							<div id='embed-output'>
								
								<form name='embed' onChange={this.onChangeOpts.bind(this)}>

									<fieldset id='embedPhoto'>
										<legend>
											<span>{creator&&creator.acf ? creator.acf['embed_title'] : null }</span>
										</legend>
										<div className="fieldset-inner">
											<div className="fields-group">
												<div className="field">
													{creator&&creator.acf&&creator.acf['embed_desc'] ?
													<div className='desc' dangerouslySetInnerHTML={{__html: creator.acf['embed_desc'] }}></div>
													: ''}
													<textarea className='output form-elem'
														id='json'
														readOnly={true}
														ref={this.outputRef}
														rows={3}
														value={this.embedCode(this.props.formData)}
														onFocus={this.onFocus.bind(this)}
														onBlur={this.onBlur.bind(this)} />
												</div>
											</div>
										</div>
									</fieldset>

									<fieldset id='addScripts' className={this.state.expand=='addScripts'?'expand':'collapse'}>
										<legend onClick={this.onToggle.bind(this)}>
											<span>{creator&&creator.acf ? creator.acf['scripts_title'] : null }</span>
										</legend>
										<div className="fieldset-inner">
											<div className="fields-group">
												<div className="field">
													{creator&&creator.acf&&creator.acf['scripts_desc'] ?
													<div className='desc' dangerouslySetInnerHTML={{__html: creator.acf['scripts_desc'] }}></div>
													: ''}
													<textarea className='output form-elem'
														id='libraries'
														readOnly={true}
														rows={3}
														value={this.jsCDN+this.jsInit+this.cssCDN}
														onFocus={this.onFocus.bind(this)}
														onBlur={this.onBlur.bind(this)} />
												</div>
											</div>
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

export default Preview;