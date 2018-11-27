import React from 'react';
import { render } from 'react-dom';
import { NamespacesConsumer } from 'react-i18next';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Header from './header';
import Footer from './footer';
import Creator from './creator';
import NotFound from './not-found';

import publicScripts from './coffee/public.coffee';
import publicStyles from './sass/public.scss';

const routes = (
	<NamespacesConsumer>
		{
		 (t) => {
				return(
					<Router>
						<React.Fragment>
							<Header></Header>
							<Switch>
								<Route exact path={SiteSettings.path} component={Creator} />
								<Route exact path={SiteSettings.path+'creator'} component={Creator} />
								<Route path="*" component={NotFound} />
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