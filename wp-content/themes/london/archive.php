<?php get_header(); ?>


<div id="content">


	<?php if (have_posts()) : while (have_posts()) : the_post(); ?>
	<span class="topmetaleft"><?php the_time('j F, Y') ?>  |  Written by <a href="<?php bloginfo('url'); ?>/about/"><?php the_author(); ?></a></span>
	<span class="topmetaright"><?php comments_popup_link('Leave a Comment', '1 Comment', '% Comments'); ?></span>	
	
	<div class="contenttitle">
	<h1><a href="<?php the_permalink() ?>" rel="bookmark"><?php the_title(); ?></a></h1>
	<?php the_content(__('Read more'));?></div>
	
	<div style="clear:both;"></div>
 			
	<!--
	<?php trackback_rdf(); ?>
	-->
	
	<?php endwhile; else: ?>
	
	<p><?php _e('Sorry, no posts matched your criteria.'); ?></p><?php endif; ?>
	<p><?php posts_nav_link(' &#8212; ', __('&larr; Previous Page'), __('Next Page &rarr;')); ?></p>

	</div>


	<?php get_sidebar(); ?>

	</div>
<!-- The main column ends  -->

<?php get_footer(); ?>