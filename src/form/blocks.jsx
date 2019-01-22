import React from 'react';
import PropTypes from 'prop-types';

class Blocks extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			value: '',
			blocks: [{}]
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

		this.setState({
			blocks: blocks
		});

		this.props.onChange(fieldName, blocks);
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