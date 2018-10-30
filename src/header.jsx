import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
	<div className='container'>
		<header>
			<nav>
				<h1 className='site-title'>
					<Link to={SiteSettings.path}>Four Corners</Link>
				</h1>
			</nav>
		</header>
	</div>
);

export default Header;