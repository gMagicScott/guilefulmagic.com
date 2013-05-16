<?php
/*
Template Name: Archives
*/
?> 



<?php get_header(); ?>

<div id="container">


<div id="content">
	<?php if (have_posts()) : while (have_posts()) : the_post(); ?>
	

			<h1><?php the_title(); ?></h1>

			
<h3>Posts by Category</h3>
			<ul>
				<?php wp_list_categories('title_li=0'); ?>
			</ul>			




<h3>Monthly Archives</h3>
			<ul>
				<?php wp_get_archives('type=monthly'); ?>
			</ul>
			
			<h3>All Past Blog Entries</h3>
			<ul>
			<?php $archive_query = new WP_Query('showposts=1000');
				while ($archive_query->have_posts()) : $archive_query->the_post(); ?>
			<li><a href="<?php the_permalink() ?>" rel="bookmark" title="Permanent Link to <?php the_title(); ?>"><?php the_title(); ?></a> </li>
			<?php endwhile; ?>
			</ul>
	
<h3>Site Pages</h3>
			<ul>
				<?php wp_list_pages('title_li='); ?>
			</ul>

		

		

			
<h2>RSS Feeds:</h2>
			<ul>
				<li><a href="<?php bloginfo('rdf_url'); ?>" title="RDF/RSS 1.0 feed"><acronym title="Resource Description Framework">RDF</acronym>/<acronym title="Really Simple Syndication">RSS</acronym> 1.0 feed</a></li>
				<li><a href="<?php bloginfo('rss_url'); ?>" title="RSS 0.92 feed"><acronym title="Really Simple Syndication">RSS</acronym> 0.92 feed</a></li>
				<li><a href="<?php bloginfo('rss2_url'); ?>" title="RSS 2.0 feed"><acronym title="Really Simple Syndication">RSS</acronym> 2.0 feed</a></li>
				<li><a href="<?php bloginfo('atom_url'); ?>" title="Atom feed">Atom feed</a></li>
			</ul>
		
	<?php endwhile; else: ?>

	<p><?php _e('Sorry, no posts matched your criteria.'); ?></p><?php endif; ?>
	</div>
	
<?php get_sidebar(); ?>
	
	</div>	</div>

<!-- The main column ends  -->

<?php get_footer(); ?>