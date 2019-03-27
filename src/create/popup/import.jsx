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
		this.props.updateFormData(value);
	}

	render() {
		const strings = this.props.strings;
		return (
			<form onSubmit={this.importCode.bind(this)}>
				<legend>{strings.import_label}</legend>
				<div className='desc'>
					{ReactHtmlParser(strings.import_desc)}
				</div>
				<textarea
					name='import-code'
					className='form-elem'
					rows={6} />
				<div className='buttons-group'>
					<div className='button'
						onClick={this.props.closePopup.bind(this)}>
						Cancel
					</div>
					<input className='button'
						type='submit'
						value={strings.import_button}/>
				</div>
			</form>
		);
	}
}

export default Import;