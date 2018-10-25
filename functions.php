<?php

function four_corners_scripts() {
	$ver = '0.0.1';	
	// wp_enqueue_script( 'jquery' );
	// wp_enqueue_script( 'public_script', get_template_directory_uri() . '/assets/public.bundle.js', array(), $ver, true );
	wp_enqueue_script( 'react_script', get_stylesheet_directory_uri() . '/dist/app.js' , array(), $ver, true );
	wp_enqueue_style( 'bootstrap_style', 'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css' );
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
		    )
		  )
	  )
	) );
}
add_action( 'wp_enqueue_scripts', 'four_corners_scripts' );


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


function creators_endpoint( $request_data ) {
	$args = array(
		'post_type' => 'creators',
		'posts_per_page'=> -1, 
		'numberposts'=> -1
	);
	if( isset( $_GET['slug'] ) ) {
		$slug = $_GET['slug'];
		$args['name'] = $slug;
	}
	$creators = get_posts($args);
	foreach( $creators as $key => $creator ) {
		$creators[$key]->acf = get_fields( $creator->ID );
	}
	return $creators;
}

function creator_endpoint( $request ) {
	$slug = $request['slug'];
	$args = array(
		'post_type' => 'creators',
		'posts_per_page'=> 1, 
		'numberposts'=> 1,
		'name' => $slug
	);
	$creator = get_posts($args)[0];
	$acf = get_fields( $creator->ID );
	$creator->acf = $acf;
	return $creator;
}

add_action( 'rest_api_init', function () {

	register_rest_route( 'wp/v2', '/creators', array(
		'methods' => 'GET',
		'callback' => 'creators_endpoint'
	));

	register_rest_route( 'wp/v2', '/creator/(?P<slug>[a-zA-Z0-9-]+)', array(
		'methods' => 'GET',
		'callback' => 'creator_endpoint'
	));

});
