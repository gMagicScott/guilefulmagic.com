<?php
/**
 * The template for displaying 404 pages (Not Found).
 */

if ( !defined( 'ABSPATH' ) ) exit;

function curPageURL() {
 $pageURL = 'http';
 if ($_SERVER["HTTPS"] == "on") {$pageURL .= "s";}
 $pageURL .= "://";
 if ($_SERVER["SERVER_PORT"] != "80") {
  $pageURL .= $_SERVER["SERVER_NAME"].":".$_SERVER["SERVER_PORT"].$_SERVER["REQUEST_URI"];
 } else {
  $pageURL .= $_SERVER["SERVER_NAME"].$_SERVER["REQUEST_URI"];
 }
 return $pageURL;
}

get_header(); ?>
<div id="content">
	<h1>Woah, daddy, back up the truck!</h1>
	<p>Whatever you're looking for ain't here.</p>
	<p><?php echo curPageURL(); ?></p>
	<p>Please follow the illuminated lights along the aisle and head for the nearest or most interesting exit:</p>
	<ul>
		<li>Hit the "Back" button.</li>
		<li>Go <a href="<?php bloginfo('url');?>">Home</a>.</li>
		<li>Pretend you came here on purpose and read this page like it's really important. Nod and say things like "Oh!" and "Wow!" for greater effect.</li>
	</ul>
</div>
<?php get_sidebar(); ?>

</div>
<!-- The main column ends  -->
<?php get_footer(); ?>
