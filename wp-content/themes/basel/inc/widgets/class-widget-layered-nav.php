<?php if ( ! defined('BASEL_THEME_DIR')) exit('No direct script access allowed');

/**
 * Color filter widget
 *
 */

if ( ! class_exists( 'BASEL_Widget_Layered_Nav' ) ) {
	class BASEL_Widget_Layered_Nav extends WPH_Widget {
	
		function __construct() {
			if( ! basel_woocommerce_installed() || ! function_exists( 'wc_get_attribute_taxonomies' ) ) return;

			$attribute_array      = array();
			$attribute_taxonomies = wc_get_attribute_taxonomies();

			if ( $attribute_taxonomies ) {
				foreach ( $attribute_taxonomies as $tax ) {
					$attribute_array[ $tax->attribute_name ] = $tax->attribute_name;
				}
			}

			// Configure widget array
			$args = array( 
				// Widget Backend label
				'label' => __( 'BASEL WooCommerce Layered Nav', 'basel' ),
				// Widget Backend Description								
				'description' =>__( 'Shows a custom attribute in a widget which lets you narrow down the list of products when viewing product categories.', 'basel' ),
			 );
		
			// Configure the widget fields
		
			// fields array
			$args['fields'] = array(
				array(
					'id'	=> 'title',
					'type'  => 'text',
					'std'   => __( 'Filter by', 'woocommerce' ),
					'name' 	=> __( 'Title', 'woocommerce' )
				),
				array(
					'id'	=> 'attribute',
					'type'    => 'dropdown',
					'std'     => '',
					'name'   => __( 'Attribute', 'woocommerce' ),
					'fields' => $attribute_array
				),
				array(
					'id'	=> 'query_type',
					'type'    => 'dropdown',
					'std'     => 'and',
					'name'   => __( 'Query type', 'woocommerce' ),
					'fields' => array(
						__( 'AND', 'woocommerce' ) => 'and',
						__( 'OR', 'woocommerce' ) => 'or'
					)
				),
				array(
					'id'	=> 'display',
					'type'    => 'dropdown',
					'std'     => 'list',
					'name'   => __( 'Display type', 'basel' ),
					'fields' => array(
						__( 'list', 'basel' ) => 'list',
						__( 'inline', 'basel' ) => 'inline',
						__( 'Dropdown', 'woocommerce' ) => 'dropdown'
					)
				),
				array(
					'id'	=> 'size',
					'type'    => 'dropdown',
					'std'     => 'normal',
					'name'   => __( 'Swatches size', 'basel' ),
					'fields' => array(
						__( 'normal', 'basel' ) => 'normal',
						__( 'large', 'basel' ) => 'large',
						__( 'small', 'basel' ) => 'small',
					)
				),
				array(
					'id'	=> 'labels',
					'type'    => 'dropdown',
					'std'     => 'on',
					'name'   => __( 'Show labels', 'basel' ),
					'fields' => array(
						__( 'ON', 'basel' ) => 'on',
						__( 'OFF', 'basel' ) => 'off'
					)
				)
			);

			// create widget
			$this->create_widget( $args );
		}
		
		// Output function
		// Based on woo widget @version  2.3.0
		function widget( $args, $instance )	{
			$_chosen_attributes = WC_Query::get_layered_nav_chosen_attributes();
			$taxonomy           = isset( $instance['attribute'] ) ? wc_attribute_taxonomy_name( $instance['attribute'] ) : $this->settings['attribute']['std'];
			$query_type         = isset( $instance['query_type'] ) ? $instance['query_type'] : $this->settings['query_type']['std'];
			$display	  		= isset( $instance['display'] ) ? $instance['display'] : 'list';

			if ( ! taxonomy_exists( $taxonomy ) ) {
				return;
			}

			$get_terms_args = array( 'hide_empty' => '1' );

			$orderby = wc_attribute_orderby( $taxonomy );

			switch ( $orderby ) {
				case 'name' :
					$get_terms_args['orderby']    = 'name';
					$get_terms_args['menu_order'] = false;
				break;
				case 'id' :
					$get_terms_args['orderby']    = 'id';
					$get_terms_args['order']      = 'ASC';
					$get_terms_args['menu_order'] = false;
				break;
				case 'menu_order' :
					$get_terms_args['menu_order'] = 'ASC';
				break;
			}

			$terms = get_terms( $taxonomy, $get_terms_args );

			if ( 0 === sizeof( $terms ) ) {
				return;
			}

			ob_start();

			echo $args['before_widget'];

			if ( $title = apply_filters( 'widget_title', empty( $instance['title'] ) ? '' : $instance['title'], $instance ) ) {
				echo $args['before_title'] . $title . $args['after_title'];
			}

			if ( 'dropdown' === $display ) {
				$found = $this->layered_nav_dropdown( $terms, $taxonomy, $query_type );
			} else {
				$found = $this->layered_nav_list( $terms, $taxonomy, $query_type, $instance );
			}

			echo $args['after_widget'];

			// Force found when option is selected - do not force found on taxonomy attributes
			if ( ! is_tax() && is_array( $_chosen_attributes ) && array_key_exists( $taxonomy, $_chosen_attributes ) ) {
				$found = true;
			}

			if ( ! $found ) {
				ob_end_clean();
			} else {
				echo ob_get_clean();
			}
			
		}

		/**
		 * Return the currently viewed taxonomy name.
		 * @return string
		 */
		protected function get_current_taxonomy() {
			return is_tax() ? get_queried_object()->taxonomy : '';
		}

		/**
		 * Return the currently viewed term ID.
		 * @return int
		 */
		protected function get_current_term_id() {
			return absint( is_tax() ? get_queried_object()->term_id : 0 );
		}

		/**
		 * Return the currently viewed term slug.
		 * @return int
		 */
		protected function get_current_term_slug() {
			return absint( is_tax() ? get_queried_object()->slug : 0 );
		}

		/**
		 * Show dropdown layered nav.
		 * @param  array $terms
		 * @param  string $taxonomy
		 * @param  string $query_type
		 * @return bool Will nav display?
		 */
		protected function layered_nav_dropdown( $terms, $taxonomy, $query_type ) {
			$found = false;

			if ( $taxonomy !== $this->get_current_taxonomy() ) {
				$term_counts          = $this->get_filtered_term_product_counts( wp_list_pluck( $terms, 'term_id' ), $taxonomy, $query_type );
				$_chosen_attributes   = WC_Query::get_layered_nav_chosen_attributes();
				$taxonomy_filter_name = str_replace( 'pa_', '', $taxonomy );

				echo '<a href="#" class="filter-pseudo-link link-taxonomy-' . $taxonomy_filter_name . '">' . __('Apply filter', 'basel') . '</a>';
				echo '<select class="basel_dropdown_layered_nav_' . $taxonomy_filter_name . '" data-filter-url="' . preg_replace( '%\/page\/[0-9]+%', '', str_replace( array( '&amp;', '%2C' ), array( '&', ',' ), esc_js( add_query_arg( 'filtering', '1', remove_query_arg( array( 'page', '_pjax', 'filter_' . $taxonomy_filter_name ) ) ) ) ) ) . "&filter_". esc_js( $taxonomy_filter_name ) . "=BASEL_FILTER_VALUE" . '">';

				echo '<option value="">' . sprintf( __( 'Any %s', 'woocommerce' ), wc_attribute_label( $taxonomy ) ) . '</option>';

				foreach ( $terms as $term ) {

					// If on a term page, skip that term in widget list
					if ( $term->term_id === $this->get_current_term_id() ) {
						continue;
					}

					// Get count based on current view
					$current_values    = isset( $_chosen_attributes[ $taxonomy ]['terms'] ) ? $_chosen_attributes[ $taxonomy ]['terms'] : array();
					$option_is_set     = in_array( $term->slug, $current_values );
					$count             = isset( $term_counts[ $term->term_id ] ) ? $term_counts[ $term->term_id ] : 0;

					// Only show options with count > 0
					if ( 0 < $count ) {
						$found = true;
					} elseif ( 'and' === $query_type && 0 === $count && ! $option_is_set ) {
						continue;
					}

					echo '<option value="' . esc_attr( $term->slug ) . '" ' . selected( $option_is_set, true, false ) . '>' . esc_html( $term->name ) . '</option>';
				}

				echo '</select>';

				wc_enqueue_js( "
					jQuery( '.dropdown_layered_nav_". esc_js( $taxonomy_filter_name ) . "' ).change( function() {
						var slug = jQuery( this ).val();
						location.href = '" . preg_replace( '%\/page\/[0-9]+%', '', str_replace( array( '&amp;', '%2C' ), array( '&', ',' ), esc_js( add_query_arg( 'filtering', '1', remove_query_arg( array( 'page', 'filter_' . $taxonomy_filter_name ) ) ) ) ) ) . "&filter_". esc_js( $taxonomy_filter_name ) . "=' + slug;
					});
				" );
			}

			return $found;
		}

		/**
		 * Get current page URL for layered nav items.
		 * @return string
		 */
		protected function get_page_base_url( $taxonomy ) {
			if ( defined( 'SHOP_IS_ON_FRONT' ) ) {
				$link = home_url();
			} elseif ( is_post_type_archive( 'product' ) || is_page( wc_get_page_id('shop') ) ) {
				$link = get_post_type_archive_link( 'product' );
			} elseif( is_product_category() ) {
				$link = get_term_link( get_query_var('product_cat'), 'product_cat' );
			} elseif( is_product_tag() ) {
				$link = get_term_link( get_query_var('product_tag'), 'product_tag' );
			} else {
				$queried_object = get_queried_object();
				$link = get_term_link( $queried_object->slug, $queried_object->taxonomy );
			}

			// Min/Max
			if ( isset( $_GET['min_price'] ) ) {
				$link = add_query_arg( 'min_price', wc_clean( $_GET['min_price'] ), $link );
			}

			if ( isset( $_GET['max_price'] ) ) {
				$link = add_query_arg( 'max_price', wc_clean( $_GET['max_price'] ), $link );
			}

			// Orderby
			if ( isset( $_GET['orderby'] ) ) {
				$link = add_query_arg( 'orderby', wc_clean( $_GET['orderby'] ), $link );
			}

			/**
			 * Search Arg.
			 * To support quote characters, first they are decoded from &quot; entities, then URL encoded.
			 */
			if ( get_search_query() ) {
				$link = add_query_arg( 's', rawurlencode( htmlspecialchars_decode( get_search_query() ) ), $link );
			}

			// Post Type Arg
			if ( isset( $_GET['post_type'] ) ) {
				$link = add_query_arg( 'post_type', wc_clean( $_GET['post_type'] ), $link );
			}

			// Min Rating Arg
			if ( isset( $_GET['min_rating'] ) ) {
				$link = add_query_arg( 'min_rating', wc_clean( $_GET['min_rating'] ), $link );
			}

			// All current filters
			if ( $_chosen_attributes = WC_Query::get_layered_nav_chosen_attributes() ) {
				foreach ( $_chosen_attributes as $name => $data ) {
					if ( $name === $taxonomy ) {
						continue;
					}
					$filter_name = sanitize_title( str_replace( 'pa_', '', $name ) );
					if ( ! empty( $data['terms'] ) ) {
						$link = add_query_arg( 'filter_' . $filter_name, implode( ',', $data['terms'] ), $link );
					}
					if ( 'or' == $data['query_type'] ) {
						$link = add_query_arg( 'query_type_' . $filter_name, 'or', $link );
					}
				}
			}

			return $link;
		}

		/**
		 * Count products within certain terms, taking the main WP query into consideration.
		 * @param  array $term_ids
		 * @param  string $taxonomy
		 * @param  string $query_type
		 * @return array
		 */
		protected function get_filtered_term_product_counts( $term_ids, $taxonomy, $query_type ) {
			global $wpdb;
			$tax_query  = WC_Query::get_main_tax_query();
			$meta_query = WC_Query::get_main_meta_query();
			if ( 'or' === $query_type ) {
				foreach ( $tax_query as $key => $query ) {
					if ( is_array( $query ) && $taxonomy === $query['taxonomy'] ) {
						unset( $tax_query[ $key ] );
					}
				}
			}
			$meta_query      = new WP_Meta_Query( $meta_query );
			$tax_query       = new WP_Tax_Query( $tax_query );
			$meta_query_sql  = $meta_query->get_sql( 'post', $wpdb->posts, 'ID' );
			$tax_query_sql   = $tax_query->get_sql( $wpdb->posts, 'ID' );
			// Generate query
			$query           = array();
			$query['select'] = "SELECT COUNT( DISTINCT {$wpdb->posts}.ID ) as term_count, terms.term_id as term_count_id";
			$query['from']   = "FROM {$wpdb->posts}";
			$query['join']   = "
				INNER JOIN {$wpdb->term_relationships} AS term_relationships ON {$wpdb->posts}.ID = term_relationships.object_id
				INNER JOIN {$wpdb->term_taxonomy} AS term_taxonomy USING( term_taxonomy_id )
				INNER JOIN {$wpdb->terms} AS terms USING( term_id )
				" . $tax_query_sql['join'] . $meta_query_sql['join'];
			$query['where']   = "
				WHERE {$wpdb->posts}.post_type IN ( 'product' )
				AND {$wpdb->posts}.post_status = 'publish'
				" . $tax_query_sql['where'] . $meta_query_sql['where'] . "
				AND terms.term_id IN (" . implode( ',', array_map( 'absint', $term_ids ) ) . ")
			";
			if ( method_exists('WC_Query', 'get_main_search_query_sql') && $search = WC_Query::get_main_search_query_sql() ) {
				$query['where'] .= ' AND ' . $search;
			}
			$query['group_by'] = "GROUP BY terms.term_id";
			$query             = apply_filters( 'woocommerce_get_filtered_term_product_counts_query', $query );
			$query             = implode( ' ', $query );
			$results           = $wpdb->get_results( $query );
			return wp_list_pluck( $results, 'term_count', 'term_count_id' );

		}

		/**
		 * Show list based layered nav.
		 * @param  array $terms
		 * @param  string $taxonomy
		 * @param  string $query_type
		 * @return bool Will nav display?
		 */
		protected function layered_nav_list( $terms, $taxonomy, $query_type, $instance ) {
			$labels		  		= isset( $instance['labels'] ) ? $instance['labels'] : 'on';
			$size		  		= isset( $instance['size'] ) ? $instance['size'] : 'normal';
			$display	  		= isset( $instance['display'] ) ? $instance['display'] : 'list';
			$scroll_for_widget  = basel_get_opt('widgets_scroll');

			$class = 'show-labels-' . $labels;
			$class .= ' swatches-' . $size;
			$class .= ' swatches-display-' . $display;
			// List display
			if( $scroll_for_widget ) {
				echo '<div class="basel-scroll">';
				$class .= ' basel-scroll-content';
			}
			echo '<ul class="' . esc_attr( $class ) . '">';

			$term_counts        = $this->get_filtered_term_product_counts( wp_list_pluck( $terms, 'term_id' ), $taxonomy, $query_type );
			$_chosen_attributes = WC_Query::get_layered_nav_chosen_attributes();
			$found              = false;

			foreach ( $terms as $term ) {
				$current_values    = isset( $_chosen_attributes[ $taxonomy ]['terms'] ) ? $_chosen_attributes[ $taxonomy ]['terms'] : array();
				$option_is_set     = in_array( $term->slug, $current_values );
				$count             = isset( $term_counts[ $term->term_id ] ) ? $term_counts[ $term->term_id ] : 0;

				// skip the term for the current archive
				if ( $this->get_current_term_id() === $term->term_id ) {
					continue;
				}

				// Only show options with count > 0
				if ( 0 < $count ) {
					$found = true;
				} elseif ( 'and' === $query_type && 0 === $count && ! $option_is_set ) {
					continue;
				}

				$filter_name    = 'filter_' . sanitize_title( str_replace( 'pa_', '', $taxonomy ) );
				$current_filter = isset( $_GET[ $filter_name ] ) ? explode( ',', wc_clean( $_GET[ $filter_name ] ) ) : array();
				$current_filter = array_map( 'sanitize_title', $current_filter );

				if ( ! in_array( $term->slug, $current_filter ) ) {
					$current_filter[] = $term->slug;
				}

				$link = $this->get_page_base_url( $taxonomy );

				// Add current filters to URL.
				foreach ( $current_filter as $key => $value ) {
					// Exclude query arg for current term archive term
					if ( $value === $this->get_current_term_slug() ) {
						unset( $current_filter[ $key ] );
					}

					// Exclude self so filter can be unset on click.
					if ( $option_is_set && $value === $term->slug ) {
						unset( $current_filter[ $key ] );
					}
				}

				if ( ! empty( $current_filter ) ) {
					$link = add_query_arg( $filter_name, implode( ',', $current_filter ), $link );

					// Add Query type Arg to URL
					if ( $query_type === 'or' && ! ( 1 === sizeof( $current_filter ) && $option_is_set ) ) {
						$link = add_query_arg( 'query_type_' . sanitize_title( str_replace( 'pa_', '', $taxonomy ) ), 'or', $link );
					}
				}

				// Add swatches block
				$swatch_div = $swatch_style = '';
				$swatch_color = basel_tax_data( $taxonomy, $term->term_id, 'color' );
				$swatch_image = basel_tax_data( $taxonomy, $term->term_id, 'image' );
				$swatch_text = basel_tax_data( $taxonomy, $term->term_id, 'not_dropdown' );

				$class = $option_is_set ? 'chosen' : '';

				if( ! empty( $swatch_color ) ) {
					$class .= ' with-swatch-color';
					$swatch_style = 'background-color: ' . $swatch_color .';';
				} else if( ! empty( $swatch_image ) ) {
					$class .= ' with-swatch-image';
					$swatch_style = 'background-image: url(' . $swatch_image .');';
				} else if( ! empty( $swatch_text ) ) {
					$class .= ' with-swatch-text';
				}

				if( ! empty( $swatch_style ) ) {
					$swatch_div = '<div class="filter-swatch"><span style="' . $swatch_style. '"></span></div>';
				}
				// END swatches customization

				echo '<li class="wc-layered-nav-term ' . esc_attr( $class ) . '">';

				echo ( $count > 0 || $option_is_set ) ? '<a href="' . esc_url( apply_filters( 'woocommerce_layered_nav_link', $link ) ) . '">' : '<span>';

				echo $swatch_div;

				echo esc_html( $term->name );

				echo ( $count > 0 || $option_is_set ) ? '</a>' : '</span>';

				echo ' <span class="count">(' . absint( $count ) . ')</span></li>';
			}

			echo '</ul>';
			if( $scroll_for_widget ) echo '</div>';

			return $found;
		}
		function form( $instance ) {
			parent::form( $instance );
		}
	
	} // class
}