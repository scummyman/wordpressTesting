<?php			
	$absolute_path = explode( 'wp-content', $_SERVER['SCRIPT_FILENAME'] );
	$wp_load = $absolute_path[0] . 'wp-load.php';
	require_once( $wp_load );
	header("Content-type: text/css; charset: UTF-8");
	echo get_option('basel_dynamic_css');
	basel_settings_css();
?>