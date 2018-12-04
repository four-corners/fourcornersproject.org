// https://mozilla-services.github.io/react-jsonschema-form/
// https://github.com/mozilla-services/react-jsonschema-form/

const uiSchema = {
	copyright: {
		caption: {
			'ui:widget': 'textarea',
			'ui:options': {
				rows: 5
			}
		},
		copyright: {
			'ui:widget': 'customSelectWidget'
		},
		ethics: {
			'ui:widget': 'customSelectWidget'
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