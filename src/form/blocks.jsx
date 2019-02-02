import React from 'react';
import PropTypes from 'prop-types';
const slugify = require('slugify');

class Blocks extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			value: '',
			blocks: [],
			mediaData: [],
			urlPlaceholder: null
		};
	}

	onChange(e) {
		const select = e.target;
		const name = select.name;
		const value = select.value;

		const nameArr = name.split('_');
		const fieldsetKey = nameArr[0];
		const blockKey = nameArr[1];
		const fieldKey = nameArr[2];

		const fieldName = [fieldsetKey, blockKey].join('_');
		const index = Number(select.dataset.index);

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

	onSelectChange(e) {
		const select = e.target;
		const urlPlaceholder = select.options[select.selectedIndex].dataset.urlPlaceholder;
		this.setState({
			urlPlaceholder: urlPlaceholder
		});
	}

	getMediaData(obj, fieldsetKey, index) {
		const url = obj.url;
		const source = obj.source;
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
		const urlPlaceholder = this.state.urlPlaceholder;
		let placeholder = fieldKey=='url'&&urlPlaceholder?urlPlaceholder:text.placeholder;
		switch(type) {
			case 'text':
				field = <input
									name={name}
									type={'text'}
									data-index={blockIndex}
									placeholder={placeholder}
									className='form-elem'
									onChange={this.onChange.bind(this)}/>
				break;
			case 'select':
				const opts = fieldData.opts;
				const optionElems = [];
				for(let opt of opts) {
					const slug = slugify(opt.label,{lower: true})
					optionElems.push(
						<option
							value={slug}
							data-url-placeholder={opt.url_placeholder}
							key={optionElems.length}>
							{opt.label}
						</option>)
				}
				field = <select
									name={name}
									className='form-elem'
									data-index={blockIndex}
									onChange={(e) => {
										this.onSelectChange(e);
										this.onChange(e);
									}}>
									{optionElems}
								</select>
				break;
		}

		return(
			<div className="field input" key={fieldIndex}>
				{text && text.label ?
					<label name={name}>
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
			<div className="block-widget" key={i}>
				{fieldElems}
				<div
					className="delete-block"
					data-index={i}
					onClick={this.deleteBlock.bind(this)}/>
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

	deleteBlock(e) {
		let blocks = this.state.blocks;
		const index = e.target.dataset.index;
		delete blocks[index];
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

				<div className="button add-block" onClick={this.addBlock.bind(this)}>
					Add {id.replace('s','')}
				</div>

			</div>
		);
	}
}

export default Blocks;