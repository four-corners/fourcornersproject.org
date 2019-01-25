// https://mozilla-services.github.io/react-jsonschema-form/
// https://github.com/mozilla-services/react-jsonschema-form/

// https://creativecommons.org/choose/

const Schema = {
	photo: {
		fields: {
			file: {
				type: 'file',
			},
		}
	},
	authorship: {
		fields: {
			credit: {
				type: 'text',
			},
			caption: {
				type: 'text',
			},
			ethics: {
				type: 'select',
			},
			copyright: {
				type: 'toggle',
			},
			license: {
				type: 'toggle',
			},
		}
	},
	backstory: {
		fields: {
			text: {
				type: 'textarea'
			},
			media: {
				type: 'blocks',
				fields: {
					source: {
						type: 'select',
						options: ['image','youtube','vimeo','soundcloud']
					},
					url: {
						type: 'text',
						format: 'uri',
					},
					caption: {
						type: 'text',
					}
				}
			}
		}
	},
	context: {
		fields: {
			text: {
				type: 'textarea'
			}
		}
	},
	links: {
		fields: {
			links: {
				type: 'blocks',
				fields: {
					title: {
						type: 'text'
					},
					url: {
						type: 'text',
						format: 'uri',
					},
					caption: {
						type: 'text',
					}
				}
			}
		}
	},
	opts: {
		fields: {
			dark: {
				type: 'checkbox',
				// multiple: false
			},
			// include: {
			// 	type: 'checkbox',
			// 	multiple: true,
			// 	options: ['js','css']
			// }
		}
	}
};

export default Schema;