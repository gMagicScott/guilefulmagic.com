<?php get_header(); ?>

<div id="content">

	<?php if (have_posts()) : while (have_posts()) : the_post(); ?>

	<div class="contenttitle">
			<h1><?php the_title(); ?></h1>
			</div>
	
			
			<div style="clear:both;"></div>
		
		
		
		
		<?php the_content(__('Read more'));?>
		


		
		
		<?php endwhile; else: ?>
		
		<p><?php _e('Sorry, no posts matched your criteria.'); ?></p>
		
		<?php endif; ?>


	
	
		
		</div>
	
<?php get_sidebar(); ?>
</div>


<!-- The main column ends  -->

<?php get_footer(); ?>
