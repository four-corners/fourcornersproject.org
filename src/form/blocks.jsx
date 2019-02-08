import React from 'react';
import PropTypes from 'prop-types';
import Label from './label.jsx';
const slugify = require('slugify');

class Blocks extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			value: '',
			blocks: [],
			superIndex: 0,
			mediaData: []
		};
	}

	onChange(e) {
		const input = e.target;
		const name = input.name;
		const value = input.value;
		const nameArr = name.split('_');
		const fieldsetKey = nameArr[0];
		const blockKey = nameArr[1];
		const fieldKey = nameArr[2];
		const fieldName = [fieldsetKey, blockKey].join('_');
		const blockIndex = Number(input.parentElement.parentElement.dataset.index);

		let blocks = this.state.blocks.slice(0);
		let block = blocks[blockIndex];
		block[fieldKey] = value;
		if(block.url) {
			this.getMediaData(block, fieldsetKey, blockIndex);
		}

		this.setState({
			blocks: blocks
		});

		this.props.onChange(fieldName, blocks);
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

	renderBlocks() {
		let blocks = [];
		this.state.blocks.map((block, i) => {
			if(block.deleted){return}
			blocks.push(
				this.renderBlock(block, i)
			);
		});
		return blocks;
	}

	renderBlock(block, blockIndex) {
		const fieldset = this.props.fieldset;
		const id = this.props.id;
		const data = this.props.data;
		if(!data.types){return null}
		const type = data.types[block.source];
		if(!type){return null}
		type.slug = slugify(type.label,{lower:true});
		type.name = [fieldset, id, 'source'].join('_');
		const fields = data.fields;
		const fieldKeys = Object.keys(fields);
		let fieldElems = [];
		fieldKeys.map((fieldKey, fieldIndex) => {
			const fieldData = fields[fieldKey];
			const field = this.renderField(fieldKey, fieldData, type, block.index, fieldIndex);
			fieldElems.push(field);
		});
		return(
			<div
				className='block-widget'
				data-slug={block.sourceSlug}
				data-index={blockIndex}
				key={block.index}>

				<input
					name={type.name}
					type='hidden'
					// onChange={this.onChange.bind(this)}
					value={type.slug} />

				{fieldElems}

				<div
					className='delete-block'
					onClick={this.deleteBlock.bind(this)}/>
			</div>
		);
	}

	renderField(fieldKey, fieldData, type, blockIndex, fieldIndex) {
		const fieldset = this.props.fieldset;
		const id = this.props.id;
		const data = this.props.data;
		const name = [fieldset, id, fieldKey, blockIndex, fieldIndex].join('_');
		let strings = Object.assign({},fieldData.text);
		if(fieldKey == 'url') {
			strings = type;
		}
		return(
			<div className='field input' key={name}>
				<Label strings={strings} fieldId={id} />
				<input
					className='form-elem'
					name={name}
					type={'text'}
					placeholder={strings.placeholder}
					onChange={this.onChange.bind(this)}/>
			</div>
		);
	}

	renderButtons() {
		const data = this.props.data;
		const types = data.types;
		if(!types){return}
		let buttons = [];
		Object.keys(types).map((key, i) => {
			let type = types[key];
			const button = this.renderButton(type, key);
			buttons.push(button);
		});
		return buttons;
	}

	renderButton(type, slug) {
		return (
			<div className="button add-block"
				data-slug={slug}
				key={slug}
				onClick={this.addBlock.bind(this)}>
				Add {type.label}
			</div>
		);
	}

	addBlock(e) {
		e.preventDefault();
		const fieldName = [this.props.fieldset, this.props.id].join('_')
		const newBlocks = this.state.blocks.concat([{
			source: e.target.dataset.slug,
			index: this.state.superIndex
		}])
		this.setState({
			blocks: newBlocks,
			superIndex: this.state.superIndex+1
		});
		this.props.onChange(fieldName, newBlocks);
		this.props.sendActiveCorner(this.props.fieldset);
	}

	deleteBlock(e) {
		let blocks = this.state.blocks;
		const blockElem = e.target.parentElement;
		const index = Number(blockElem.dataset.index);
		const fieldName = [this.props.fieldset, this.props.id].join('_');
		const newBlocks = this.state.blocks.filter((b, i) => i !== index)
		this.setState({
			blocks: newBlocks
		});
		this.props.onChange(fieldName, newBlocks);
	}
 
	render() {
		const id = this.props.id;
		const text = this.props.data.text;
		const fieldset = this.props.fieldset;
		const name = [fieldset, id].join('_');
		return(
			<div className="field input">

				<div className="blocks-widget">
					{this.renderBlocks()}
				</div>

				<div className="blocks-buttons">
					{this.renderButtons()}
				</div>

			</div>
		);
	}
}

export default Blocks;