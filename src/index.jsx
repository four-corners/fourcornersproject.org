import React from "react";
import { render } from "react-dom";
import { Translation } from "react-i18next";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Home from "./pages/Home";
import About from "./pages/About";
import How from "./pages/How";
import Gallery from "./pages/Gallery";
import Contact from "./pages/Contact";
import Creator from "./pages/Create";
import NotFound from "./pages/NotFound";
import Page from "./pages/Page";

// import publicScripts from "../assets/coffee/public.coffee";
import "./sass/style.scss";


let Component = Page;

switch(siteSettings.template) {
	case "index":
		Component = Home;
		break;
	case "creator":
		Component = Creator;
		break;
	case "about":
		Component = About;
		break;
	case "how":
		Component = How;
		break;
	case "gallery":
		Component = Gallery;
		break;
	case "contact":
		Component = Contact;
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
								<Route path="*" component={Component} />
							</Switch>
						</React.Fragment>
					</Router>
				)
			}
		}
	</Translation>
);
render(
	(routes), document.getElementById("page")
);