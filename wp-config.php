<?php
// ===================================================
// Load database info and local development parameters
// ===================================================
if ( file_exists( dirname( __FILE__ ) . '/local-config.php' ) ) {
	define( 'WP_LOCAL_DEV', true );
	include( dirname( __FILE__ ) . '/local-config.php' );
} else {
	define( 'WP_LOCAL_DEV', false );
	include( dirname( __FILE__ ) . '../server-db-config.php' );
	include( dirname( __FILE__ ) . '../server-salts-config.php' );
}

// ========================
// Custom Content Directory
// ========================
define( 'WP_CONTENT_DIR', dirname( __FILE__ ) . '/content' );
define( 'WP_CONTENT_URL', 'http://' . $_SERVER['HTTP_HOST'] . '/content' );

// ================================================
// You almost certainly do not want to change these
// ================================================
define( 'DB_CHARSET', 'utf8' );
define( 'DB_COLLATE', '' );

// ==================================================================
// Production Salts not in Repo, these are just for Local Development
// Grab these from: https://api.wordpress.org/secret-key/1.1/salt
// ==================================================================
if ( WP_LOCAL_DEV ) {
	define('AUTH_KEY',         'cBrOPSKu]6Ub%7M^%?f(h&JIB11$|eO2j/Lp#p5Y/[ c{YcS)+sdT|]8eLoQB7O<');
	define('SECURE_AUTH_KEY',  '>,OcWJDc;m:l~]t/OBzTu|{QGG(@?[kAk7fF|>-wqt|+Z$wv#S3W4:Teytj;VsQ;');
	define('LOGGED_IN_KEY',    'hIL;o=q~~urR:I:?-I}CPQr%HBdJt~scC*+WV-TNEht-o>QgampJ02#H*5qVTSiJ');
	define('NONCE_KEY',        '-f5>}bsKZ8WApX#|2]wdyTajCdWti-U],u>jvWQUOy,WY-l`>JHlqO~V%F^&,K0q');
	define('AUTH_SALT',        'wt(Ic{W6^XeY9cpR?eqS ,$~]wBs&-2?Glv>]ogHTeSZi||vlIA4az>#+uj+ZaH]');
	define('SECURE_AUTH_SALT', '`IpOh0#iX0`4;Yy/vGfg}sg?c>zFWLK[|%xWD`rwc|iI[Ym+SXK_Y$&#$3vqpx+;');
	define('LOGGED_IN_SALT',   '+{YEBeNnN:B&g_ct-#A6EQDMkvn+0MXkr8VG+%mde-C5(AL0N1FKa}MrxmgOe;U>');
	define('NONCE_SALT',       'k;?|8#?tWS&G8KwJk@C/5B?4lp}q9:6o8|(,f!R)CJw3-?+edXbY^}Az~|Zg+Z4W');
}

// ==============================================================
// Table prefix, (Just for local development)
// Change this if you have multiple installs in the same database
// ==============================================================
if ( WP_LOCAL_DEV ) {
	$table_prefix  = 'wp_local_';
}

// ================================
// Language
// Leave blank for American English
// ================================
define( 'WPLANG', '' );

// ===========
// Hide errors
// ===========
@ini_set( 'display_errors', 0 );
define( 'WP_DEBUG_DISPLAY', false );

// =================================================================
// Debug mode
// Debugging? Enable these by over-riding in local-config.php
// =================================================================
if ( !defined( 'SAVEQUERIES' ) ) {
  define( 'SAVEQUERIES', false );
}
if ( !defined( 'WP_DEBUG' ) ) {
	define( 'WP_DEBUG', false );
}

// ===================
// Bootstrap WordPress
// ===================
if ( !defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', dirname( __FILE__ ) . '/wp/' );
}
require_once( ABSPATH . 'wp-settings.php' );
