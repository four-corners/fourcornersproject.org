import React from 'react';

function ArrayField(props) {
  return (
    <div className={props.className}>
      {props.items &&
        props.items.map(element => (
          <div className='card' key={element.index}>
            {element.children}
            {element.hasMoveDown && (
              <button
                onClick={element.onReorderClick(
                  element.index,
                  element.index + 1
                )}>
                Down
              </button>
            )}
            {element.hasMoveUp && (
              <button
                onClick={element.onReorderClick(
                  element.index,
                  element.index - 1
                )}>
                Up
              </button>
            )}
            <button onClick={element.onDropIndexClick(element.index)}>
              Delete
            </button>
          </div>
        ))}

      {props.canAdd && (
        <div className='row'>
          <div className='col-xs-3 col-xs-offset-9 array-item-add text-right'>
            <button onClick={props.onAddClick} type='button'>
              {props.schema.add}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ArrayField;