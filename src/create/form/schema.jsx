// https://mozilla-services.github.io/react-jsonschema-form/
// https://github.com/mozilla-services/react-jsonschema-form/

// https://creativecommons.org/choose/

const Schema = {
	photo: {
		fields: {
			src: {
				type: 'text',
				format: 'url'
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
				type: 'text',
				format: 'url'
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
						format: 'url'
					},
					caption: {
						type: 'textarea',
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
						format: 'url'
					},
					caption: {
						type: 'textarea',
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
						format: 'url'
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
			caption: {
				type: 'checkbox',
			},
			credit: {
				type: 'checkbox',
			},
			logo: {
				type: 'checkbox',
			}
		}
	}
};

export default Schema;