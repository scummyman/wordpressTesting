<?php
/**
 * Single Product Thumbnails
 *
 * This template can be overridden by copying it to yourtheme/woocommerce/single-product/product-thumbnails.php.
 *
 * HOWEVER, on occasion WooCommerce will need to update template files and you
 * (the theme developer) will need to copy the new files to your theme to
 * maintain compatibility. We try to do this as little as possible, but it does
 * happen. When this occurs the version of the template file will be bumped and
 * the readme will list any important changes.
 *
 * @see 	    https://docs.woocommerce.com/document/template-structure/
 * @author 		WooThemes
 * @package 	WooCommerce/Templates
 * @version     3.0.2
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

global $post, $product, $woocommerce_loop;

$is_quick_view = (isset($woocommerce_loop['view']) && $woocommerce_loop['view'] == 'quick-view');

$attachment_ids = $product->get_gallery_image_ids();

$thums_position = basel_get_opt('thums_position');

$product_design = basel_product_design();


// Full size images for sticky product design
if( $product_design == 'sticky' ) {
	$thums_position = 'bottom';
}


if ( $attachment_ids && has_post_thumbnail() ) {
	foreach ( $attachment_ids as $attachment_id ) {
		$full_size_image  = wp_get_attachment_image_src( $attachment_id, 'full' );
		$thumbnail        = wp_get_attachment_image_src( $attachment_id, 'shop_thumbnail' );
		$image_title     = get_post_field( 'post_excerpt', $attachment_id );

		$attributes = array(
			'title'                   => $image_title,
			'data-src'                => $full_size_image[0],
			'data-large_image'        => $full_size_image[0],
			'data-large_image_width'  => $full_size_image[1],
			'data-large_image_height' => $full_size_image[2],
		);

		$html  = '<figure data-thumb="' . esc_url( $thumbnail[0] ) . '" class="woocommerce-product-gallery__image"><a href="' . esc_url( $full_size_image[0] ) . '">';
		$html .= wp_get_attachment_image( $attachment_id, 'shop_single', false, $attributes );
 		$html .= '</a></figure>';

		echo apply_filters( 'woocommerce_single_product_image_thumbnail_html', $html, $attachment_id );
	}
}
