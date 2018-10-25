import React from 'react';

class Creator extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			creator: {}
		};
	}

	componentDidMount() {
		var that = this;
		var url = window.location.href.split('/');
		var slug = url.pop() || url.pop();
		var request = SiteSettings.url.api + 'creators?slug=' + slug;
		fetch(request)
			.then(function(response) {
				if (!response.ok) {
					throw Error(response.statusText);
				}
				return response.json();
			})
			.then(function(res) {
				that.setState({ creator: res[0] });
			});
	}

	renderCreator() {
		console.log(this.state.creator);
		var form = {
			backstory: {
				title: 'Backstory',
				fields: {
					story: 'text',
					author: 'text',
					publication: 'text',
					url: 'text',
					date: 'date'
				}
			},
			copyright: {
				title: 'Backstory',
				fields: {
					copyright: 'select',
					credit: 'text',
					year: 'number',
					ethics: 'select'
				}
			}
		};


		return (
			<form>
				<h4 className='form-title'>{this.state.creator.post_title}</h4>
			</form>
		);
	}

	renderEmpty() {
		return (
			<h1>LOADING</h1>
		);
	}

	render() {
		return (
			<div className='creator'>
				{this.state.creator ? this.renderCreator() : this.renderEmpty()}
			</div>
		);
	}
}

export default Creator;