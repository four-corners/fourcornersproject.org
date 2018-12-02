// https://mozilla-services.github.io/react-jsonschema-form/
// https://github.com/mozilla-services/react-jsonschema-form/


// const MyCustomWidget = (props) => {
//   return (
//     <input type="text"
//       className="custom"
//       value={props.value}
//       required={props.required}
//       onChange={(event) => props.onChange(event.target.value)} />
//   );
// };

// const widgets = {
//   myCustomWidget: MyCustomWidget
// };

const uiSchema = {
	copyright: {
		caption: {
			'ui:widget': 'textarea',
			'ui:options': {
				rows: 5
			}
		}
	},
	backstory: {
		story: {
			'ui:widget': 'textarea',
			'ui:options': {
				rows: 5
			}
		}
	},
	context: {
		custom: {
			'ui:widget': 'myCustomWidget',
		},
		story: {
			'ui:widget': 'textarea',
			'ui:options': {
				rows: 5
			}
		}
	}
};

export default uiSchema;