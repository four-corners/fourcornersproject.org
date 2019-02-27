import React from 'react';
import { render } from 'react-dom';
import { NamespacesConsumer } from 'react-i18next';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Header from './header';
import Footer from './footer';

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

const routes = (
	<NamespacesConsumer>
		{
			(t) => {
				return(
					<Router>
						<React.Fragment>
							<Header/>
							<Switch>
								<Route exact path={SiteSettings.path} component={Home} />
								<Route path={SiteSettings.path+'about'} component={About} />
								<Route path={SiteSettings.path+'how'} component={How} />
								{/*<Route path={SiteSettings.path+'gallery'} component={Gallery} />*/}
								{/*<Route path={SiteSettings.path+'contact'} component={Contact} />*/}
								<Route path={SiteSettings.path+'create'} component={Creator} />
								<Route path='*' component={Page} />
							</Switch>
							<Footer/>
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