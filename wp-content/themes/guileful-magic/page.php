<?php get_header(); ?>

<div id="content">




	<?php if (have_posts()) : while (have_posts()) : the_post(); ?>


	<?php the_content(__('Read more'));?>
	<!--
	<?php trackback_rdf(); ?>
	-->
<?php edit_post_link( $link, $before, $after, $id ); ?>
	<?php endwhile; else: ?>

	<p><?php _e('Sorry, no posts matched your criteria.'); ?></p>
	
	<?php endif; ?>
	
</div>	
	
<?php get_sidebar(); ?>

</div>
<!-- The main column ends  -->

<?php get_footer(); ?>