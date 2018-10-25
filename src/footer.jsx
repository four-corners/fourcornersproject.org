import React from 'react';

const Footer = () => (
	<footer id="colophon" className="container">
		<div className="card-footer text-center bg-transparent border-primary">
			Four Corners {(new Date().getFullYear())}
		</div>
	</footer>
);

export default Footer;