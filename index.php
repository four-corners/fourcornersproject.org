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
		</div>			
	</body>
	<?php wp_footer(); ?>
	<!-- Fathom - simple website analytics - https://github.com/usefathom/fathom -->
		<script>
		(function(f, a, t, h, o, m){
			a[h]=a[h]||function(){
				(a[h].q=a[h].q||[]).push(arguments)
			};
			o=f.createElement('script'),
			m=f.getElementsByTagName('script')[0];
			o.async=1; o.src=t; o.id='fathom-script';
			m.parentNode.insertBefore(o,m)
		})(document, window, '//162.243.9.116/tracker.js', 'fathom');
		fathom('set', 'siteId', 'ECXIG');
		fathom('trackPageview');
		</script>
	<!-- / Fathom -->
</html>