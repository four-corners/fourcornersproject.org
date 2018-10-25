import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
	<div className="container">
		<header id="masthead" className="site-header" role="banner">
			<nav className="navbar navbar-expand-lg navbar-light">
				<h1 className="site-title"><Link to={SiteSettings.path}>Site</Link></h1>
				<div className="collapse navbar-collapse" id="navbarNavAltMarkup">
					<div className="navbar-nav">
						<Link className="nav-item nav-link active" to={SiteSettings.path}>Home</Link>
						<Link className="nav-item nav-link" to={SiteSettings.path + "posts/"} >Posts</Link>
						<Link className="nav-item nav-link" to={SiteSettings.path + "creators/"} >Creators</Link>
					</div>
				</div>
			</nav>
		</header>
	</div>
);

export default Header;