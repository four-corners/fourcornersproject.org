import React, { Component } from 'react';
import Header from './header';

class App extends Component {
	constructor() {
		super();
		this.state = {
			isOpen: false,
			contents: [],
			current: null,
			dataRoute: SiteSettings.url.api+'creators'
		}
	}
	get scaledSections() {
		var nbr = (this.state.contents.length/3)
			.toString()
			.split('.');
		var contents = [];
		for(var i = 0; i < nbr[0]; i++) {
			contents[i] = [];
				for(var j = 1; j <= 3; j++ ) {
					contents[i].push(this.state.contents[i*3 + j - 1]);
			}
		}
		if(nbr[1]) {
			var missing = nbr[1].startsWith('3')
				? 1
				: 2;
			contents.push([]);
			for(var k = 0; k < missing; k++) {
				contents[contents.length - 1].push(this.state.contents[nbr[0]* 3 + k]);
			}
		}
		return contents;
	}
	componentDidMount() {
		fetch(this.state.dataRoute)
			.then(res => res.json())
			.then(contents => this.setState((prevState, props) => {
				return { contents: contents.map(this.mapSection)};
			}));
	} 
	mapSection(content) {
		return {
			id: content.ID,
			title: content.post_title,
			description: content.post_content,
			lang: '',
			content: content.acf
		}
	}
	testTrigger(contents) {
		console.log(contents);
	}
	render() {
		return (
		<div className='App'>
			<header className='App-header'>
				<Header></Header>
			</header>      
			<div>
				{this.scaledSections.map((level, i) =>
				<div className='columns' key={i}>
					{level.map((data, j) =>
						<div className='column' key={j}>
							<input
								type='text'
								value={data.content['title']}
								onClick={() => this.testTrigger(this.state.contents)}/>
						</div>
					)}
				</div>
				)} 
			</div>
		</div>);
	}
}
export default App;
// {() => this.openPopupbox(this.state.contents[i*3+j])}