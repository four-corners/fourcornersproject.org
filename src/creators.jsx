import React from 'react';
import { Link } from 'react-router-dom';
import CreatorList from './creator-list';

class Creators extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			creators: [],
			page: 0,
			getCreators: true,
			controller: false
		};
		this.getMoreCreators = this.getMoreCreators.bind(this);
	}

	componentWillUnmount() {
		this.getMoreCreators = null;
	}

	componentDidMount() {
		var that = this;
		window.onbeforeunload = function() {
			window.scrollTo(0, 0);
		};
	}

	getMoreCreators() {
		var that = this;
		var totalPages;

		this.setState({ page: this.state.page + 1 });
		var request = SiteSettings.url.api + 'creators/?page=' + this.state.page;
		fetch(request)
			.then(function(response) {
				for (var pair of response.headers.entries()) {
					// getting the total number of pages
					if (pair[0] == 'x-wp-totalpages') {
						totalPages = pair[1];
					}

					if (that.state.page >= totalPages) {
						that.setState({ getCreators: false });
					}
				}
				if (!response.ok) {
					throw Error(response.statusText);
				}
				return response.json();
			})
			.then(function(results) {
				var allCreators = that.state.creators.slice();
				results.forEach(function(single) {
					allCreators.push(single);
				});
				that.setState({ creators: allCreators });
			})
			.catch(function(error) {
				console.log(
					'There has been a problem with your fetch operation: ' + error.message
				);
			});
	}

	componentDidUpdate() {
		
	}

	render() {
		if (!this.state.creators.length === 0) {
			return <h1>LOADING CREATORS</h1>;
		}
		return (
			<div>
				<div className='container'>
					<h1 className='creators-title'>Creators</h1>
					<CreatorList creators={this.state.creators} />
				</div>
			</div>
		);
	}
}

export default Creators;