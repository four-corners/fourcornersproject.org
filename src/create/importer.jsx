import React from 'react';
import { render } from 'react-dom';
import ReactHtmlParser from 'react-html-parser';
import i18n from '../i18n.jsx';
import Label from './form/label.jsx';

const slugify = require('slugify');

class Importer extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			openPopup: false,
			openDesc: false
		};
		// this.translations = this.props.creator.acf;
	}


	openPopup(e) {
		e.preventDefault();
		this.setState({
			openPopup: true
		});
	}

	closePopup(e) {
		e.preventDefault();
		this.setState({
			openPopup: false
		});
	}

	toggleDesc(e) {
		this.setState({
			openDesc: !this.state.openDesc
		});
	}

	importCode(e) {
		e.preventDefault();
		const value = e.target.querySelector('textarea').value;
		try {
			const embedHtml = ReactHtmlParser(value)[0];
			const	embedImgSrc = embedHtml.props.children[0].props.src;
			const	embedJSON = JSON.parse(embedHtml.props['data-fc']);
			this.props.sendImgSrc(embedImgSrc);
			this.props.sendFormData(embedJSON);
			this.closePopup();
		} catch (e) {
			console.log(e);
		}
	}

	onError(e) {
	}


	render() {
		return (
			<React.Fragment>
				<div id='embed-import' className={this.state.openPopup ? 'opened' : ''}>
					<div id='open-import'>

						<div className='field-label'>
							<label>
								<span onClick={this.openPopup.bind(this)} href='#'>
									Import code to edit
								</span>
								<div className='toggle-desc'>
									<div
										onClick={this.toggleDesc.bind(this)}
										onFocus={this.toggleDesc.bind(this)}>
									</div>
								</div>
							</label>
						  <div className={'desc field-desc'+(this.state.openDesc?' opened':'')}>
						  	Have you've already created a Four Corners embed and wish to make some edits? Click here to import your code and use the forms to make the changes you wish.
					  	</div>
						</div>

					</div>
					<div id='embed-import-popup'>
						<div className='content-block'>
							<form onSubmit={this.importCode.bind(this)}>
								{/*<Label strings={{label:'Import a Four Corners photo'}}/>*/}
								<legend>Import code to edit</legend>
								<div className='desc'>
									Paste the HTML code you previously generated on this page. Clicking import will update all fields of the current form and the preview.
								</div>
								<textarea
									name='import-code'
									className='form-elem'
									rows={5} />
								<div className='buttons-group'>
									<div className='button'
										onClick={this.closePopup.bind(this)}>
										Cancel
									</div>
									<input className='button'
										type='submit'
										value='Import'/>
								</div>
							</form>
						</div>
					</div>
				</div>
			</React.Fragment>
		);
	}
}

export default Importer;