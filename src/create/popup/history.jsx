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
		const hiddenRows = this.state.hiddenRows;
		const history = localStorage.getItem('FourCornersHistory');
		let historyObj = {};
		try {
			historyObj = JSON.parse(history);
		} catch (e) {
			console.warn(e);
		}
		let sortedTimestamps = Object.keys(historyObj).sort(function(a, b) {
			return new Date(b.date) - new Date(a.date);
		});
		let states = [];
		const self = this;
		sortedTimestamps.forEach(function(timestamp, i) {
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


	render() {
		const history = localStorage.getItem('FourCornersHistory');
		return (
			<React.Fragment>
				<legend>View your history</legend>
				<div className='desc'>
					Your edit history is saved within this browser on this device using something called <code>localStoragee</code>. We do not store any of your data or pass form use to any third-parties.
				</div>

				{ history ? this.renderHistory() : 'There is no edit history found.' }

				<div className='buttons-group'>
					<div className='button'
						onClick={this.props.closePopup.bind(this)}>
						Cancel
					</div>
				</div>
			</React.Fragment>
		);
	}
}

export default History;