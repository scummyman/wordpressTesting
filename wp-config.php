<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the
 * installation. You don't have to use the web site, you can
 * copy this file to "wp-config.php" and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://codex.wordpress.org/Editing_wp-config.php
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define('DB_NAME', 'wordpressdb');

/** MySQL database username */
define('DB_USER', 'testwordpress');

/** MySQL database password */
define('DB_PASSWORD', '19714362');

/** MySQL hostname */
define('DB_HOST', 'localhost');

/** Database Charset to use in creating database tables. */
define('DB_CHARSET', 'utf8mb4');

/** The Database Collate type. Don't change this if in doubt. */
define('DB_COLLATE', '');

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         '<C#*ol<*s@)&j4Y/<?LVV0g[iH7TC(vX^*XPD+a/=8..X$t`>}+.>X^E):vzeHlY');
define('SECURE_AUTH_KEY',  'Tks9sAegY[kRQDW_C2}-+sJ(wEg*KKW$PX%|=jYuy#gAWr.Ze6&<dtp`Pt/VhFV@');
define('LOGGED_IN_KEY',    'LM+NyB)z,S?p?iT00a^LZH)7bm;Bz<xYCTgI,Du-C:+tQ50~x[@.FE/*QnE68 t^');
define('NONCE_KEY',        'm^1zX huScLC9Kar/;8m(Il?=</1N_xix6P:p7>D,/DJz `Z$PqfxZ_.yB=0i` +');
define('AUTH_SALT',        'jsvseL$B.+)sYVB8kS^?QN-%$5QE#7WW%P{LyDt2]Gj>C)et[~=OEgF7$B6U<2z,');
define('SECURE_AUTH_SALT', 'qis>*s0U`iLCn(]C[L~>CCCv9K[P^a/t/bp0b4; 3jj>,WPk*TWw<,N`..MDs7Jt');
define('LOGGED_IN_SALT',   'v!>z-(T8P:>!?LPcw=!*Ze|q,0Kk3uhPXJsKJoGnAyB~koqIL-EWOVKn#xFQ3C1N');
define('NONCE_SALT',       'u[I&sVw~v- -JRq!/tqs(WY:)vYk[Q1EpFbZR)WvJ&xW1g%Fuw,X@2l8xVIyeDD]');

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix  = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the Codex.
 *
 * @link https://codex.wordpress.org/Debugging_in_WordPress
 */
define('WP_DEBUG', false);

/* That's all, stop editing! Happy blogging. */

/** Absolute path to the WordPress directory. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** Sets up WordPress vars and included files. */
require_once(ABSPATH . 'wp-settings.php');
