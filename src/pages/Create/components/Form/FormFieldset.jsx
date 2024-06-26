import FormText from './FormText'
import FormTextarea from './FormTextarea'
import FormSelect from './FormSelect'
import FormBlocks from './FormBlocks'
import FormGroup from './FormGroup'
import FormCheckbox from './FormCheckbox'
import FormToggle from './FormToggle'

import React from 'react'
// import PropTypes from 'prop-types'

// import { asNumber } from 'react-jsonschema-form/lib/utils'

class FormFieldset extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			expand: false
		}
	}

	onToggle(e) {
		const setKey = this.props.setKey
		const newActiveSetKey = setKey==this.props.activeFieldset?null:setKey
		if(newActiveSetKey) {
			this.props.sendActiveCorner(newActiveSetKey)
		}
		this.props.sendActiveFieldset(newActiveSetKey)
	}

	renderFields() {
		const formData = this.props.formData
		const fields = this.props.data.fields
		const fieldKeys = Object.keys(fields)
		const fieldElems = []

		for(let fieldKey of fieldKeys) {
			const field = fields[fieldKey]
			const setKey = this.props.setKey
			const index = fieldElems.length
			let fieldValue = formData[setKey] ? formData[setKey][fieldKey] : null
			switch(field.type) {
				case 'text':
					fieldElems.push(
						<FormText
							key={index}
							setKey={setKey}
							fieldKey={fieldKey}
							field={field}
							// fieldValue={fieldValue}
							onChange={this.props.onChange} />
					)
					break
				case 'textarea':
					fieldElems.push(
						<FormTextarea
							key={index}
							setKey={setKey}
							fieldKey={fieldKey}
							field={field}
							// fieldValue={fieldValue}
							onChange={this.props.onChange} />
					)
					break
				case 'checkbox':
					fieldElems.push(
						<FormCheckbox
							key={index}
							setKey={setKey}
							fieldKey={fieldKey}
							field={field}
							// fieldValue={fieldValue}
							onChange={this.props.onChange} />
					)
					break
				case 'select':
					fieldElems.push(
						<FormSelect
							key={index}
							setKey={setKey}
							fieldKey={fieldKey}
							field={field}
							fieldValue={fieldValue}
							onChange={this.props.onChange} />
					)
					break
				case 'blocks':
					fieldElems.push(
						<FormBlocks
							key={index}
							setKey={setKey}
							fieldKey={fieldKey}
							field={field}
							fieldValue={fieldValue}
							onChange={this.props.onChange}
							sendActiveCorner={this.props.sendActiveCorner}
							sendMediaData={this.props.sendMediaData} />
					)
					break
				case 'group':
					fieldElems.push(
						<FormGroup
							key={index}
							setKey={setKey}
							fieldKey={fieldKey}
							field={field}
							// fieldValue={fieldValue}
							onChange={this.props.onChange}
							sendMediaData={this.props.sendMediaData} />
					)
					break
				case 'toggle':
					fieldElems.push(
						<FormToggle
							key={index}
							setKey={setKey}
							fieldKey={fieldKey}
							field={field}
							fieldValue={fieldValue}
							onChange={this.props.onChange}
							sendMediaData={this.props.sendMediaData} />
					)
					break
				default:
					break
			}
		}
		return fieldElems
	}

	render() {
		const data = this.props.data
		const setKey = this.props.setKey
		const strings = data.strings
		const expand = setKey === this.props.activeFieldset
		return (
			<fieldset id={setKey} className={'toggler '+(expand?'expand':'collapse')}>
				<legend className='toggle-label corner-label' onClick={this.onToggle.bind(this)}>
					<div className="corner-icon"></div>
					<div className="toggle-text">{strings.title}</div>
					<div className="toggle-icon"></div>
				</legend>
				<div className='fieldset-inner'>
					{strings.desc ? <div className='fieldset-desc desc'>{strings.desc}</div> : '' }
					{this.renderFields()}
				</div>
			</fieldset>
		)
	}
}

export default FormFieldset