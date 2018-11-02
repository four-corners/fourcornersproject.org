// https://mozilla-services.github.io/react-jsonschema-form/
// https://github.com/mozilla-services/react-jsonschema-form/

const Schema = {
  title: 'Four Corners Creator',
  type: 'object',
  properties: {
		backstory: {
			title: '',
			type: 'object',
			required: [],
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
			required: [],
			properties: {
				copyright: {
					type: 'string',
					enum: [],
				},
				credit: {
					type: 'string',
				},
				year: {
					type: 'string',
				},
				ethics: {
					type: 'string',
					enum: [],
				},
				caption: {
					type: 'string',
				}
			}
		},
		media: {
			title: '',
			type: 'object',
			required: [],
			properties: {
				media: {
					type: 'array',
					items: {
						type: 'object',
						properties: {
							type: {
								type: 'string',
								enum: [
									'image',
									'youtube',
									'vimeo',
								],
								enumNames: [
									'Image',
									'YouTube',
									'Vimeo',
								],
							},
							url: {
								type: 'string',
								format: 'uri',
							},
							credit: {
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
			required: [],
			properties: {
				links: {
					type: 'array',
					minItems: 0,
					items: {
						type: 'object',
						properties: {
							title: {
								type: 'string'
							},
							url: {
								type: 'string',
								format: 'uri',
							}
						}
					}
				},
			}
		}
	}
}

export default Schema;