<?php
/**
 * The default template for displaying content in slider
 *
 */

global $basel_loop;

$img = false;

if( has_post_thumbnail() && ! post_password_required() && ! is_attachment() ) {

	if( function_exists( 'wpb_getImageBySize' ) ) {
		$img_id = get_post_thumbnail_id();
		$img = wpb_getImageBySize( array( 'attach_id' => $img_id, 'thumb_size' => $basel_loop['img_size'], 'class' => 'content-slider-image' ) );
		$img = $img['thumbnail'];
	} else {
		$img = get_the_post_thumbnail( get_the_ID(), $basel_loop['img_size'] );
	}

}

$classes = array( 'post-slide' );
if ( empty( $basel_loop['blog_design'] ) )
	$basel_loop['blog_design'] = basel_get_opt( 'blog_design' );

$blog_design = basel_get_opt( 'blog_design' );

// $classes[] = 'blog-design-' . $blog_design;
$classes[] = 'blog-design-masonry';

?>
<article id="post-<?php the_ID(); ?>" <?php post_class( $classes ); ?>>
	
	<div class="post-head">
		<?php if ( ! is_wp_error( $img ) && $img ) : ?>
			<a href="<?php echo esc_url( get_permalink() ); ?>">
				<figure class="entry-thumbnail"><?php echo $img; ?></figure>
			</a>
		<?php endif; ?>

		<?php basel_post_date(); ?>
	</div>

	<div class="post-mask">

		<?php if ( get_post_type() == 'post' ): ?>
			<?php if(get_the_category_list( ', ' ) ): ?>
				<div class="meta-post-categories"><?php echo get_the_category_list( ', ' ); ?></div>
			<?php endif; ?>

			<h3 class="entry-title">
				<a href="<?php echo esc_url( get_permalink() ); ?>" rel="bookmark"><?php the_title(); ?></a>
			</h3>
			<div class="entry-meta font-alt">
				<?php basel_post_meta(array(
						'labels' => 1,
						'author' => 0,
						'date' => 0,
						'edit' => 0,
						'comments' => 1
					));  
				?>
			</div><!-- .entry-meta -->
			
			<div class="entry-content">
				<?php basel_get_content(); ?>
			</div><!-- .entry-meta -->

		<?php else: ?>
			<h3 class="entry-title">
				<a href="<?php echo esc_url( get_permalink() ); ?>" rel="bookmark"><?php the_title(); ?></a>
			</h3>
		<?php endif ?>

	</div>

</article><!-- #post -->
