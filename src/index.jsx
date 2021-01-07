import React from 'react';
import { render } from 'react-dom';
import { Translation } from 'react-i18next';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Home from './home/home';
import About from './about/about';
import How from './how/how';
import Gallery from './gallery/gallery';
import Contact from './contact/contact';
import Creator from './create/create';
import Page from './page';
import NotFound from './not-found';

// import publicScripts from '../assets/coffee/public.coffee';
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
	<Translation>
		{
			(t) => {
				return(
					<Router>
						<React.Fragment>
							<Switch>
								<Route path='*' component={App} />
							</Switch>
						</React.Fragment>
					</Router>
				)
			}
		}
	</Translation>
);
render(
	(routes), document.getElementById('page')
);