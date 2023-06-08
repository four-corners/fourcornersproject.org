import React from 'react';
import { render } from 'react-dom';
import ReactDOMServer from 'react-dom/server';
import ReactHtmlParser from 'react-html-parser';
// import ReactHtmlParser from 'react-html-parser';
import HistoryRow from './_historyRow';

// const slugify = require('slugify');

class History extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			activeRow: null,
		};
	}

	componentDidMount() {
	
	}

	renderWarning() {

	}

	// closePopup() {
	// 	this.props.closePopup();
	// }

	renderHistory() {
		const self = this;
		const hiddenRows = self.state.hiddenRows;
		const history = localStorage.getItem('FourCornersHistory');
		let historyObj = JSON.parse(history) || {};
		let sortedHistoryObj = Object.keys(historyObj).sort(function(a, b) {
			return b - a;
		});

		let states = [];
		sortedHistoryObj.forEach(function(timestamp, i) {
			if(self.props.timestamp != timestamp) {
				states.push(
					<HistoryRow
						key={i}
						strings={self.props.strings}
						dataObj={historyObj[timestamp]}
						timestamp={timestamp}
						lang={self.props.lang}
						clearFormData={self.props.clearFormData.bind(this)}
						updateFormData={self.props.updateFormData.bind(this)}>
					</HistoryRow>
				);
			}
		})

		return(
			<div className='saved-states'>
				{states}
			</div>
		);
	}

	deleteHistory() {
		const history = localStorage.getItem('FourCornersHistory');
		const historyObj = JSON.parse(history) || {};
		this.setState({
			hiddenRows: Object.keys(historyObj)
		});
		localStorage.removeItem('FourCornersHistory');
	}


	render() {
		const strings = this.props.strings;
		const history = localStorage.getItem('FourCornersHistory');
		return (
			<React.Fragment>
				<legend>{strings.history_label}</legend>
				<button className='button close-popup'
					onClick={this.props.closePopup.bind(this)}>
				</button>
				<div className='desc instruct-desc'>
					{ReactHtmlParser(strings.history_desc)}
				</div>

				{ history ? this.renderHistory() : <h3>There is no edit history found.</h3> }

				<div className='buttons-group'>
					<button className='button'
						onClick={this.props.toggleSave.bind(this)}>
						{this.props.saveHistory ? strings.history_opt_out : strings.history_opt_in}
					</button>
					<button className='button red'
						onClick={this.deleteHistory.bind(this)}>
						{strings.history_delete_all}
					</button>
				</div>
			</React.Fragment>
		);
	}
}

export default History;