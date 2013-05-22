<?php
/*
This is a sample local-config.php file
In it, you *must* include the four main database defines

You may include other settings here that you only want enabled on your local development checkouts
*/

define( 'DB_NAME', 'local_db_name' );
define( 'DB_USER', 'local_db_user' );
define( 'DB_PASSWORD', 'local_db_password' );
define( 'DB_HOST', 'localhost' ); // Probably 'localhost'

 // /* ======================
// Turn Developer Mode On
//
// In Sublime Text, Ctrl+/ will toggle line
// comments, doing so on line 14 will turn
// debub mode on and off.
// ======================
define('WP_DEBUG', true);

// Enable Debug logging to the /wp-content/debug.log file
define('WP_DEBUG_LOG', true);

// Save MySQL Queries for Debugging
define('SAVEQUERIES', true);

// */
