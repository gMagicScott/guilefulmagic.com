<?php
/**
 * Header for our theme
 *
 *  Displays all of the <head> section and everything up through the logo
 */

if ( !defined( 'ABSPATH' ) ) exit;

?><!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo( 'charset' ); ?>" />
    <title><?php wp_title(''); ?></title>
    <link rel="shortcut icon" href="<?php bloginfo('template_directory'); ?>/favicon.ico" /> 
    <link rel="stylesheet" href="<?php bloginfo( 'stylesheet_url' ); ?>" type="text/css" media="screen" />
    <link rel="stylesheet" href="<?php bloginfo( 'stylesheet_directory' ) ?>/black-tie/jquery-ui-1.8.20.custom.css" type="text/css" />
    <link rel="alternate" type="application/rss+xml" title="RSS 2.0" href="<?php bloginfo('rss2_url'); ?>" />
    <link rel="alternate" type="text/xml" title="RSS .92" href="<?php bloginfo('rss_url'); ?>" />
    <link rel="alternate" type="application/atom+xml" title="Atom 0.3" href="<?php bloginfo('atom_url'); ?>" />
    <link rel="pingback" href="<?php bloginfo('pingback_url'); ?>" />
    <link href='http://fonts.googleapis.com/css?family=Ubuntu:bold' rel='stylesheet' type='text/css'>
    <link href='http://fonts.googleapis.com/css?family=Vollkorn' rel='stylesheet' type='text/css'>
    <!--[if IE 7]>
	   <link type="text/css" media="screen" rel="stylesheet" href="<?php bloginfo('template_url'); ?>/ie7.css" />
    <![endif]-->
    <!-- begin wp_head() -->
       <?php wp_head(); ?>
    <!-- end wp_head() -->
</head>
<body>
    <div id="outer">
        <div id="container">
            <div id="wrap">
                <div id="navleft">
                    <?php wp_nav_menu( array( 'theme_location' => 'header-menu' ) ); ?>
                </div>
                <div id="header">
                    <a href="<?php bloginfo('url'); ?>" id="homelink"></a>
                    <img src="<?php bloginfo('template_directory'); ?>/images/logo.png" id="logo" />
                </div>
