import React from 'react';
import PropTypes from 'prop-types';
import Label from './label.jsx';
const slugify = require('slugify');

class Blocks extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			blocks: [],
			blockMedia: [],
			superIndex: 0,
		};
	}

	componentDidUpdate() {
		const setKey = this.props.setKey;
		const fieldKey = this.props.fieldKey;
		const fieldValue = this.props.fieldValue;
		if(fieldValue && fieldValue != this.state.blocks) {
			fieldValue.map((block, blockIndex) => {
				fieldValue[blockIndex].index = blockIndex;
				if(fieldKey === 'media' && block.url) {
					this.getMediaData(block, setKey, blockIndex);
				}
			});

			this.setState({
				blocks: fieldValue,
				superIndex: fieldValue.length+1
			});
		}
	}

	onChange(e) {
		const input = e.target;
		const name = input.name;
		const value = input.value;
		const nameArr = name.split('_');
		const setKey = nameArr[0];
		const fieldKey = nameArr[1];
		const subFieldKey = nameArr[2];
		const fieldName = [setKey, fieldKey].join('_');
		const blockIndex = Number(input.parentElement.parentElement.dataset.index);
		let blocks = this.state.blocks;
		let block = blocks[blockIndex];
		block[subFieldKey] = value;
		if(fieldKey === 'media' && block.url) {
			this.getMediaData(block, setKey, blockIndex);
		}

		this.setState({
			blocks: blocks
		});

		this.props.onChange(fieldName, blocks);
	}

	onPsuedoChange(e) {
		return;
	}

	getMediaData(obj, setKey, index) {
		const url = obj.url;
		const source = obj.source;
		const that = this;
		const uri = encodeURIComponent(url);
		let req = '';
		// const blockMedia = this.state.blockMedia.slice(0);
		// console.log(blockMedia);
		const mediaData = Object.assign({}, this.state.blockMedia);
		switch(source) {
			case 'youtube':
				req = 'https://noembed.com/embed?url='+uri;
				break;
			case 'vimeo':
				req = 'https://vimeo.com/api/oembed.json?url='+uri;
				break;
			case 'soundcloud':
				req = 'https://soundcloud.com/oembed?format=json&url='+uri;
				break;
			default:
				req = null
				break;
		}
		if(req) {
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
				const blockMedia = this.state.blockMedia;
				blockMedia[index] = {
					html:res.html,
					width: res.width,
					height: res.height
				};
				this.setState({blockMedia: blockMedia});
				mediaData[setKey] = blockMedia;
				this.props.sendMediaData(mediaData);
			})
			.catch(function(err) {
				console.warn(err);
			});
		} else {
			const blockMedia = this.state.blockMedia;
			blockMedia[index] = {
				url: uri
			};
			this.setState({blockMedia: blockMedia});
			mediaData[setKey] = blockMedia;
			this.props.sendMediaData(mediaData);
		}
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
		block.index = blockIndex;
		const blocks = this.state.blocks,
					setKey = this.props.setKey,
					fieldKey = this.props.fieldKey,
					field = this.props.field,
					subFields = field.fields,
					subFieldKeys = Object.keys(subFields),
					subFieldValue = null;
		if(!field.types){return null}
		const typeStrings = field.types[block.source];
		if(!typeStrings){return null}
		typeStrings.slug = slugify(typeStrings.label,{lower:true});
		typeStrings.name = [setKey, fieldKey, 'source'].join('_');

		let subFieldElems = [];
		subFieldKeys.map((subFieldKey, subFieldIndex) => {
			const subFieldData = subFields[subFieldKey],
						subFieldValue = block[subFieldKey];
			subFieldElems.push(
				this.renderField(subFieldKey, subFieldData, subFieldValue, typeStrings, block.index, subFieldIndex)
			);
		});
		const upIndex = blockIndex-1;
		const downIndex = blockIndex+1;
		return(
			<div
				className='block-widget'
				data-slug={block.sourceSlug}
				data-index={blockIndex}
				key={block.index}>

				<input
					name={typeStrings.name}
					type='hidden'
					value={typeStrings.slug}
					onChange={this.onPsuedoChange.bind(this)} />

				{subFieldElems}

				<div className='widget-buttons'>

					{upIndex>=0?
					<button
						data-dir='up'
						data-new-index={upIndex}
						className='widget-button move-block'
						onClick={this.moveBlock.bind(this)}>
					</button>
					:''}
					{downIndex<blocks.length?
					<button
						data-dir='down'
						data-new-index={downIndex}
						className='widget-button move-block'
						onClick={this.moveBlock.bind(this)}>
					</button>
					:''}

					<button
						className='widget-button delete-block'
						onClick={this.deleteBlock.bind(this)}>
					</button>

				</div>
			</div>
		);
	}

	renderField(subFieldKey, subFieldData, subFieldValue, typeStrings, blockIndex, subFieldIndex) {
		const setKey = this.props.setKey,
					fieldKey = this.props.fieldKey,
					data = this.props.data;
		const name = [setKey, fieldKey, subFieldKey, blockIndex].join('_');
		let strings;
		if(subFieldKey == 'url') {
			strings = typeStrings;
		} else {
			strings = Object.assign({}, subFieldData.strings);
		}
		return(
			<div className='field' key={subFieldIndex}>
				<Label strings={strings} fieldKey={fieldKey} />
				<input
					name={name}
					className='form-elem'
					type='text'
					// value={subFieldValue}
					placeholder={strings.placeholder}
					onChange={this.onChange.bind(this)}/>
			</div>
		);
	}

	renderButtons() {
		const field = this.props.field;
		const types = field.types;
		if(!types){return}
		let buttons = [];
		Object.keys(types).map((typeKey, i) => {
			let type = types[typeKey];
			const button = this.renderButton(type, typeKey, i);
			buttons.push(button);
		});
		return buttons;
	}

	renderButton(type, typeKey, i) {
		return (
			<button key={i}
				className='button add-block'
				data-slug={typeKey}
				onClick={this.addBlock.bind(this)}>
				Add {type.label}
			</button>
		);
	}

	addBlock(e) {
		e.preventDefault();
		const fieldName = [this.props.setKey, this.props.fieldKey].join('_')
		const newBlocks = this.state.blocks.concat([{
			source: e.target.dataset.slug,
			index: this.state.superIndex
		}]);
		this.setState({
			blocks: newBlocks,
			superIndex: this.state.superIndex+1
		});
		this.props.onChange(fieldName, newBlocks);
		this.props.sendActiveCorner(this.props.setKey);
	}

	deleteBlock(e) {
		let blocks = this.state.blocks;
		const setKey = this.props.setKey;
		const fieldKey = this.props.fieldKey;
		const blockElem = e.target.parentElement.parentElement;
		const index = Number(blockElem.dataset.index);
		const fieldName = [setKey, fieldKey].join('_');
		const newBlocks = this.state.blocks.filter((b, i) => i !== index);
		const newBlockMedia = this.state.blockMedia.filter((b, i) => i !== index);
		this.setState({
			blocks: newBlocks,
			blockMedia: newBlockMedia
		});

		this.props.onChange(fieldName, newBlocks);
		this.props.sendActiveCorner(setKey);
		let newMediaData = Object.assign({}, this.props.mediaData);
		newMediaData[setKey] = newBlockMedia;
		this.props.sendMediaData(newMediaData);
	}

	moveBlock(e) {
		const setKey = this.props.setKey;
		const fieldKey = this.props.fieldKey;
		const fieldName = [setKey, fieldKey].join('_');

		const blockElem = e.target.parentElement.parentElement;
		const index = Number(blockElem.dataset.index);
		const newIndex = e.target.dataset.newIndex;
		let newBlocks = this.state.blocks;
		let newBlockMedia = this.state.blockMedia;
		
		if(!newBlocks[newIndex]){return}

		let block = newBlocks.splice(index, 1)[0];
		newBlocks.splice(newIndex, 0, block);

		let mediaBlock = newBlockMedia.splice(index, 1)[0];
		newBlockMedia.splice(newIndex, 0, mediaBlock);
		
		this.setState({
			blocks: newBlocks,
			blockMedia: newBlockMedia
		});
		this.props.onChange(fieldName, newBlocks);

		let newMediaData = Object.assign({}, this.props.mediaData);
		newMediaData[setKey] = newBlockMedia;
		this.props.sendMediaData(newMediaData);
	}
 
	render() {
		const setKey = this.props.setKey;
		const fieldKey = this.props.fieldKey;
		const strings = this.props.field.strings;
		const name = [setKey, fieldKey].join('_');
		return(
			<div className='field'>

				<div className='blocks-widget'>
					{this.renderBlocks()}
				</div>

				<div className='buttons-group'>
					{/*<div className='buttons-label'>Add media from</div>*/}
					{this.renderButtons()}
				</div>

			</div>
		);
	}
}

export default Blocks;