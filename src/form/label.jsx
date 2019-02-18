import React from 'react';

class Label extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			opened: false
		};
	}

	onClick(e) {
		this.setState({
			opened: !this.state.opened
		});
	}

	renderToggle() {
		return (
			this.props.strings.desc ?
				<div
					className='toggle-desc'
					onClick={this.onClick.bind(this)}>
				?</div>
			: null
		);
	}

	render() {
		const strings = this.props.strings;
		const className = 'field-desc desc'+(this.state.opened?' opened':'');
		return (
			<div className='field-label'>
				{strings && strings.label ?
					<label name={this.props.fieldKey} htmlFor={this.props.fieldKey}>
						{strings.label}
						{this.renderToggle()}
					</label>
				: null}
				{strings && strings.desc ?
					<div className={className}>
						{strings.desc}
					</div>
				: null}
			</div>
		);
	}
}

export default Label;