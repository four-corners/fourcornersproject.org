<?php
function four_corners_scripts() {

	$ver = '1.2.0';
	$fc_ver = '1.1.3';
	
	$env = ( in_array( $_SERVER['REMOTE_ADDR'], array( '127.0.0.1', '::1' ) ) ? 'dev' : 'prod' );
	// wp_enqueue_script( 'jquery' );
	wp_enqueue_script( 'vendor_script', get_stylesheet_directory_uri() . '/dist/vendors'.($env=='prod'?'.min':'').'.js' , array(), $ver, true );
	wp_enqueue_script( 'react_script', get_stylesheet_directory_uri() . '/dist/app'.($env=='prod'?'.min':'').'.js' , array(), $ver, true );

	wp_enqueue_script( 'four_corners_script', get_stylesheet_directory_uri() . '/assets/js/four-corners.min.js', array(), $fc_ver, true );
	wp_enqueue_style( 'four_corners_style', get_stylesheet_directory_uri() . '/assets/css/four-corners.min.css' );

	// wp_enqueue_style( 'bootstrap_style', 'https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css' );
	wp_enqueue_style( 'app_style', get_stylesheet_directory_uri() . '/dist/app.css' );
	$url = trailingslashit( home_url() );
	$path = trailingslashit( parse_url( $url, PHP_URL_PATH ) );

	wp_scripts()->add_data( 'react_script', 'data', sprintf( 'var SiteSettings = %s;', wp_json_encode( 
			array(
				'title' => get_bloginfo( 'name', 'display' ),
				'path' => $path,
				'url' => array(
					'api' => esc_url_raw( get_rest_url( null, '/wp/v2/' ) ),
					'root' => esc_url_raw( $url ),
					'theme' => esc_url_raw( get_stylesheet_directory_uri() )
				)
			)
		)
	) );

}
add_action( 'wp_enqueue_scripts', 'four_corners_scripts' );

register_nav_menus( array(
	'main' => 'Main',
	'footer' => 'Footer',
) );

function register_creators() {

	register_post_type( 'creators',
		array(
			'labels' => array(
				'name' => __( 'Creators' ),
				'singular_name' => __( 'Creator' )
			),
			'menu_position' => 3,
			'menu_icon' => 'dashicons-grid-view',
			'public' => true,
			'has_archive' => true,
			'supports' => array('title', 'thumbnail', 'editor')
		)
	);

}
add_action( 'init', 'register_creators' );

function get_alert() {
	if( $alert = get_field( 'alert', 'option' ) ):
		echo '<div id="alert">';
			echo '<div class="alert-inner">';
				echo $alert;
			echo '</div>';
		echo '</div>';
	endif;
}

function get_local_page( $slug ) {
	$page = get_page_by_path( $slug );
	$page_id = $page->ID;
	$local_id = pll_get_post( $page_id, pll_current_language() );
	$local_page = get_page( $local_id );
	return $local_page;
}

function get_local_link( $slug ) {
	$local_page = get_local_page( $slug );
	$local_page_id = $local_page->ID;
	$local_link = get_permalink( $local_page_id );
	return $local_link;
}

function get_translations_json( $req ) {

	$lang = $req['lang'];
	$obj = (object) array(
		'test' => 'Four Corners'
	);
	return $obj;
}

function get_langs() {

	$args = array(
		'fields' => 'slug'
	);
	$slugs = pll_languages_list( array( 'fields' => 'slug' ) );
	$locales = pll_languages_list( array( 'fields' => 'locale' ) );
	$names = pll_languages_list( array( 'fields' => 'name' ) );
	$langs = array();
	foreach ( $slugs as $index => $slug ) {
		$langs[$slug] = array(
			'local' => $locales[$index],
			'name' => $names[$index],
			'url' => pll_home_url( $slug ),
		);
	}
	return json_encode( $langs );

}

function info_endpoint() {

	return (object) array(
		'title' => get_bloginfo( 'title' ),
		'tagline' => get_bloginfo( 'description' )
	);

}

function options_endpoint() {

	$options = array();
	$option_keys = array(
		'alert',
		'authorship_brief',
		'backstory_brief',
		'imagery_brief',
		'links_brief',
		'subscribe'
	);
	foreach( $option_keys as $i => $option_key ) {
		$option = get_field( $option_key , 'option' );
		$options[$option_key ] = $option;
	}
	return $options;

}

function menu_endpoint() {

	$menu_items = wp_get_nav_menu_items( 'main' );
	foreach ( $menu_items as $i => $menu_item ) {
		if( $post = get_post( $menu_item->object_id ) ) {
			$menu_items[$i]->slug = $post->post_name;	
		}
	}
	return $menu_items;

}

function page_endpoint( $req ) {

	$slug = $req['slug'];
	$lang = $req['lang'];
	$args = array(
		'post_type' => 'page',
		'posts_per_page'=> 1, 
		'numberposts'=> 1,
		'name' => $slug
	);
	$page = get_posts( $args )[0];
	$acf = get_fields( $page->ID );
	$page->acf = $acf;
	return $page;

}

function creators_endpoint( $req ) {

	$args = array(
		'post_type' => 'creators',
		'posts_per_page'=> -1, 
		'numberposts'=> -1
	);
	if( isset( $_GET['lang'] ) ) {
		$lang = explode( '-', $_GET['lang'] )[0];
		$args['lang'] = $lang;
	}
	$creators = get_posts( $args );
	foreach( $creators as $key => $creator ) {
		$creators[$key]->acf = get_fields( $creator->ID );
	}
	return $creators;

}

function creator_endpoint( $req ) {

	$lang = $req['lang'];
	$args = array(
		'post_type' => 'creators',
		'posts_per_page'=> 1, 
		'numberposts'=> 1,
		'name' => $lang
	);
	$creator = get_posts( $args )[0];
	$acf = get_fields( $creator->ID );
	$creator->acf = $acf;
	return $creator;

}


add_action( 'rest_api_init', function () {

	register_rest_route( 'wp/v2', '/options', array(
		'methods' => 'GET',
		'callback' => 'options_endpoint'
	));

	register_rest_route( 'wp/v2', '/info', array(
		'methods' => 'GET',
		'callback' => 'info_endpoint'
	));

	register_rest_route( 'wp/v2', '/menu', array(
		'methods' => 'GET',
		'callback' => 'menu_endpoint'
	));

	register_rest_route( 'wp/v2', '/page/', array(
		'methods' => 'GET',
		'callback' => 'page_endpoint'
	));

	register_rest_route( 'wp/v2', '/creators', array(
		'methods' => 'GET',
		'callback' => 'creators_endpoint'
	));

	register_rest_route( 'wp/v2', '/creator/(?P<lang>[a-zA-Z0-9-]+)', array(
		'methods' => 'GET',
		'callback' => 'creator_endpoint'
	));

	register_rest_route( 'wp/v2', '/translation/(?P<lang>[a-zA-Z0-9-]+)', array(
		'methods' => 'GET',
		'callback' => 'get_translations_json'
	));

	register_rest_route( 'wp/v2', '/get_langs/', array(
		'methods' => 'GET',
		'callback' => 'get_langs'
	));

});

pll_register_string( 'Corner Names', 'authorship', 'Four Corners', false );
pll_register_string( 'Corner Names', 'backstory', 'Four Corners', false );
pll_register_string( 'Corner Names', 'imagery', 'Four Corners', false );
pll_register_string( 'Corner Names', 'links', 'Four Corners', false );

if( function_exists('acf_add_options_page') ) {
	
	acf_add_options_page();
	
}

show_admin_bar( false );
