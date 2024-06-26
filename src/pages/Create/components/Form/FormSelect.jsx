import React from 'react';
import FormLabel from './FormLabel';

import { asNumber } from 'react-jsonschema-form/lib/utils';

class FormSelect extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            custom: false,
            customText: '',
            value: '',
        };
        this.selectRef = React.createRef();
    }

    componentDidUpdate() {
        const fieldValue = this.props.fieldValue;
        if (fieldValue && fieldValue != this.state.value) {
            this.setState({
                value: fieldValue
            });
            if (!fieldValue.label) {
                this.setState({
                    custom: fieldValue,
                    customText: fieldValue.desc
                });
            }
        }
    }

    onClick(e) {
        e.preventDefault();
        if (e.target.parentElement.classList.contains('toggle-desc')) {
            return;
        }
        const custom = e.currentTarget.classList.contains('custom');
        let newValue = e.currentTarget.dataset.value;
        try {
            newValue = JSON.parse(newValue);
        } catch (err) {
            console.warn(err);
        }

        if (e.target.nodeName !== 'TEXTAREA' && e.currentTarget.classList.contains('selected')) {
            newValue = {};
        }

        this.setState({
            value: newValue,
            custom: custom
        });
        const name = this.selectRef.current.name;
        this.props.onChange(name, newValue);
    }

    onChangeCustom(e) {
        const customText = e.currentTarget.value;
        const newValue = {
            desc: customText
        };
        this.setState({
            custom: true,
            customText: customText,
            value: newValue
        });
        const name = this.selectRef.current.name;
        this.props.onChange(name, newValue);
    }

    render() {
        const fieldKey = this.props.fieldKey;
        const strings = this.props.field.strings;
        const setKey = this.props.setKey;
        const name = [setKey, fieldKey].join('_');
        const options = this.props.field.options;
        const value = this.state.value;
        const customize = this.props.field.customize;
        return (
            <div className='field select'>
				{this.props.hideLabel?'':
				<FormLabel strings={strings} fieldKey={fieldKey} />}
				<select
					name={name}
					className='form-elem'
					// value={value}
					ref={this.selectRef}
					onChange={this.onChange}>
					{options ? options.map((option, i) => {
						const optStr = JSON.stringify(option);
						let label = option.label;
						let desc = option.desc;
						return(
							<option key={i} value={optStr}>{label+(desc ? ': '+desc : '')}</option>
						);
					}) : ''}
				</select>

				<div
					data-field={fieldKey}
					className='select-widget form-elem'
					data-value={typeof value === 'undefined' ? '' : value}>
					{options ? options.map((option, i) => {
						let label = option.label;
						let desc = option.desc;
						const canCustomize = customize && i == 0;
						if(canCustomize) {
							option.desc = this.state.customText;
						}
						const optStr = JSON.stringify(option);
						let optClassName = value.desc === option.desc ? 'option selected' : 'option';
						optClassName += canCustomize ? ' custom' : '';
						return (
							<div
								key={i}
								className={optClassName}
								data-value={optStr}
								onClick={this.onClick.bind(this)}>
								{canCustomize ?
									<React.Fragment>
										<label>{label}</label>
										{desc?<div className='option-desc desc'>{desc}</div>:''}
										<textarea
											name={name+'Custom'}
											className='form-elem'
											value={this.state.customText}
											onChange={this.onChangeCustom.bind(this)}/>
									</React.Fragment>
								: <FormLabel strings={option} fieldKey={fieldKey}/>}
							</div>
						);
					}) : ''}
				</div>

			</div>
        );
    }
}

export default FormSelect;