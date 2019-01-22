import React from 'react';
import PropTypes from 'prop-types';

class Blocks extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			value: '',
			blocks: [{}],
			mediaData: []
		};
	}

	onChange(e) {
		const name = e.target.name;
		const value = e.target.value;

		const nameArr = name.split('_');
		const fieldsetKey = nameArr[0];
		const blockKey = nameArr[1];
		const fieldKey = nameArr[2];

		const fieldName = [fieldsetKey, blockKey].join('_');
		const index = Number(e.target.dataset.index);

		let blocks = this.state.blocks;
		let block = blocks[index];
		blocks[index][fieldKey] = value;

		if(blocks[index].url) {
			this.getMediaData(blocks[index], fieldsetKey, index);
		}

		this.setState({
			blocks: blocks
		});

		this.props.onChange(fieldName, blocks);
	}

	getMediaData(obj, fieldsetKey, index) {
		const url = obj.url;
		const source = obj.source;
		// if(!isUrl(url)) {return}
		const that = this;
		const uri = encodeURIComponent(url);
		const mediaData = Object.assign({},this.state.mediaData);
		let req = '';
		mediaData[fieldsetKey] = [];
		switch(source) {
			case 'youtube':
				// req = 'https://www.youtube.com/oembed?url='+uri;
				req = 'https://noembed.com/embed?url='+uri;
				break;
			case 'vimeo':
				req = 'https://vimeo.com/api/oembed.json?url='+uri;
				break;
			case 'soundcloud':
				req = 'https://soundcloud.com/oembed?format=json&url='+uri;
				break;
			default:
				return false;
				break;
		}
		const headers = new Headers();
		fetch(req, {
				method: 'GET',
				headers: headers,
	      mode: 'cors',
	      cache: 'default'
	    })
			.then(res => {
				if (!res.ok) {throw Error(res.statusText)}
				return res.json();
			})
			.then(res => {
				mediaData[fieldsetKey][index] = {
					html:res.html,
					width: res.width,
					height: res.height
				};
				// console.log(mediaData);
				this.setState({mediaData: mediaData});
				this.props.sendMediaData(mediaData);
			})
			.catch(function(err) {
				console.log(err);
			});
	}

	renderField(fieldKey, fieldData, blockIndex, fieldIndex) {
		const id = this.props.id;
		const data = this.props.data;
		const text = fieldData.text;
		const type = fieldData.type;
		const fieldset = this.props.fieldset;
		const name = [fieldset, id, fieldKey].join('_');
		let field = '';
		switch(type) {
			case 'text':
				field = <input
									name={name}
									type={'text'}
									data-index={blockIndex}
									className='form-elem'
									onChange={this.onChange.bind(this)}/>
				break;
			case 'select':
				const options = fieldData.options;
				const optionElems = [];
				for(let option of options) {
					optionElems.push(<option value={option} key={optionElems.length}>{option}</option>)
				}
				field = <select
									name={name}
									data-index={blockIndex}
									className='form-elem'
									onChange={this.onChange.bind(this)}>
									{optionElems}
								</select>
				break;
		}

		return(
			<div className="field input" key={fieldIndex}>
				{text && text.label ?
					<label name={id}>
						{text.label}
					</label>
				: ''}
				{text && text.desc ? <div className='desc'>{text.desc}</div> : ''}
				{field}
			</div>
		);
	}

	renderBlock(blockData, i) {
		const fields = this.props.data.fields;
		const fieldKeys = Object.keys(fields);
		let fieldElems = [];
		// for(let fieldKey of fieldKeys) {
		fieldKeys.map((fieldKey, j) => {
			const fieldData = fields[fieldKey];
			const field = this.renderField(fieldKey, fieldData, i, j);
			fieldElems.push(field);
		});
		return(
			<div className='block-widget' key={i}>
				{fieldElems}
			</div>
		);
	}

	renderBlocks() {
		let blocks = [];
		this.state.blocks.map((blockData, i) => {
			const block = this.renderBlock(blockData, i);
			blocks.push(block);
		});
		return blocks;
	}

	addBlock(e) {
		e.preventDefault();
		let blocks = this.state.blocks;
		blocks.push({});
		this.setState({
			blocks: blocks
		});
	}
 
	render() {
		const id = this.props.id;
		const text = this.props.data.text;
		const fieldset = this.props.fieldset;
		const name = [fieldset, id].join('_');

		return(
			<div className="field input">
				{text && text.label ?
					<label name={id}>
						{text.label}
					</label>
				: ''}
				{text && text.desc ? <div className='desc'>{text.desc}</div> : ''}

				<div className="blocks-widget">
					{this.renderBlocks()}
				</div>

				<button
					className="add-block"
					onClick={this.addBlock.bind(this)}>
					{'Add block'}
				</button>

			</div>
		);
	}
}

export default Blocks;