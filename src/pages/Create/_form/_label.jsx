import React from 'react';

class Label extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			opened: false
		};
	}

	onClick(e) {
		e.preventDefault();
		this.setState({
			opened: !this.state.opened
		});
	}

	onMouseEnter(e) {
		// console.log(e);
	}

	onMouseLeave(e) {
		// console.log(e);
	}

	renderToggle() {
		return (
			this.props.strings.desc ?
				<div className='toggle-desc'>
					<div
						onClick={this.onClick.bind(this)}
						onFocus={this.onClick.bind(this)}>
					</div>
				</div>
			: null
		);
	}

	render() {
		const strings = this.props.strings;
		const className = 'field-desc desc'+(this.state.opened?' opened':'');
		return (
			<div className='field-label' id={this.props.id}>
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