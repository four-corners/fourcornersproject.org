import React from 'react';
import { render } from 'react-dom';
import { NamespacesConsumer } from 'react-i18next';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Home from './home/home';
import About from './about/about';
import How from './how/how';
import Gallery from './gallery/gallery';
import Contact from './contact/contact';
import Creator from './create/create';
import Page from './page';
import NotFound from './not-found';

import publicScripts from '../assets/coffee/public.coffee';
import publicStyles from '../assets/sass/public.scss';


let App = Page;

switch(siteSettings.template) {
	case 'index':
		App = Home;
		break;
	case 'creator':
		App = Creator;
		break;
	case 'about':
		App = About;
		break;
	case 'how':
		App = How;
		break;
	case 'gallery':
		App = Gallery;
		break;
	case 'contact':
		App = Contact;
		break;
}

const routes = (
	<NamespacesConsumer>
		{
			(t) => {
				return(
					<Router>
						<React.Fragment>
							<Switch>
								{
								// <Route exact
								// 	path={siteSettings.path}
								// 	render={(props) =>
								// 	<Home />
								// } />
								// <Route exact
								// 	path={siteSettings.path+'about'}
								// 	render={(props) =>
								// 		<About />
								// 	}
								// />
								// <Route
								// 	path={siteSettings.path+'how'}
								// 	render={(props) =>
								// 		<How />
								// 	}
								// />
								// <Route
								// 	path={siteSettings.path+'gallery'}
								// 	render={(props) =>
								// 		<Gallery />
								// 	}
								// />
								// <Route
								// 	path={siteSettings.path+'contact'}
								// 	render={(props) =>
								// 		<Contact />
								// 	}
								// />
								// <Route
								// 	path={siteSettings.path+'create'}
								// 	render={(props) =>
								// 		<Creator />
								// 	}
								// />
								}
								<Route path='*' component={App} />
							</Switch>
						</React.Fragment>
					</Router>
				)
			}
		}
	</NamespacesConsumer>
);
render(
	(routes), document.getElementById('page')
);