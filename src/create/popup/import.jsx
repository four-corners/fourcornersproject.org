import React from 'react';
import { render } from 'react-dom';
import ReactHtmlParser from 'react-html-parser';
// import ReactHtmlParser from 'react-html-parser';
import i18n from '../../i18n.jsx';

class Import extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			activeRow: false,
		};
	}
	
	importCode(e) {
		e.preventDefault();
		const value = e.target.querySelector('textarea').value;
		this.props.clearFormData();
		this.props.updateFormData(value);
	}

	render() {
		const strings = this.props.strings;
		return (
			<form onSubmit={this.importCode.bind(this)}>
				<legend>{strings.import_label}</legend>
				<button className='button close-popup'
					onClick={this.props.closePopup.bind(this)}>
				</button>
				<div className='desc'>
					{ReactHtmlParser(strings.import_desc)}
				</div>
				<textarea
					name='import-code'
					className='form-elem'
					rows={6} />
				<div className='buttons-group'>
					<button
						className='button'
						type='submit'
						onClick={this.importCode.bind(this)}>
						{strings.import_button}
					</button>
				</div>
			</form>
		);
	}
}

export default Import;