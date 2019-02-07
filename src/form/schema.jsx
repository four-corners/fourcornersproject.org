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
				type: 'text'
			},
			caption: {
				type: 'textarea',
				rows: 2
			},
			ethics: {
				type: 'select',
				customize: true
			},
			bio: {
				type: 'textarea'
			},
			website: {
				type: 'text'
			},
			website: {
				type: 'text'
			},
			contact: {
				type: 'group',
				fields: {
					info: {
						type: 'text',
					},
					rights: {
						type: 'text',
					}
				}
			}
		}
	},
	backstory: {
		fields: {
			text: {
				type: 'textarea'
			},
			audio: {
				type: 'blocks',
				fields: {
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
			media: {
				type: 'blocks',
				fields: {
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
					}
				}
			}
		}
	},
	opts: {
		fields: {
			dark: {
				type: 'checkbox',
			},
			// include: {
			// 	type: 'checkbox',
			// 	// multiple: true,
			// 	options: ['js','css']
			// }
		}
	}
};

export default Schema;