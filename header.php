 <!DOCTYPE html>
 <html <?php language_attributes(); ?> class="no-js">

	<head>
		<meta charset="<?php bloginfo( 'charset' ); ?>">
		<meta name="viewport" content="width=device-width">
		<link rel="profile" href="http://gmpg.org/xfn/11">
		<link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>">
		<title><?php bloginfo( 'title' ) ?>&nbsp;&mdash;&nbsp;<?php bloginfo( 'description' ) ?></title>
		<link rel="apple-touch-icon" sizes="180x180" href="<?php echo get_stylesheet_directory_uri() ?>/assets/icons/apple-touch-icon.png">
		<link rel="icon" type="image/png" sizes="32x32" href="<?php echo get_stylesheet_directory_uri() ?>/assets/icons/favicon-32x32.png">
		<link rel="icon" type="image/png" sizes="16x16" href="<?php echo get_stylesheet_directory_uri() ?>/assets/icons/favicon-16x16.png">
		<link rel="manifest" href="<?php echo get_stylesheet_directory_uri() ?>/assets/icons/site.webmanifest">
		<link rel="mask-icon" href="<?php echo get_stylesheet_directory_uri() ?>/assets/icons/safari-pinned-tab.svg" color="#7ebcff">
		<meta name="msapplication-TileColor" content="#7ebcff">
		<meta name="theme-color" content="#7ebcff">
		<?php wp_head(); ?>
	</head>

	<body <?php body_class(); ?>>

		<?php get_alert(); ?>
		
		<header class='header'>
			<div class='max-width'>
				<div class='row'>			
					<div class='col col-sm-12 col-md-auto left'>
						<div class='col-content'>
							<div id='site-title'>
								<!-- <h3> -->
									<a href="<?php echo bloginfo( 'url' ) ?>">
										<?#php echo bloginfo( 'name' ); ?>
										<?php
										$logo_path = get_stylesheet_directory_uri() . '/assets/images/logo.svg';
										$svg = file_get_contents( $logo_path );
										// $svg = str_replace("{{class-name}}", $array[$index], $svg);
										echo $svg;
										?>
									</a>
								<!-- </h3> -->
							</div>
						</div>
					</div>

					<div class='col col-sm-12 col-md-auto right'>
						<div class='col-content'>
							<?php if( $menu_items = wp_get_nav_menu_items( 'main' ) ): ?>
								<nav id='main-nav'>
									<?php foreach( $menu_items as $i => $menu_item ) {
										echo '<a href="'.$menu_item->url.'">'.$menu_item->title.'</a>';
									} ?>
								</nav>
							<?php endif; ?>
						</div>
					</div>

				</div>
			</div>
		</header>