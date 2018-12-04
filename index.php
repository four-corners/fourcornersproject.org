<?php
/**
 * The main template file
 *
 * @package WordPress
 * @subpackage Four Corners
 * @since Four Corners 1.0
 */
 ?>
 <!DOCTYPE html>

 <html <?php language_attributes(); ?> class="no-js">
	<head>
		<meta charset="<?php bloginfo( 'charset' ); ?>">
		<meta name="viewport" content="width=device-width">
		<link rel="profile" href="http://gmpg.org/xfn/11">
		<link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>">
		<title>Four Corners</title>
		<?php wp_head(); ?>
	</head>
	<body <?php body_class(); ?>>
		<div id="page">
			<div id="content">
			</div>
			<?php wp_footer(); ?>
		</div>			
	</body>
</html>