// https://mozilla-services.github.io/react-jsonschema-form/
// https://github.com/mozilla-services/react-jsonschema-form/

const uiSchema = {
	photo: {
		file: {
			'ui:widget': 'customUploadWidget',
			noValidate: false,
		}
	},
	authorship: {
		caption: {
			'ui:widget': 'textarea',
			'ui:options': {
				rows: 5
			}
		},
		copyright: {
			'ui:widget': 'customToggleWidget',
			'ui:placeholder': 'Creative Commons'
		},
		license: {
			'ui:widget': 'customToggleWidget',
			'ui:placeholder': 'name@email.com'
		},
		ethics: {
			'ui:widget': 'customSelectWidget'
		}
	},
	backstory: {
		story: {
			'ui:widget': 'textarea',
			'ui:options': {
				rows: 5,
				label: false
			}
		},
		media: {
			'ui:options': {
		    label: false
		  },
		}
	},
	context: {
		custom: {
			'ui:widget': 'myCustomWidget',
		},
		story: {
			'ui:widget': 'textarea',
			'ui:options': {
				rows: 5,
				label: false
			}
		},
		media: {
			'ui:options': {
		    label: false
		  },
		}
	}
};

export default uiSchema;