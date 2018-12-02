import React from 'react';

const UrlInput = (props) => {
	return (
		<input
			type='url'
			className=''
			value={props.value}
			required={props.required}
			onChange={(event) => props.onChangeUrl(event.target.value)} />
	);
};

function ArrayFieldTemplate(props) {
	return (
		<div className={props.className}>
			{props.items &&
				props.items.map(element => (
					<div key={element.index}>
						{console.log(element.children)}
						<div>{element.children}</div>
						{element.hasMoveDown && (
							<button
								className='btn'
								onClick={element.onReorderClick(
									element.index,
									element.index + 1
								)}>
								Move Down
							</button>
						)}
						{element.hasMoveUp && (
							<button
								className='btn'
								onClick={element.onReorderClick(
									element.index,
									element.index - 1
								)}>
								Move Up
							</button>
						)}
						<button className='btn' onClick={element.onDropIndexClick(element.index)}>
							Delete
						</button>
					</div>
				))}

			{props.canAdd && (
				<div className="row">
					<p className="col-xs-3 col-xs-offset-9 array-item-add text-right">
						<button className='btn' onClick={props.onAddClick} type="button">
							Add New
						</button>
					</p>
				</div>
			)}
		</div>
	);
}

const Widgets = {
	urlInput: UrlInput,
	ArrayFieldTemplate: ArrayFieldTemplate
};

export default Widgets;