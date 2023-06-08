import React from 'react';
import PropTypes from 'prop-types';
import Label from './_label';
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
		const self = this,
					setKey = this.props.setKey,
					fieldKey = this.props.fieldKey,
					fieldValue = this.props.fieldValue;
		if(fieldValue && fieldValue != this.state.blocks) {
			fieldValue.map((block, blockIndex) => {
				fieldValue[blockIndex].index = blockIndex;
				if(fieldKey === 'media') {
					const mediaBlock = self.state.blockMedia[blockIndex];
					if(!mediaBlock) {
						this.getMediaData(block, setKey, blockIndex);
					}
					
				}
			});
			this.setState({
				blocks: fieldValue,
				superIndex: fieldValue.length
			});
		}
	}

	onChange(e) {
		const input = e.target,
					name = input.name,
					value = input.value,
					nameArr = name.split('_'),
					setKey = nameArr[0],
					fieldKey = nameArr[1],
					subFieldKey = nameArr[2],
					fieldName = [setKey, fieldKey].join('_'),
					blockIndex = Number(input.parentElement.parentElement.dataset.index);
		let blocks = this.state.blocks,
				block = blocks[blockIndex];
		block[subFieldKey] = value;
		if(fieldKey === 'media' && subFieldKey === 'url') {
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
		const source = obj.source;
		let blocks = this.state.blocks,
				block = blocks[index],
				blockMedia = this.state.blockMedia,
				mediaData = Object.assign({}, blockMedia, this.props.blockMedia),
				url = obj.url, req;
		if(!url) return;
		if(source == 'image') {
			blockMedia[index] = {
				url: url ? url : null,
				source: 'image'
			};
			this.setState({
				blockMedia: blockMedia
			});
			mediaData[setKey] = blockMedia;
			this.props.sendMediaData(mediaData);
		} else {
			url = encodeURI(url);
			switch(source) {
				case 'youtube':
					req = 'https://noembed.com/embed?url='+url;
					break;
				case 'vimeo':
					req = 'https://vimeo.com/api/oembed.json?url='+url;
					break;
				case 'soundcloud':
					req = 'https://soundcloud.com/oembed?format=json&url='+url;
					break;
				case 'instagram':
					req = 'https://api.instagram.com/oembed/?url='+url;
					break;
				default:
					req = null
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
				this.setState({
					blockMedia: blockMedia
				});
				mediaData[setKey] = blockMedia;
				this.props.sendMediaData(mediaData);
				if (!res.ok) {
					blockMedia[index] = {
						source: source,
						loaded: false
					};
					blocks[index] = block;
					this.setState({
						blocks: blocks,
						blockMedia: blockMedia,
					});
					throw new Error(res.statusText);
				}
				return res.json();
			})
			.then(res => {
				let mediaObj = {
					source: source,
					loaded: true
				};
				switch(source) {
					case 'instagram':
						mediaObj.url = res.thumbnail_url;
						mediaObj.width = res.thumbnail_width;
						mediaObj.height = res.thumbnail_height;
						if(!block.caption) {
							block.caption = res.title;
						}
						if(!block.credit) {
							block.credit = "@"+res.author_name+" on Instagram";
						}
						blocks[index] = block;
						this.setState({
							blocks: blocks
						});
						break;
					default:
						mediaObj.html = res.html;
						mediaObj.width = res.width;
						mediaObj.height = res.height;
						break;
				}
				blockMedia[index] = mediaObj;
				this.setState({
					blockMedia: blockMedia
				});
				mediaData[setKey] = blockMedia;
				this.props.sendMediaData(mediaData);
			})
			.catch(function(err) {
				console.warn(err);
			});
		}
	}

	renderBlocks() {
		let blocks = [];
		this.state.blocks.forEach((block, i) => {
			if(!block || block.deleted){return}
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
				this.renderField(subFieldKey, subFieldData, subFieldValue, typeStrings, blockIndex, subFieldIndex)
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
					{subFieldData.type == 'text' ?
						<input
							name={name}
							className='form-elem'
							type='text'
							value={subFieldValue || ''}
							placeholder={strings.placeholder}
							onChange={this.onChange.bind(this)}/>
					: null}
					{subFieldData.type == 'textarea' ?
						<textarea
							name={name}
							className='form-elem'
							rows='2'
							value={subFieldValue || ''}
							placeholder={strings.placeholder}
							onChange={this.onChange.bind(this)}>
						</textarea>
					: null}
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
		var self = this;
		return (
			<button key={i}
				className='button add-block'
				data-slug={typeKey}
				onClick={self.addBlock.bind(this)}>
				{type.label}
			</button>
		);
	}

	addBlock(e) {
		e.preventDefault();
		const fieldName = [this.props.setKey, this.props.fieldKey].join('_');

		const newBlocks = this.state.blocks.concat([{
			source: e.target.dataset.slug,
			index: this.state.superIndex
		}]);

		const newBlockMedia = this.state.blockMedia.concat([{
			source: e.target.dataset.slug,
			index: this.state.superIndex
		}]);

		this.setState({
			blocks: newBlocks,
			blockMedia: newBlockMedia,
			superIndex: this.state.superIndex
		});

		this.props.onChange(fieldName, newBlocks);
		this.props.sendActiveCorner(this.props.setKey);
	}

	deleteBlock(e) {
		e.preventDefault();
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
		e.preventDefault();
		const setKey = this.props.setKey,
					fieldKey = this.props.fieldKey,
					fieldName = [setKey, fieldKey].join('_'),
					blockElem = e.target.parentElement.parentElement,
					index = Number(blockElem.dataset.index),
					newIndex = e.target.dataset.newIndex;
		let newBlocks = this.state.blocks,
				newBlockMedia = this.state.blockMedia;

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
					{this.renderButtons()}
				</div>

			</div>
		);
	}
}

export default Blocks;