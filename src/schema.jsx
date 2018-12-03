// https://mozilla-services.github.io/react-jsonschema-form/
// https://github.com/mozilla-services/react-jsonschema-form/

const Schema = {
	title: '',
	type: 'object',
	properties: {
		copyright: {
			title: '',
			type: 'object',
			required: [],
			properties: {
				credit: {
					type: 'string',
				},
				caption: {
					type: 'string',
				},
				copyright: {
					type: 'string',
					enum: [],
				},
				ethics: {
					type: 'string',
					enum: [],
				}
			}
		},
		context: {
			title: '',
			type: 'object',
			required: [],
			properties: {
				story: {
					type: 'string'
				},
				media: {
					title: '',
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
									'soundcloud'
								],
								enumNames: [
									'Image',
									'YouTube',
									'Vimeo',
									'SoundCloud'
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
				}
			}
		},
		backstory: {
			title: '',
			type: 'object',
			required: [],
			properties: {
				story: {
					type: 'string'
				},
				media: {
					title: '',
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
									'soundcloud'
								],
								enumNames: [
									'Image',
									'YouTube',
									'Vimeo',
									'SoundCloud'
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
				}
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