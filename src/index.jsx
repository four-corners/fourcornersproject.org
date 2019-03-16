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

const routes = (
	<NamespacesConsumer>
		{
			(t) => {
				return(
					<Router>
						<React.Fragment>
							<Switch>
								<Route exact
									path={SiteSettings.path}
									render={(props) =>
									<Home />
								} />
								<Route exact
									path={SiteSettings.path+'about'}
									render={(props) =>
										<About />
									}
								/>
								<Route
									path={SiteSettings.path+'how'}
									render={(props) =>
										<How />
									}
								/>
								<Route
									path={SiteSettings.path+'gallery'}
									render={(props) =>
										<Gallery />
									}
								/>
								<Route
									path={SiteSettings.path+'contact'}
									render={(props) =>
										<Contact />
									}
								/>
								<Route
									path={SiteSettings.path+'create'}
									render={(props) =>
										<Creator />
									}
								/>
								<Route path='*' component={Page} />
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