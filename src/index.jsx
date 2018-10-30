import React from 'react';
import ReactDOM from 'react-dom';
import { render } from 'react-dom';
import { NamespacesConsumer } from 'react-i18next';
import { I18nextProvider } from 'react-i18next';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import i18n from './i18n';
import App from './App';
import Header from './header';
import Footer from './footer';
import Creators from './creators';
import Creator from './creator';
import CreatorList from './creator-list';
import NotFound from './not-found';

require('./sass/public.scss');

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
								<Route exact path={SiteSettings.path+'creators/:slug'} component={Creator} />
								<Route path="*" component={NotFound} />
							</Switch>
							<Footer></Footer>
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