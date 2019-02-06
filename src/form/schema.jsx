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
			}
		}
	},
	context: {
		fields: {
			text: {
				type: 'textarea'
			},
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
				},
				// options: [
				// 	{
				// 		slug: 'image',
				// 		label: 'Image',
				// 		placeholder: 'https://example.com/photo.jpg'
				// 	},
				// 	{
				// 		slug: 'youtube',
				// 		label: 'YouTube',
				// 		placeholder: 'https://youtube.com/watch?v=abc123'
				// 	},
				// 	{
				// 		slug: 'vimeo',
				// 		label: 'Vimeo',
				// 		placeholder: 'https://vimeo.com/123456'
				// 	},
				// 	{
				// 		slug: 'soundcloud',
				// 		label: 'SoundCloud',
				// 		placeholder: 'https://soundcloud.com/example/audio'
				// 	}
				// ],
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
				// multiple: false
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