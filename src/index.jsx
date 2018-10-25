import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import App from './App';
import Header from './header';
import Footer from './footer';
import Creators from './creators';
import Creator from './creator';
import CreatorList from './creator-list';

require('./sass/public.scss');

const routes = (
	<Router>
		<Switch>
			<Route exact path={SiteSettings.path+'creators'} component={Creators} />
			<Route exact path={SiteSettings.path+'creator/:slug'} component={Creator} />
		</Switch>
	</Router>
);
render(
	(routes), document.getElementById('page')
);