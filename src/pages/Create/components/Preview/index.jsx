import React from "react";
import SchemaForm from "react-jsonschema-form";
import Dropzone from "react-dropzone";
import { renderToStaticMarkup } from "react-dom/server"
import { encode } from "html-entities";

import i18n from '/src/utils/i18n'
import PreviewModule from "./PreviewModule";

class Preview extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			includeCss: false,
			includeJs: false,
			expand: false,
			scrollY: 0,
			previewColStyle: {},
			previewStyle: {}
		};
		// this.imgInputRef = React.createRef();
		// this.includeJSRef = React.createRef();
		// this.includeCSSRef = React.createRef();

		this.previewColRef = React.createRef();
		this.previewRef = React.createRef();
		this.outputRef = React.createRef();
	}

	componentDidMount() {
		window.addEventListener("scroll", this.onScroll.bind(this));
	}

	componentWillUnmount() {
		window.removeEventListener("scroll", this.onScroll.bind(this));
	}

	onScroll(e) {
		const {
			height: previewHeight
		} = this.previewRef.current.getBoundingClientRect();
		const {
			top: previewColTop,
			bottom: previewColBottom,
			width: previewColWidth,
			height: previewColHeight
		} = this.previewColRef.current.getBoundingClientRect();

		let previewStyle = {};

		if(previewColTop <= 0) {
			previewStyle = {
				position: "fixed",
				top: "2rem",
				width: previewColWidth
			};
		}

		if(previewColBottom <= window.innerHeight) {
			previewStyle = {
				position: "fixed",
				top: "unset",
				bottom:  window.innerHeight - previewColBottom + "px",
				width: previewColWidth
			};
		}

		this.setState({
			previewStyle: previewStyle
		});
	}

	onChangeOpts(e) {
		let stateChange = {
			formData: this.props.formData
		};
		if(e.target.type == "checkbox") {
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
		console.warn("Error", e);
	}

	onToggle(e) {
		e.preventDefault();
		let id = e.currentTarget.parentElement.id;
		if(id==this.state.expand) {id = null}
		this.setState({
			expand: id
		});
	}

	embedCode(formData) {
		let imgLoaded = this.props.imgLoaded,
				auxData = { lang: i18n.language },
				photoSrc = formData.photo ? formData.photo.src : null,
				embedData = JSON.parse(JSON.stringify(Object.assign(formData, auxData), {}));

		if(embedData.photo) {
			delete embedData.photo.src;
		}
		
		// console.log(embedData);
		// let embedDataStr = this.sanitizeCode(embedData);
		let embedDataStr = JSON.stringify(embedData);

		let imgHtml = formData.photo && photoSrc ? `<img class="fc-img" src="${photoSrc}"/>` : "";
		let scriptTagHtml = `<script type="application/json">${embedDataStr}</script>`
		// let stringHtml = `<div class="fc-embed" data-fc="${embedDataStr}">${imgHtml}</div>`;
		let stringHtml = `<div class="fc-embed">${scriptTagHtml}${imgHtml}</div>`;
		return stringHtml;
	}

	sanitizeCode(data) {
		const self = this;
		let dataObj = JSON.parse(JSON.stringify(data));
		Object.keys(dataObj).forEach(function(key) {
			const value = dataObj[key];
			if(typeof value == "object") {
				Object.keys(value).forEach(function(subKey) {
					if(typeof value[subKey] === "string") {
						dataObj[key][subKey] = self.sanitizeString(value[subKey]);
					} else if(value[subKey] instanceof Array) {
						value[subKey].forEach(function(subObj, i) {
							Object.keys(subObj).forEach(function(subObjKey) {
								dataObj[key][subKey][i][subObjKey] = self.sanitizeString(subObj[subObjKey]);
							});
						});
					}
				});
			}
		});
		let embedDataStr = JSON.stringify(dataObj);
		return embedDataStr;
	}

	sanitizeString(string) {
		if(typeof string !== "string") {
			return string
		}
		return string.replace(/"/g, "&apos;")
			.replace(/"/g, "\"")
			.replace(/&quot;/g, "\"")
			.replace(/“/g, "&ldquo;")
			.replace(/”/g, "&rdquo;")
			.replace(/′/g, "&prime;")
			.replace(/″/g, "&Prime;");
	}

	render() {
		const creator = this.props.creator;
		const inputClass = (this.props.imgLoaded?"has-image":"");
		const cdnVer = creator.strings["version"] || 'latest';
		const jsURL = "https://cdn.jsdelivr.net/npm/@four-corners/fourcorners.js@"+cdnVer+"/dist/fourcorners.min.js";
		const cssURL = "https://cdn.jsdelivr.net/npm/@four-corners/fourcorners.js@"+cdnVer+"/dist/fourcorners.min.css";
		const cssCDN = "<link href=\""+cssURL+"\" rel=\"stylesheet\" type=\"text/css\">";
		const jsCDN = "<script src=\""+jsURL+"\" type=\"text/javascript\"></script>";
		const jsInit = "<script type=\"text/javascript\">window.onload=function(){document.querySelectorAll(\".fc-embed\").forEach(function(elem){new FourCorners(elem)})}</script>";
		return(
			<div className="col-inner" ref={this.previewColRef} style={this.state.previewColStyle}>
				<div className="col-content">
					<div id="preview" className={inputClass} ref={this.previewRef} style={this.state.previewStyle}>
					
						<PreviewModule
							creator={creator}
							formData={this.props.formData}
							imgLoaded={this.props.imgLoaded}
							mediaData={this.props.mediaData}
							activeCorner={this.props.activeCorner}
							activeFieldset={this.props.activeFieldset}
							sendActiveCorner={this.props.sendActiveCorner}
							sendActiveFieldset={this.props.sendActiveFieldset} />

						<div id="embed-output">
							<form name="embed" onChange={this.onChangeOpts.bind(this)}>

								<fieldset id="addScripts" className={"toggler "+(this.state.expand?"expand":"collapse")}>
									<legend className="toggle-label" onClick={this.onToggle.bind(this)}>
										<div className="toggle-text">{creator&&creator.strings ? creator.strings["scripts_title"] : null }</div>
										<div className="toggle-icon"></div>
									</legend>
									<div className="fieldset-inner">
										<div className="fields-group">
											<div className="field">
												{creator&&creator.strings&&creator.strings["scripts_desc"] ?
												<div className="desc" dangerouslySetInnerHTML={{__html: creator.strings["scripts_desc"] }}></div>
												: ""}
												<textarea className="output form-elem"
													id="libraries"
													readOnly={true}
													rows={3}
													value={jsCDN+jsInit+cssCDN}
													onFocus={this.onFocus.bind(this)}
													onBlur={this.onBlur.bind(this)} />
											</div>
										</div>
									</div>
								</fieldset>

								<fieldset id="embedPhoto">
									<legend>
										<div className="toggle-text">{creator&&creator.strings ? creator.strings["embed_title"] : null }</div>
										{/*<div className="toggle-icon"></div>*/}
									</legend>
									<div className="fieldset-inner">
										<div className="fields-group">
											<div className="field">
												{creator&&creator.strings&&creator.strings["embed_desc"] ?
												<div className="desc" dangerouslySetInnerHTML={{__html: creator.strings["embed_desc"] }}></div>
												: ""}
												<textarea className="output form-elem"
													id="json"
													readOnly={true}
													ref={this.outputRef}
													rows={3}
													value={this.embedCode(this.props.formData)}
													onFocus={this.onFocus.bind(this)}
													onBlur={this.onBlur.bind(this)} />
											</div>

											<small>
												Need help getting this working on your website? Email <a href="mailto:fourcornersphotograph@gmail.com">fourcornersphotograph@gmail.com</a>.
											</small>
										</div>
									</div>
								</fieldset>

							</form>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Preview;