<?php $curr_lang = pll_current_language(); ?>
<!DOCTYPE html>
<html <?php language_attributes(); ?>>
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

			<?php if( is_user_logged_in() ) { ?>
				<div id="lang-switch-header">
					<div class='max-width'>
						<ul>
							<?php
							$langs = pll_languages_list( array(
								'fields' => 'locale'
							) );
							$lang_names = pll_languages_list( array(
								'fields' => 'name'
							) );
							foreach( $langs as $index => $lang ) { ?>
								<li>
									<?php $trans_post_id = pll_get_post( $post->ID, $lang ); ?>
									<a href="<?= get_permalink( $trans_post_id ); ?>">
										<?= $lang_names[$index] ?>
									</a>
								</li>
							<?php } ?>
						</ul>
					</div>
				</div>
			<?php } ?>

			<div class='max-width'>
				<div class='row'>			
					<div class='col col-12 col-lg-auto left'>
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

					<div class='col col-12 col-lg-auto right'>

						<div class='col-content'>
							<?php if( $menu_items = wp_get_nav_menu_items( 'main' ) ): ?>
								<nav id='main-nav'>
									<?php foreach( $menu_items as $i => $menu_item ) {
										$menu_item_id = $menu_item->object_id;
										$trans_page_id = pll_get_post( $menu_item_id, $curr_lang );
										if( $trans_page_id ) {
											$menu_item_id = $trans_page_id;
										}
										$menu_item_page = get_post( $menu_item_id ); ?>
										<a href="<?= get_permalink( $menu_item_id ) ?>"><?= $menu_item_page->post_title ?></a>
									<?php } ?>
								</nav>
							<?php endif; ?>
						</div>
					</div>

				</div>
			</div>
		</header>