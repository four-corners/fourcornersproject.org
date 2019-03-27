import React from 'react';
import { render } from 'react-dom';
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
		return (
			<form onSubmit={this.importCode.bind(this)}>
				<legend>Import code to edit</legend>
				<div className='desc'>
					Paste the HTML code you previously generated on this page. Clicking import will update all fields of the current form and the preview.
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
						value='Import'/>
				</div>
			</form>
		);
	}
}

export default Import;