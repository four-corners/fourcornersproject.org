import React from 'react'
import FormText from './FormText'
import FormTextarea from './FormTextarea'
import FormSelect from './FormSelect'
import FormGroup from './FormGroup'
import FormLabel from './FormLabel'

class Toggle extends React.Component {

	constructor(props) {
		super(props)
		this.state = {
			value: '',
			values: {},
			checked: null,
			mediaData: []
		}
	}

	componentDidUpdate() {
		const fieldValue = this.props.fieldValue
		if(fieldValue != this.state.value) {
			this.setState({
				value: fieldValue,
				values: {fieldValue},
				checked: fieldValue ? fieldValue.type : null
			})
		}
	}

	onChange(id, subValue) {
		const formData = this.state.formData
		const idArr = id.split('_')
		let fieldsetSlug = idArr[0]
		let fieldKey = idArr[1]
		let subFieldKey = idArr[2]
		let thisFieldKey = idArr[3]
		let fieldName = [idArr[0],idArr[1]].join('_')
		let newValue = Object.assign({},this.state.value)
		if(!newValue.length) {
			newValue.type = subFieldKey
		}
		if(typeof subValue == 'object') {
			newValue = Object.assign(newValue, subValue)
		} else {
			newValue[thisFieldKey] = subValue
		}
		let newValues = Object.assign({},this.state.values)
		newValues[subFieldKey] = newValue
		this.setState({
			values: newValues,
			value: newValue,
			checked: subFieldKey
		})
		this.props.onChange(fieldName, newValue)
	}

	onToggle(e) {
		const prevChecked = this.state.checked
		const input = e.target
		const checked = input.checked
		let id = input.id
		let name = input.name
		let subFieldKey = id.split('_')[2]
		let newChecked, newValue
		if(prevChecked != subFieldKey && checked) {
			newChecked = subFieldKey
			newValue = this.state.values[subFieldKey]
		}
		this.setState({
			checked: newChecked,
			value: newValue
		})
		if(checked) {
			this.onChange(id, newValue)
		} else {
			id = id.substr(0,id.lastIndexOf('_'))
			this.props.onChange(id, newValue)
		}
	}

	renderCheckboxes() {
		const field = this.props.field
		if(!field){return}
		const subFields = field.fields
		const subFieldKeys = Object.keys(subFields)
		let subFieldElems = []
		subFieldKeys.map((subFieldKey, i) => {
			const subFieldData = subFields[subFieldKeys]
			const subField = this.renderCheckbox(subFieldKey, subFieldData, i)
			subFieldElems.push(subField)
		})
		return subFieldElems
	}

	renderCheckbox(subFieldKey, subFieldData, subFieldIndex) {
		const setKey = this.props.setKey
		const fieldKey = this.props.fieldKey
		const field = this.props.field
		const strings = field.fields[subFieldKey].strings
		const name = [setKey, fieldKey].join('_')
		const subFieldName = [setKey, fieldKey, 'type'].join('_')
		const subFieldID = [setKey, fieldKey, subFieldKey].join('_')
		const checked = this.state.checked
		return(
			<div className='field checkbox half' key={subFieldIndex}>
				<div className='checkbox-widget'>
					<input className='toggle'
						id={subFieldID}
						name={subFieldName}
						type='checkbox'
						checked={checked == subFieldKey}
						onChange={this.onToggle.bind(this)}
						/>
					<label className='checkbox' htmlFor={subFieldID}>
						<div className='label-inner'>
							{strings && strings.label ?
								<span>{strings.label}</span>
							: ''}
						</div>
					</label>
				</div>
				
			</div>
		)
	}

	renderFields() {
		const field = this.props.field
		if(!field) return
		const subFields = field.fields
		const subFieldKeys = Object.keys(subFields)
		let subFieldElems = []
		subFieldKeys.map((subFieldKey, i) => {
			const subFieldData = subFields[subFieldKey]
			const subField = this.renderField(subFieldKey, subFieldData, i)
			subFieldElems.push(subField)
		})
		return subFieldElems
	}

	renderField(subFieldKey, subFieldData, i) {
		const setKey = this.props.setKey
		const fieldKey = this.props.fieldKey
		const field = this.props.field
		const subField = field.fields[subFieldKey]
		const subStrings = subField.strings
		const name = [setKey, subFieldKey].join('_')
		const subFieldID = [fieldKey, subFieldKey].join('_')
		const checked = this.state.checked
		const show = checked == subFieldKey
		const className = 'field-toggle-field'+(show?' active':'')
		let fieldElem
		let fieldValue = this.props.fieldValue

		switch(subField.type) {
			case 'text':
				fieldElem = <FormText
						key={i}
						setKey={setKey}
						fieldKey={subFieldID}
						field={subField}
						fieldValue={fieldValue}
						hideLabel={true}
						onChange={this.onChange.bind(this)} />
				break
			case 'textarea':
				fieldElem = <FormTextarea
						key={i}
						setKey={setKey}
						fieldKey={subFieldID}
						field={subField}
						fieldValue={fieldValue}
						hideLabel={true}
						onChange={this.onChange.bind(this)} />
				break
			case 'select':
				fieldElem = <FormSelect
						key={i}
						setKey={setKey}
						fieldKey={subFieldID}
						field={subField}
						fieldValue={fieldValue}
						hideLabel={true}
						onChange={this.onChange.bind(this)} />
				break
			case 'group':
				fieldElem = <FormGroup
						key={i}
						setKey={setKey}
						fieldKey={subFieldID}
						field={subField}
						fieldValue={fieldValue}
						hideLabel={true}
						onChange={this.onChange.bind(this)}
						sendMediaData={this.props.sendMediaData} />
				break
			default:
				break
		}
		return (
			<div className={className} key={i}>
				{subStrings&&subStrings.desc?
				<div
					className='desc'
					dangerouslySetInnerHTML={ { __html: subStrings.desc } }>
				</div> : ''}

				{fieldElem}
			</div> 
		)
	}

	render() {
		const id = this.props.id
		const field = this.props.field
		const strings = field.strings
		const setKey = this.props.setKey
		const name = [setKey, id].join('_')
		return (
			<div className='field field-toggle'>
				<FormLabel strings={strings} fieldId={id} />
				<div className='field-toggle-checkboxes'>
					{this.renderCheckboxes()}
				</div>
				<div className='field-toggle-fields'>
					{this.renderFields()}
				</div>
			</div>
		)
	}
}

export default Toggle