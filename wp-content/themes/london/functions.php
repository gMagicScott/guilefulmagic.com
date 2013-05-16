<?php
if ( function_exists('register_sidebars') )
    register_sidebars(2);

function register_my_menus() {
  register_nav_menus(
    array('header-menu' => __( 'Header Menu' ) )
  );
}

add_action( 'init', 'register_my_menus' );

/*
* allow authors to add rel="me" to links in their bio's
* Code thanks to Yoast.com
*/
function yoast_allow_rel() {
	global $allowedtags;
	$allowedtags['a']['rel'] = array ();
}
add_action( 'wp_loaded', 'yoast_allow_rel' );

/* EOF */