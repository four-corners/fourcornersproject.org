import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { render } from 'react-dom';
// import ReactHtmlParser from 'react-html-parser';
import i18n from '../../i18n.jsx';

// const slugify = require('slugify');

class HistoryRow extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			active: false,
			hidden: false
		};
		this.textarea = React.createRef();
	}

	componentDidMount() {
		
	}

	onFocus(e) {
		const elem = e.currentTarget;
		this.copyHistoryRow(elem);
	}

	onClickRow(e) {
		const time = e.currentTarget.dataset.time;
		const newActiveRow = !this.state.active;
		this.setState({
			active: newActiveRow
		});
	}

	onClickButton(e) {
		e.preventDefault();
		const elem = e.currentTarget;
		const action = elem.dataset.action;
		switch(action) {
			case 'delete':
				this.deleteHistoryRow();
				break;
			case 'copy':
				this.copyHistoryRow();
				break;
			case 'import':
				this.importHistoryRow();
				break;
		}
	}

	deleteHistoryRow(elem) {
		const history = localStorage.getItem('FourCornersHistory');
		try {
			const historyObj = JSON.parse(history);
			const timestamp = this.props.timestamp;
			if(historyObj[timestamp]) {
				delete historyObj[timestamp];
				const historyStr = JSON.stringify(historyObj);
				localStorage.setItem('FourCornersHistory', historyStr);
				this.setState({
					hidden: true
				});
			}
		} catch (e) {
			// this.renderWarning('Something went wrong.');
		}
	}

	copyHistoryRow(elem) {
		elem.setSelectionRange(0, elem.value.length);
	}

	importHistoryRow(elem) {
		const value = this.textarea.current.dataset.value;
		this.props.updateFormData(value);
	}

	renderWarning() {

	}

	renderEmpty() {
		return(
			false
		);
	}

	renderRow() {
		const timestamp = this.props.timestamp;
		const dataObj = this.props.dataObj;
		const dataStr = JSON.stringify(dataObj.formData);
		const dateCreated = new Date(Number(timestamp));
		const dateFormat = {
			weekday: 'long',
			year: 'numeric',
			month: 'long',
			day: 'numeric',
			hour: 'numeric',
			minute: 'numeric'
		};
		const dateString = dateCreated.toLocaleDateString(this.props.lang, dateFormat);
		const previewEmbed = <div className='fc-embed' data-fc={dataStr}></div>
		const previewHtml = ReactDOMServer.renderToStaticMarkup(previewEmbed);

		let rowClass = 'toggler saved-state';
		rowClass += this.state.active?' expand':' collapse';
		return (
			<div key={timestamp} className={rowClass}>
				<div
					className='toggle-label'
					data-time={timestamp}
					onClick={this.onClickRow.bind(this)}>
					<span><strong>{dateString}</strong></span>
				</div>
				<div className='saved-inner'>
					<div className='row'>
						<div className='col col-6'>
							{previewEmbed}
						</div>
						<div className='col col-6'>
							<textarea
								ref={this.textarea}
								className='output form-elem'
								rows={6}
								readOnly={true}
								value={previewHtml.replace(/&quot;/g, '\'')}
								data-value={previewHtml}
								onFocus={this.onFocus.bind(this)}>
							</textarea>
							<div className='buttons-group'>
								<div
									className='button red'
									data-action={'delete'}
									onClick={this.onClickButton.bind(this)}>
									Delete
								</div>
								{/*<div
									className='button'
									data-action={'copy'}
									onClick={this.onClickButton.bind(this)}>
									Copy
								</div>*/}
								<div
									className='button'
									data-action={'import'}
									onClick={this.onClickButton.bind(this)}>
									Import to form
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}

	render() {
		return(
			this.state.hidden ? false : this.renderRow()
		);
	}
}

export default HistoryRow;