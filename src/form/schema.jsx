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
			caption: {
				type: 'textarea',
				rows: 2
			},
			credit: {
				type: 'text'
			},
			license: {
				type: 'toggle',
				fields: {
					copyright: {
						type: 'group',
						fields: {
							'year': {
								type: 'text',
								style: 'one-third',
								default: true
							},
							'holder': {
								type: 'text',
								style: 'two-thirds'
							}
						}
					},
					commons: {
						type: 'select',
					}
				}
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
					'info': {
						type: 'text'
					},
					'rights': {
						type: 'text'
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
			media: {
				type: 'blocks',
				fields: {
					url: {
						type: 'text',
						format: 'uri',
					},
					caption: {
						type: 'text',
					},
					credit: {
						type: 'text',
					}
				}
			}
		}
	},
	imagery: {
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
					},
					credit: {
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
			cutline: {
				type: 'checkbox',
				style: 'half'
			},
			dark: {
				type: 'checkbox',
				style: 'half'
			}
		}
	}
};

export default Schema;