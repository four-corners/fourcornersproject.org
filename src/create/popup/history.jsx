import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { render } from 'react-dom';
// import ReactHtmlParser from 'react-html-parser';
import i18n from '../../i18n.jsx';
import HistoryRow from './history-row.jsx';

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
						dataObj={historyObj[timestamp]}
						timestamp={timestamp}
						lang={self.props.lang}
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
		const history = localStorage.getItem('FourCornersHistory');
		return (
			<React.Fragment>
				<legend>View your history</legend>
				<div className='desc'>
					Your edit history is saved within your browser using something called <code>localStorage</code>. This data is never transferred to a server.
				</div>

				{ history ? this.renderHistory() : <h3>There is no edit history found.</h3> }

				<div className='buttons-group'>
					<div className='button'
						onClick={this.props.closePopup.bind(this)}>
						Cancel
					</div>
					<div className='button'
						onClick={this.props.toggleSave.bind(this)}>
						{this.props.saveHistory ? 'Stop' : 'Start'} saving
					</div>
					<div className='button red'
						onClick={this.deleteHistory.bind(this)}>
						Delete all
					</div>
				</div>
			</React.Fragment>
		);
	}
}

export default History;