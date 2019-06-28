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
			error: false
		};
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		if(this.props != prevProps) {
			this.setState({
				error: this.props.error
			});
		}
	}

	onChange(e) {
		this.setState({
			error: false
		});
	}
	
	importCode(e) {
		e.preventDefault();
		const importTextarea = document.getElementsByName('import-code')[0],
					value = importTextarea.value;
		let error;
		if(value) {
			this.props.clearFormData();
			this.props.updateFormData(value);
			error = false;
		} else {
			error = "No embed code was added.";
		}
		this.setState({
			error: error
		});
	}

	render() {
		const strings = this.props.strings;
		const className = ['field', 'input'];
		if(this.state.error){className.push('error')}
		return (
			<React.Fragment>
				<button className='button close-popup'
					onClick={this.props.closePopup.bind(this)}>
				</button>
				<form onSubmit={this.importCode.bind(this)}>
					<legend>{strings.import_label}</legend>
					<div className='desc instruct-desc'>
						{ReactHtmlParser(strings.import_desc)}
					</div>
					<div className={className.join(' ')}>
						<textarea
							name='import-code'
							className='form-elem'
							rows={6}
							onChange={this.onChange.bind(this)}/>
						{ this.state.error ?
							<div className='desc error-desc'>{this.state.error}</div> : '' }
					</div>
					<div className='buttons-group'>
						<button
							className='button'
							type='submit'
							onClick={this.importCode.bind(this)}>
							{strings.import_button}
						</button>
					</div>
				</form>
			</React.Fragment>
		);
	}
}

export default Import;