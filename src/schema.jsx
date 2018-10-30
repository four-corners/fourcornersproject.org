// https://mozilla-services.github.io/react-jsonschema-form/

const Schema = {
	backstory: {
		title: '',
		type: 'object',
		required: ['title'],
		properties: {
			story: {
				type: 'string',
			},
			author: {
				type: 'string',
			},
			publication: {
				type: 'string',
			},
			url: {
				type: 'string',
				format: 'uri',
			},
			date: {
				type: 'string',
				format: 'date',
			}
		}
	},
	copyright: {
		title: '',
		type: 'object',
		required: ['title'],
		properties: {
			copyright: {
				type: 'string',
				enum: []
			},
			credit: {
				type: 'string',
			},
			year: {
				type: 'string',
			},
			ethics: {
				type: 'string',
				enum: []
			},
			caption: {
				type: 'string',
			}
		}
	},
	media: {
		title: '',
		type: 'object',
		required: ['title'],
		properties: {
			media: {
				type: 'array',
				items: {
					type: 'object',
					properties: {
						label: {
							type: 'string'
						},
						desc: {
							type: 'string'
						}
					}
				}
			},
		}
	},
	links: {
		title: '',
		type: 'object',
		required: ['title'],
		properties: {
			links: {
				type: 'array',
				items: {
					type: 'object',
					properties: {
						label: {
							type: 'string'
						},
						desc: {
							type: 'string'
						}
					}
				}
			},
		}
	}
}

export default Schema;