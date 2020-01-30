import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { render } from 'react-dom';
import ReactHtmlParser from 'react-html-parser';
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

	deleteHistoryRow() {
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
			console.warn(e);
			// this.renderWarning('Something went wrong.');
		}
	}

	copyHistoryRow(elem) {
		elem.setSelectionRange(0, elem.value.length);
	}

	importHistoryRow(elem) {
		const value = this.textarea.current.dataset.value;
		const timestamp = this.props.timestamp;
		this.props.clearFormData();
		this.props.updateFormData(value);
	}

	renderWarning() {

	}

	renderEmpty() {
		return(
			false
		);
	}

	renderModule(formData, photoData) {
		formData = Object.assign({}, formData);
		const imgSrc = photoData ? photoData.src : null;
		const dataStr = JSON.stringify(formData);
		return(
			<div className='fc-embed' data-fc={dataStr}>
				{imgSrc ?
					<img src={imgSrc} className='fc-img'/>
				:''}
			</div>
		);
	}

	renderRow() {
		const strings = this.props.strings;
		const timestamp = this.props.timestamp;
		const dataObj = this.props.dataObj;
		const dateCreated = new Date(Number(timestamp));
		const dateFormat = {
			weekday: 'long',
			year: 'numeric',
			month: 'long',
			day: 'numeric',
			hour: 'numeric',
			minute: 'numeric',
			second: 'numeric'
		};
		const dateString = dateCreated.toLocaleDateString(this.props.lang, dateFormat);
		const photoObj = dataObj.formData.photo;
		const previewEmbed = this.renderModule(dataObj.formData, photoObj);
		const previewHtml = ReactDOMServer.renderToStaticMarkup(previewEmbed).replace(/&quot;/g, '\'');
		const importHtml = ReactDOMServer.renderToStaticMarkup(previewEmbed);

		let rowClass = 'toggler saved-state';
		rowClass += this.state.active?' expand':' collapse';
		return (
			<div key={timestamp} className={rowClass}>
				<div className='toggle-label'
					data-time={timestamp}
					onClick={this.onClickRow.bind(this)}>
						<div className="toggle-text">
							<strong>{dateString}</strong>
						</div>
						<div className="toggle-icon"></div>
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
								value={previewHtml}
								data-value={importHtml}
								onFocus={this.onFocus.bind(this)}>
							</textarea>
							<div className='buttons-group'>
								{/*<div
									className='button'
									data-action={'copy'}
									onClick={this.onClickButton.bind(this)}>
									Copy
								</div>*/}
								<button
									className='button'
									type='submit'
									data-action='import'
									onClick={this.onClickButton.bind(this)}>
									{ReactHtmlParser(strings.history_import)}
								</button>
								<button
									className='button red'
									type='button'
									data-action='delete'
									onClick={this.onClickButton.bind(this)}>
									{ReactHtmlParser(strings.history_delete)}
								</button>
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